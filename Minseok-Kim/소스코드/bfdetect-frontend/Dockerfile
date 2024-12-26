# 빌드 스테이지
FROM node:18 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사
COPY package.json ./

# 의존성 설치
RUN npm install

# Prisma 클라이언트 생성
COPY prisma ./prisma
COPY .env .env
RUN npx prisma generate

# Next.js 빌드
COPY . .
RUN npm run build

# 실행 스테이지
FROM node:18 AS runner

# 작업 디렉토리 설정
WORKDIR /app

# builder 단계에서 생성된 빌드 결과 복사
COPY --from=builder /app ./

# 런타임 포트 노출
EXPOSE 3000

# Next.js 실행
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]