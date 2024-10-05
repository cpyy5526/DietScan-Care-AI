# Git 기본 개념

## 1.  Repository

- Git을 통해 관리되는 프로젝트 저장소를 의미합니다.
- 현재 버전의 프로젝트를 구성하는 파일뿐만 아니라, 기록된 모든 버전의 변경사항을 포함합니다.
- Local Repository: 개인이 컴퓨터에서 Git으로 관리하는 저장소
- Remote Repository: Github 등의 플랫폼에서 관리하는 저장소
- 각자 컴퓨터에서 자신이 맡은 부분을 local repository에서 작업하고, 공동의 remote repository에 연결하여 업로드하고 통합하는 방식으로 협업이 이루어집니다.

## 2.  Commit

- Git에 기록된 프로젝트의 특정 버전을 의미합니다(a commit).
- 또한 특정 시점에서 프로젝트의 작업물을 이렇게 버전으로 기록하는 것을 ‘commit하다’(to commit, make a commit)라고 이야기합니다.
- 파일을 지정하고 commit하면 이들 파일의 내용이 그대로 저장됩니다. 이를 통해 각 버전별 수정 사항을 추적하고, 이전 버전을 그대로 불러올 수 있습니다.
- 각각의 commit은 40자리의 고유한 ID(hash)를 가집니다. 이 ID를 사용하는 git 명령어에서는 보통 맨 앞의 7자리만을 사용해도 됩니다.
- commit 시 보통 변경사항에 대한 메시지를 같이 입력합니다. 프로젝트 진행 상황을 파악하기 쉽도록 명확하고 간결하게 작성해야 합니다.

## 3.  Branch

- Git 프로젝트 진행 중 특정 목적에 따라 만들어지는 독립적인 작업 흐름(a line of development)을 의미합니다.
- 실제로는 하나의 commit을 가리키는 ‘포인터’입니다.
- 내부적으로 linked list 방식으로 구현되어 있습니다. branch에 새로 commit을 하게 되면, branch는 이 commit을 가리키게 되고, 추가된 commit은 기존 commit을 가리킵니다.
- “main” branch에 commit A, B, C가 순서대로 이루어지는 과정을 다음과 같이 나타낼 수 있습니다.
    - commit 과정 그림
        
        ![branch-commit.svg](../images/branch-commit.svg)
        
- 프로젝트 진행에 따라 여러 개의 branch가 추가되거나 삭제될 수 있습니다.
- 일반적인 팀 프로젝트에서는 main branch와 feature branch로 구분하여 개발 흐름을 관리합니다.
    - Main Branch(Master Branch): 프로젝트 전체 진행을 기록합니다.
    - Feature Branch(Topic Branch): 팀원별로, 또는 진행 단계별로 특정 작업을 위해 개별적으로 만들어집니다. 작업이 완료되면 main branch에 병합(merge)됩니다.

## 4.  Pull Request

- Github 등 remote repository 서비스에서 제공하는 기능입니다.
- 팀원이 작업한 feature branch를 main branch에 병합하기 전, 다른 팀원들에게 검토를 요청하는 기능입니다.
- 팀원들은 변경 사항을 확인하고 댓글로 피드백을 남길 수 있습니다.
- feature branch에서의 변경 사항 중 문제가 있거나 추가적인 수정이 필요하다고 결정된 경우, 작성자가 다시 수정하여 검토 요청을 받을 수 있습니다.
- 팀원들이 변경 사항에 대해 승인하면, main branch에 이 변경 사항을 병합하게 됩니다.
- Github에서 제공하는 병합 방식에는 “Create a merge commit”, “Squash and merge”, “Rebase and merge” 세 가지가 있습니다.
- 첫 번째 방식이 쓰이는 경우도 많지만(팀의 규모가 크거나, 병합 흔적을 명확히 표시하고자 할 경우), 개인 프로젝트 또는 소규모 팀인 경우, 또는 전체 기록을 간결하게 유지해야 할 경우 세 번째 방식을 주로 사용합니다. (교수님께서 추천한 방식)

## 5.  Rebase

- Rebase: 마치 처음부터 main branch에서만 작업한 것처럼, feature branch의 각 commit을 main branch의 뒤에 직선으로 정렬하는 방식입니다. 다음과 같은 상황을 생각해 봅시다.
- main branch에 commit A가 있습니다.
- 팀원 1이 commit A에서 시작하는 feature branch를 만들고 여기에 commit B, C를 추가합니다.
- 그 사이 팀원 2에 의해 main branch에 commit D가 추가되었습니다.
- 팀원 1이 이제 feature branch를 rebase 과정을 통해 main branch에 병합합니다.
- feature branch에서의 작업은 완료되었으므로 삭제합니다.
- rebase 과정은 자동으로 진행되며, 다음 단계로 진행됩니다.
    1. commit D 상태에서, commit B에서 일어났던 변경사항을 적용하여 새로운 commit B’을 main branch에 추가합니다.
    2. 다시 여기에 commit C에서 일어났던 변경사항을 적용하여 새로운 commit C’을 main branch에 추가합니다.
- 결과적으로는 마치 처음부터 main branch(A-D)에 commit B’, C’를 추가한 것처럼 보입니다. 전체적인 과정을 그림으로 나타내면 다음과 같습니다.
    - rebase 진행 과정 그림
        
        ![rebase.svg](../images/rebase.svg)
        

## 6.  Merge Conflict

- 병합 과정 중 두 branch에서 동일한 파일에 대해 동시에 적용할 수 없는 변경사항이 있을 때 충돌이 발생합니다.
- 다음과 같은 상황에 발생할 수 있습니다.
    - 동일한 소스코드 파일의 같은 줄을 두 사람이 다르게 편집하고 각자 차례로 main에 병합 시도한 경우
    - 동일한 파일에 대해 한 사람은 파일을 수정하고, 다른 사람은 파일을 삭제하거나, 파일 이름을 변경하거나, 폴더 위치를 바꾸고, 각자 차례로 main에 병합 시도한 경우
- 충돌이 발생한 경우, 수동으로 어떤 변경 사항을 적용할 지 결정해야 합니다.
- 여러 사람이 동시에 작업하는 프로젝트에서 충돌은 수시로 발생할 수 있으며, 누군가의 책임이 있는 잘못이 아닙니다.
- 충돌을 해결하는 과정에서 다른 팀원의 작업에 의도치 않게 영향을 끼칠 수 있으므로 조율이 필요합니다.