import aiosqlite
import datetime

# 데이터베이스 경로
DB_PATH = "/app/data/results.db"

async def initialize():
    async with aiosqlite.connect(DB_PATH) as conn:
        # 결과 저장 테이블 생성
        await conn.execute("""
        CREATE TABLE IF NOT EXISTS judge_results (
            id                INTEGER      PRIMARY KEY  AUTOINCREMENT,
            sensor_id         TEXT         NOT NULL,
            timestamp         DATETIME,     
            data_abnormal     INTEGER,
            predict_result    INTEGER
        );
        """)
        await conn.commit()


# 결과 저장
async def saveResult(sensor_id: str, predict_result: int, data_abnormal: int=0):
    async with aiosqlite.connect(DB_PATH) as conn:
        await conn.execute("""
        INSERT INTO judge_results (sensor_id, data_abnormal, timestamp, predict_result)
        VALUES (?, ?, ?, ?);
        """, (sensor_id, data_abnormal, datetime.datetime.now(), predict_result))
        await conn.commit()


# 특정 센서의 가장 최근 결과 조회
async def getLatestResult(sensor_id: str):
    async with aiosqlite.connect(DB_PATH) as conn:
        cursor = await conn.execute("""
        SELECT *
        FROM judge_results
        WHERE sensor_id = ?
        ORDER BY inference_time DESC
        LIMIT 1;
        """, (sensor_id,))
        result = await cursor.fetchone()
    return {
        "sensor_id": result[1],
        "inference_time": result[2],
        "inference_result": 1 if result[3] == 1 else result[4]
    }


# 특정 센서의 과거 시점 결과 조회
async def getResultsByTime(sensor_id: str, start_time: str, end_time: str):
    async with aiosqlite.connect(DB_PATH) as conn:
        cursor = await conn.execute("""
        SELECT *
        FROM judge_results
        WHERE sensor_id = ?
              AND inference_time BETWEEN ? AND ?
        ORDER BY inference_time;
        """, (sensor_id, start_time, end_time))
        results = await cursor.fetchall()
    return [
        {
            "sensor_id": row[1],
            "inference_time": row[2],
            "inference_result": 1 if row[3] == 1 else row[4]
        }
        for row in results
    ]