# aicoss 프로젝트 신청서

### 프로젝트

| 산학프로젝트명 |  |
| --- | --- |
| 산학목표 | - 스마트부표 센서 데이터의 바이오파울링에 의한 이상치를 AI를 통해서 탐지할 수 있는 스마트 서비스 개발
- 제안 서비스를 통해 스마트부표로부터 수집하는 해양 데이터의 품질을 확보
- 제안 서비스를 통해 개발 중인 안티바이오파울링 시스템 효율화 달성 |
| 문제내용 | - 스마트부표에 부착된 광학 센서를 이용하여 해양 환경의 데이터를 수집
- 수집된 원천 데이터는 노이즈 제거, 이상치 처리, 정규화 등의 전처리 과정을 거쳐 분석이 용이한 형태로 가공
- 전처리된 데이터에 대해 통계적 분석, 시각화, 패턴 탐색 등을 수행하여 데이터 내 잠재적인 특성과 구조를 이해
- 이상 탐지를 위한 AI 모델을 설계하고 학습 데이터를 이용해 모델을 학습
- 실제 해양 데이터와 유사한 조건을 설정하여 모델의 성능을 평가하고 개선할 수 있는 기반을 마련
- 이상 탐지 결과를 처리하고 관리하는 백엔드 서버를 개발
- 사용자가 쉽게 데이터를 조회하고 이상 탐지 결과를 분석할 수 있는 사용자 인터페이스인 프론트엔드 대시보드를 개발 |
| 문제해결시 기대효과 | - 스마트부표 센서의 데이터 품질과 신뢰도를 유지
- 전체 데이터 수집 시스템의 효율성 및 안정성을 보장
- 필요 이상의 유지보수 작업 절감 가능
- 유지보수 비용을 절감하고, 전반적인 운영 효율을 극대화를 통한 시장 점유율 확대 및 신규 기회 창출
- 4차산업 진입을 위한 초석 마련 |

| 인공지능 역량기술 | - 롯데그룹 대홍기획 AI Lab (24.02 ~ 현재)
- 달파 (2024.07 ~ 현재, 협업 프로젝트 진행 중)
- 롯데그룹 AI 마케팅 시스템 'AIMS(AI Marketing System)' 서비스 개발
- 주요 수행 업무:
1. 시스템 요구사항 정의 및 기획
- 마케팅 워크플로우 분석 및 LLM 적용 가능 영역 식별
2. LLM 기반 기능 아키텍처 및 플로우 설계
3. LLM 튜닝 및 최적화 / 검증 및 테스트 / 프로덕트 개선 |
| --- | --- |
| 핵심역량 및 해결방안 | • 세부 목표

1. 스마트부표 광학 센서 데이터 수집 및 가공
2. 스마트부표 광학 센서 이상 탐지 AI 모델 개발
3. 안티바이오파울링 스케줄링 서비스 개발

• 추진 방향

1. 데이터 수집 및 가공
- 스마트부표 광학 센서를 이용하여 해양 환경의 데이터를 수집 (수온, 용존산소, 염도, 산도 등 해양 환경 요인 데이터 포함)
- 수집된 원천 데이터는 노이즈 제거, 이상치 처리, 정규화 등의 전처리 과정을 거쳐 분석이 용이한 형태로 가공
- 전처리된 데이터에 대해 통계적 분석, 시각화, 패턴 탐색 등을 수행하여 데이터 내 잠재적인 특성과 구조를 이해

2. 이상 탐지 모델 개발
- 센서 데이터의 이상치를 확인하기 위한 통계적 방법론 적용 실험
- 실제 해양 데이터와 유사한 조건을 설정하여 모델의 성능을 평가하고 개선할 수 있는 기반 마련
- 이상 탐지를 위한 AI 모델을 설계하고 학습 데이터를 이용해 모델을 학습
- 초기 학습된 모델을 바탕으로 추가 데이터 수집 및 실험을 통해 모델을 지속적으로 개선하고 고도화
- 다양한 환경에서의 일반화 확보가 중요

3. 스마트 서비스 개발
- 백엔드 서버 개발
- 프론트엔드 대시보드 개발
- 이상 탐지 결과를 처리하고 관리하는 백엔드 서버를 개발 (데이터 수집, 처리, 결과 저장 및 AI 모델과의 인터페이스 역할 수행)
- 사용자가 쉽게 데이터를 조회하고 이상 탐지 결과를 분석할 수 있는 사용자 인터페이스인 프론트엔드 대시보드를 개발
- 사용자는 스마트부표의 데이터 현황과 함께 바이오파울링이 탐지되는 경우 경보 알람을 받을 수 있음   |
| 목표달성도 평가지표 및 활용분야 | 목표 달성도 평가지표 및 활용분야

1. 데이터 수집 및 처리 시스템 개발
- 스마트부표에 탑재된 광학 센서를 통해 수집된 원천 데이터의 전처리 과정 개발 (노이즈 제거, 이상치 처리, 정규화)
- 수집된 데이터를 효과적으로 처리하고 분석할 수 있는 시스템 개발 완료

2. AI 기반 이상 탐지 모델 개발 및 성능 개선
- 목표 성능: AUC 80%, F1 Score 80%, Recall 85%, Precision 80%
- 기존 세계적 성과와 비교해 높은 성능을 달성하기 위한 AI 모델 학습 및 고도화
- 다양한 해양 환경 데이터를 활용하여 일반화된 이상 탐지 AI 모델 개발
- 모델 성능 향상을 위해 지속적인 데이터 수집 및 성능 평가 체계 구축

3. 안티바이오파울링 시스템 효율성 향상
- 목표: 안티바이오파울링 운영 효율성 20% 증가
- 바이오파울링 발생을 예측 및 탐지하는 AI 모델과 실시간 스케줄링 시스템 개발
- AI 모델의 탐지 결과를 기반으로 자동화된 경고 시스템 및 운영 대시보드 개발

4. 솔루션 구축 및 도입 성과
- 목표: 바이오파울링 오염 인식 AI 모델 및 대시보드 소프트웨어 2개소 도입
- 데이터 수집과 이상 탐지 결과를 통합 관리하는 백엔드 시스템 개발
- 사용자에게 실시간 데이터를 제공하고 이상 탐지 상황을 시각화하는 프론트엔드 대시보드 개발

5. 활용분야
- AI 모델 기반 해양 환경 데이터 분석: 해양 센서 데이터를 통해 실시간으로 이상 탐지 및 분석 가능
- 스마트 양식장 관리 솔루션: AI 기반 예측 시스템을 통해 운영 효율성 개선 및 비용 절감
- 해양 환경 관측 시스템: 스마트부표와 AI 시스템을 연동해 해양 관측 및 관리 자동화 실현   |