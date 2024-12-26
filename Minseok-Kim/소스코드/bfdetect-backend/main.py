import pipeline, database
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
import os, asyncio, logging, requests

SENSOR_IDS = ["wando01", "wando02", "wando01b"]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()


# 센서 하나에 대해 바이오파울링 예측 모델 실행
# return: 0(normal) / 1(abnomarl)
async def runModel(sensor_id: str):
    try:
        # 데이터 수집
        data_response = pipeline.collect_recent_data(sensor_id, app.state.token)
        if data_response["status"] != "success":
            raise Exception(data_response["message"])
        df = data_response["data"]

        # 데이터 전처리
        preprocess_response = pipeline.preprocess_data(df)
        if preprocess_response["status"] != "success":
            raise Exception(preprocess_response["message"])
        processed_data = preprocess_response["tensor"]

        # 모델 로드
        model_path = "model.pth"  # 모델 경로 (실제 경로로 수정 필요)
        model_response = pipeline.load_model(model_path)
        if model_response["status"] != "success":
            raise Exception(model_response["message"])
        model = model_response["model"]
        device = model_response["device"]

        # 예측
        prediction_response = pipeline.predict_anomaly(model, processed_data, device)
        if prediction_response["status"] != "success":
            raise Exception(prediction_response["message"])
        
        return 1 if prediction_response["predicted_class"] == 1 else 0
    except Exception as e:
        logger.error("Error: " + str(e), exc_info=True)
        return None


# 등록된 모든 센서에 대해 예측 모델 실행
async def runModelForAllSensors():
    logger.info("Starting AI processing for all sensors...")
    tasks = [runModel(sensor_id) for sensor_id in SENSOR_IDS]
    results = await asyncio.gather(*tasks)
    for sensor_id, result in results.items():
        database.saveResult(sensor_id, result)


# 정각마다 모든 센서에 대해 바이오파울링 예측 모델 실행하도록 스케줄링
scheduler = BackgroundScheduler()
trigger = CronTrigger(minute="0")  # 정각(##:00)마다 실행
scheduler.add_job(runModelForAllSensors, trigger)


# 서버 시작
@app.on_event("startup")
def start_scheduler():
    scheduler.start()
    database.initialize()
    logger.info("Scheduler started.")

    # 오든 API 보안 토큰 획득
    try:
        token_response = pipeline.get_access_token()
        if token_response["status"] != "success":
            raise Exception(token_response["message"])
        app.state.token = token_response["access_token"]
    except Exception as e:
        logger.error("Error: " + str(e), exc_info=True)


# 서버 종료: 스케줄러도 같이 종료
@app.on_event("shutdown")
def shutdown_scheduler():
    scheduler.shutdown()
    logger.info("Scheduler shut down.")


class Result(BaseModel):
    sensor_id: str
    inference_time: str
    inference_result: Optional[int]


# 센서의 가장 최근 바이오파울링 판단 결과를 DB에서 가져옴
@app.get("/results/latest/{sensor_id}", response_model=Result)
def latestResult(sensor_id: str):
    return Result(**database.getLatestResult(sensor_id))


# 주어진 기간 동안의 과거 판단 결과를 DB에서 가져옴
@app.get("/results/range/{sensor_id}", response_model=List[Result])
def resultsByTime(sensor_id: str, start_time: str, end_time: str):
    results = database.getResultsByTime(sensor_id, start_time, end_time)
    return [Result(**result) for result in results]


# 오든 센서 데이터 API에 대한 Proxy API
@app.get("/proxy/{endpoint}")
async def proxy_request(endpoint: str, params: dict = None):
    headers = {"Authorization": f"Bearer {app.state.token}"}
    url = f"{os.getenv("API_BASE_URL")}/{endpoint}"
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))