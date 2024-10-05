# Branch 관리 정책

## 1.  계층 구조

- 기본적으로 main - develop - feature 세 가지 계층의 branch로 구분합니다. (Git Flow 방식)
- **feature branch:** 개인이 특정 시점에 맡은 작업에 따라 로컬에서 생성하여 commit 및 push, 완성 시 develop branch에 merge 요청
- **develop branch:** 개인별 작업을 전체 프로젝트에 1차적으로 통합하는 branch. 팀원 간 검토 후 feature branch를 여기로 merge
- **main branch:** 2차적인 검증 이후 develop branch를 최종적으로 여기로 복사.

## 2.  관리 전략

- 충돌을 최대한 방지하기 위해, 웬만하면 두 명 이상이 동일한 파일에 대해 다른 branch에서 동시에 작업하지 않도록 합니다.
- 진행 단계에 따라 계층 구조를 유동적으로 활용합니다.

### A.  계획 및 스터디 단계

- 충돌 및 안정성에 대한 부담이 적고, 자료 정리 및 기록이 주 목적이므로 가볍고 빠른 통합 전략 필요
- main-feature 두 계층만을 사용 (Github Flow 방식)
- 기본적인 설정 작업을 main branch에서 바로 수행
- 각자 공부한 자료나 정리한 내용을 feature branch에 기록하여 main에 바로 merge

### B.  **본격적인 구현 및 유지보수 단계**

- 각자 역할을 분담하여 작업하고, 주기적인 피드백 과정이 있으므로 안정적이고 체계적인 전략 필요
- main-develop-feature 세 가지 계층 모두 사용 (Git Flow 방식)
- 특정 시점에서 맡은 작업에 따라 feature branch를 만들고 개인 작업, 완성 후 develop에 merge 요청 (pull request 생성)
- 멘토님 피드백 시점에 맞춰 개발 상황을 정리하고 통합 테스트를 진행하여 main에 merge
- 전체 시스템이 어느 정도 구현되어 피드백 빈도가 줄어들어도 주기적으로 develop에서 통합 테스트를 거치고 main에 merge

## 3.  Branch 생성

- Github의 Issue Tracking 기능을 사용합니다. 웹페이지의 Issues 메뉴에서 작업에 대한 공지를 먼저 작성합니다.
- 한글로 제목과 및 내용을 작성합니다. branch에 대한 설명을 3줄 이내 정도 목록으로 정리하여 내용에 작성합니다.
    - 내용 예시
        - 안드로이드 환경에서 ‘확인’ 버튼 누르면 빈 화면이 뜨는 버그 발생
        - ###.java 파일 확인 및 수정
        - 다른 파일 확인은 필요 없을 것으로 예상됨
- 작성 후 오른쪽 메뉴의 Assignees에서 ‘assign yourself’를 클릭하고, Labels를 적절히 선택합니다.
- 제출하고 오른쪽에 Develop - Create a branch를 클릭하여 branch를 생성합니다.
- branch 이름은 “유형/이슈번호-요약”과 같이 작성합니다. 영문 소문자만 사용하고, ‘요약’에는 핵심 내용을 단어 몇 개로 간결하게 씁니다. 단어 사이에는 공백 대신 ‘-’를 사용합니다.
    - 유형 목록
        - feature/ :  기능 구현
        - bugfix/ :  버그 수정
        - chore/ :  코드에 영향 없는 작업 (코드 스타일 변경, 빌드 설정, 주석 추가 등)
        - refactor/ :  동작 유지하면서 코드 개선 (가독성 개선, 성능 최적화 등)
        - text/ :  테스트 관련 작업
        - docs/ :  코드 이외 문서 작성 관련
    - branch 이름 예시
        - feature/4-login-page
        - bugfix/11-null-pointer-exception
- ‘checkout locally’ 옵션을 선택하고, 표시되는 명령어를 로컬에 입력한 후 작업 및 commit을 수행하면 됩니다.

## 4.  Pull Request

- develop branch에 통합 시, 나머지 팀원 세 명의 확인을 반드시 받아야 합니다.
    - 코드 리뷰가 가능한 경우 피드백을 남깁니다.
    - 어떤 작업을 수행했는지 이해하고 질문 또는 확인 댓글을 남깁니다.
- 기술 스택을 세부적으로 모르는 사람도 어느정도 이해 가능하도록, branch에서의 전반적인 작업 기록을 설명하여 작성합니다.
- develop → main 통합은 멘토님 피드백 또는 전체 테스트 이후 진행합니다. (1-2주 주기)

** 작성 양식, 충돌 해결 관련 추가 예정