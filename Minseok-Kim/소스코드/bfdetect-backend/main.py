import pipeline, database
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.executors.asyncio import AsyncIOExecutor
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime, timedelta
import os, logging, requests

SENSOR_IDS = ["wando01", "wando02", "wando01b"]
PAST_DATA = os.getenv("PAST_DATA", "false").lower() == "true"

app = FastAPI()

logger = logging.getLogger(__name__)
if logger.hasHandlers():
    logger.handlers.clear()

logging.basicConfig(level=logging.INFO)
console_handler = logging.StreamHandler()
file_handler = logging.FileHandler("/app/data/main.log")

console_formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s")
file_formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s")
console_handler.setFormatter(console_formatter)
file_handler.setFormatter(file_formatter)

logger.addHandler(console_handler)
logger.addHandler(file_handler)
logger.setLevel(logging.INFO)


# 센서 하나에 대해 바이오파울링 예측 모델 실행
# return: 0(normal) / 1(abnomarl)
async def runModel(sensor_id: str, time: datetime):
    try:
        # 데이터 수집
        try:
            data = await pipeline.collect_recent_data(sensor_id, time)
            logger.info(f"\'{sensor_id}\': Collected data from the server.")
        except requests.exceptions.RequestException as e:
            logger.error(f"API request error: {e}")
        except ValueError as e:
            logger.error(f"Data processing error: {e}")

        # 데이터 전처리
        processed_data, dataframe = pipeline.preprocess_data(data)
        logger.info(f"\'{sensor_id}\': Data preprocessing completed.")

        # 비정상 데이터(용존산소 3 이하)인 경우 모델 실행 중단 및 비정상으로 저장
        if dataframe['oxygen_ppm'].iloc[-1] <= 3.0:
            logger.info(f"\'{sensor_id}\': Abnormal data, no prediction.")
            await database.saveResult(sensor_id, None, 1)
            return

        # 모델 로드
        model, device = pipeline.load_model("model.pth")

        # 예측
        result = pipeline.predict_anomaly(model, processed_data, device)  
        logger.info(f"\'{sensor_id}\': Prediction has been successfully completed.")

        # 결과 저장
        await database.saveResult(sensor_id, 1 if result == 1 else 0)

    except Exception as e:
        logger.error(str(e), exc_info=True)
        logger.info("Prediction for \'{sensor_id}\' failed.")
        await database.saveResult(sensor_id, None, None)
async def runModelWrapper(sensor_id: str, time: datetime):
    await runModel(sensor_id, time)


# 서버 시작
@app.on_event("startup")
async def startService():
    try:
        await database.initialize()

        # 1시간마다 모든 센서에 대해 모델을 실행하도록 스케줄링
        scheduler = AsyncIOScheduler(executors={"default": AsyncIOExecutor()})
        # trigger = CronTrigger(minute="*/1")   # for test
        trigger = CronTrigger(minute="0")   # 정각(##:00)마다 실행
        for sensor_id in SENSOR_IDS:
            scheduler.add_job(
                runModelWrapper, trigger, args=[sensor_id, datetime.now()], id=f"job_{sensor_id}", max_instances=3
            )
        scheduler.start()
        logger.info("Scheduler started.")

    except Exception as e:
        logger.error(str(e), exc_info=True)
    

class Result(BaseModel):
    sensor_id: str
    inference_time: str
    inference_result: Optional[int]

# 센서의 가장 최근 바이오파울링 판단 결과를 DB에서 가져옴
@app.get("/results/latest/{sensor_id}", response_model=Result)
async def latestResult(sensor_id: str):
    try:
        result = await database.getLatestResult(sensor_id)
        logger.info(f"Fetched the latest result for \'{sensor_id}\'")
        return Result(**result)
    except Exception as e:
        logger.error(f"An error occured fetching latest result for \'{sensor_id}\': {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 주어진 기간 동안의 과거 판단 결과를 DB에서 가져옴
@app.get("/results/range/{sensor_id}", response_model=List[Result])
async def resultsByTime(sensor_id: str, start_time: str, end_time: str):
    try:
        results = await database.getResultsByTime(sensor_id, start_time, end_time)
        logger.info(f"Fetched results for \'{sensor_id}\' from {start_time} to {end_time}.")
        return [Result(**result) for result in results]
    except Exception as e:
        logger.error(f"An error occured fetching results for \'{sensor_id}\': {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 오든 센서 데이터 API에 대한 Proxy API
@app.get("/proxy/{endpoint}")
def proxy_request(endpoint: str, params: dict = None):
    headers = {"Content-Type": "application/json"}
    url = f"{os.getenv('API_BASE_URL')}/{endpoint}"
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))
