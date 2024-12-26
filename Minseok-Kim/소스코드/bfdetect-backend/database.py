import sqlite3
import datetime

# 데이터베이스 경로
DB_PATH = "/app/data/results.db"

def initialize():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        # 결과 저장 테이블 생성
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS judge_results (
            id INTEGER        PRIMARY KEY  AUTOINCREMENT,
            sensor_id         TEXT         NOT NULL,
            inference_time    DATETIME     NOT NULL,
            inference_result  INTEGER
        );
        """)
        conn.commit()


# 결과 저장
def saveResult(sensor_id: str, inference_result: str):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO judge_results (sensor_id, inference_time, inference_result)
        VALUES (?, ?, ?);
        """, (sensor_id, datetime.datetime.now(), inference_result))
        conn.commit()


# 특정 센서의 가장 최근 결과 조회
def getLatestResult(sensor_id: str):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("""
        SELECT *
        FROM judge_results
        WHERE sensor_id = ?
        ORDER BY inference_time DESC
        LIMIT 1;
        """, (sensor_id,))
        result = cursor.fetchone()
    return {
        "sensor_id": result[1],
        "inference_time": result[2],
        "inference_result": result[3],
    }


# 특정 센서의 과거 시점 결과 조회
def getResultsByTime(sensor_id: str, start_time: str, end_time: str):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("""
        SELECT *
        FROM judge_results
        WHERE sensor_id = ?
              AND inference_time BETWEEN ? AND ?
        ORDER BY inference_time;
        """, (sensor_id, start_time, end_time))
        results = cursor.fetchall()
    return [
        {
            "sensor_id": row[1],
            "inference_time": row[2],
            "inference_result": row[3],
        }
        for row in results
    ]