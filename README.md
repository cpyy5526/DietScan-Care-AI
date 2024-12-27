# AI 기반 센서 바이오파울링 모니터링 시스템

오든 해양 센서 데이터 API(https://rojy53nt54.execute-api.ap-northeast-2.amazonaws.com/Prod/docs)를 사용하여 'wando01', 'wando02', 'wando01b' 3개 센서에 대해 매 정각마다 바이오파울링 여부를 모니터링할 수 있는 서비스입니다. AI 모델을 통합한 백엔드, 웹 대시보드 프론트엔트 두 가지를 Docker 컨테이너화하여 제공합니다.

---

## 실행 환경

**Docker** 및 **Docker Compose**
- x86-64 아키텍처의 Windows에서 실행을 권장합니다.
- Ubuntu 환경에서 기본 환경 구성이나 권한 문제로 스케줄러가 제대로 작동하지 않는 경우가 발견되었습니다.
  - Linux 환경에서 사용 시 Snap 기반 Docker 설치 시 문제가 발생하는 것으로 보입니다.
  - get.docker.com 스크립트를 통한 Docker 및 Docker Compose 구성을 권장합니다.

---

## 이미지 가져오기 및 실행

두 컨테이너는 x86-64 아키텍처 기준으로 빌드되었습니다.

1. 백엔드 컨테이너 가져오기
```
$ docker pull cpyy5526/bfdetect-backend:latest
```
2. 프론트엔드 컨테이너 가져오기
```
$ docker pull cpyy5526/bfdetect-frontend:latest
```

---

## 서비스 실행
제공된 docker-compose.yml 파일과 같은 위치에서 다음을 실행합니다.
```
$ docker-compose up
```
다음과 같은 콘솔 출력이 나타나면 정상적으로 서비스가 설정 및 실행된 것입니다.
```
...
frontend-1  |  ✓ Ready in 718ms
...
backend-1   | INFO:main:Scheduler started.
backend-1   | INFO:     Application startup complete.
...
```

- 인터넷 브라우저에서 localhost:3000을 입력하여 웹 대시보드에 접속합니다.
- 초기 ID 및 비밀번호는 'admin'입니다.
- 대시보드 시스템 사용에 대해서는 [시연 영상](https://youtu.be/1GptuqYTa00?si=tV4bQxREmq6oXe8k)을 참고하세요.
- 종료하려면 콘솔에 CTRL-C를 입력하세요.

---

## 참고

- docker-compose.yml이 위치한 폴더에 main.log, results.db 파일이 생성됩니다.
  - main.log: 백엔드 실행 로그
  - results.db: 센서별 바이오파울링 예측 결과 DB
- 기본적으로 서비스 실행 이후부터 매 정각마다 바이오파울링 예측 결과 기록을 시작하므로, 초기 실행 이후 정각이 되기 전까지는 기록된 결과가 없습니다.
- 새로운 결과 확인 또는 사용자 관리 반영이 제대로 되지 않는 경우 페이지를 새로고침하세요.
