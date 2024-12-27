# Python 3.8.5을 베이스 이미지로 설정
FROM python:3.8.5-slim

# 기준 디렉토리 설정
WORKDIR /app

# 시스템 라이브러리 설치
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gfortran \
    libopenblas-dev \
    liblapack-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# pip, setuptools, wheel 업그레이드
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# requirements.txt 복사 및 의존성 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 복사
COPY . .
RUN mkdir -p /app/data && touch /app/data/main.log /app/data/results.db

# 시간대를 한국 기준으로 설정
ENV TZ=Asia/Seoul

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]