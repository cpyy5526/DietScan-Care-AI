# Git/Github 기초 사용법

- 기본적으로 초기 clone 이후 “branch 생성 → 로컬 작업 (commit 반복) → push → pull request”의 반복입니다.
- 작업 중 중간중간에 수시로 pull을 실행하는 것이 좋습니다. (로컬에서의 pull과 Github 웹에서의 pull reqeust는 전혀 다른 별개의 작업입니다.)
- branch 생성의 경우 Github 웹에서 Issue Tracking 기능과 연결하는 게 더 일반적이고 관리하기 편하기 때문에, 로컬에서의 branch 생성과 관련된 내용은 제외했습니다. Issue 생성을 통한 branch 생성에 대해서는 다음 문서에서 확인할 수 있습니다.
    
    [Branch 관리 정책](./Branch-관리-정책.md)
    
- 한 사람이 동시에 여러 branch에서 작업하는 경우는 없을 것 같아, 로컬에서의 branch 전환 관련 내용도 제외했습니다. 다만 로컬 작업 중 실수로 main(develop)에 있게 된 경우 되면 바로 개인 branch로 전환하시기 바랍니다. (commit 중 git status에서 작업 중인 branch 확인 가능)

## 초기 설정

### Git 설치

- Windows: https://git-scm.com/download/win, 설치 후 Git Bash 이용
- Mac: 터미널에 다음 입력 (brew 설치 필요)

```
brew install git
```

- Linux: 터미널에 다음 입력

```
sudo apt install git
```

### Repository Clone

```
git clone <repository URL>
```

- Github의 원격 리포지토리를 복제하고 컴퓨터에 개인 작업을 위한 로컬 리포지토리를 초기화합니다.
- 로컬 리포지토리를 위치시킬 폴더로 터미널(git bash)에서 이동 후 실행합니다.
- <repository URL>은 github 리포지토리 메인 페이지의 “Code” 메뉴에서 확인 가능합니다. (HTTPS)
- **주의: 생성된 리포지토리 폴더 안으로 터미널에서 이동해야 여기에 대한 작업이 가능합니다. (cd 명령어 사용)**
- 로컬 및 원격 리포지토리 사이에 ‘origin’ 이름으로 자동으로 연결이 생성됩니다. 이후 두 리포지토리 간 동기화는 기본적으로 push/pull 명령어를 통해 수동으로 이루어집니다.

## Commit (로컬 작업)

### Staging Area(index)

- 이번 commit에 기록할 파일을 준비하는 내부 공간입니다.
- 수정사항을 반드시 여기에 적용해야 commit에 반영됩니다.

```
git status
```

- 마지막 commit과 비교하여 리포지토리 내에서 수정되거나 추가된 파일을 표시합니다.
- 수정된 파일 중 staging area에 준비된 파일은 staged로, 아닌 파일은 unstaged로 구분됩니다.
- staged 상태의 파일만 commit에 반영되므로, commit 전에 수시로 이 명령어를 사용하여 확인해야 합니다.

```
git add <filename.extension>
```

- 파일의 수정사항을 staging area에 적용합니다.
- staged 상태의 파일을 또 수정한 경우, staging area에는 적용되지 않으므로 다시 이 명령어를 실행해야 합니다.

```
git add .
```

- 모든 unstaged 파일을 한 번에 staging합니다.

```
git restore —staged <filename.extension>
```

- 해당 파일에 대해 staging을 취소합니다.
- 수정사항은 유지되지만 이번 commit에 포함되지 않습니다.
- 마지막 commit에서의 해당 파일의 상태가 그대로 반영됩니다.

```
git commit -m “message”
```

- 모든 staged 파일을 반영한 새로운 commit을 작업 중인 branch에 추가합니다.

## 로컬-원격 리포지토리 동기화

```
git pull origin <branch>
```

- <branch name>에 대해 원격 리포지토리에서의 변경사항을 로컬에 동기화합니다.
- main(develop) branch에 대해 수시로 실행하는 것이 좋습니다.

```
git push origin <branch name>
```

- 로컬에서 작업한 <branch name>을 원격 리포지토리에 동기화합니다.
- branch를 완성했을 때 실행합니다. commit마다 실행해도 좋습니다.
- collaborator로 등록된 경우만 가능합니다. Github 계정 이름과 보안 토큰(Personal Access Token)을 요구합니다.
- 토큰은 우측 상단 “Settings - Developer Settings - Personal access tokens”에서 생성 가능합니다. **(생성 후 다시 확인 불가능하므로 기록 필수)**

## Pull Request

1. Create a Pull Request
- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request?tool=webui#creating-the-pull-request
1. Merge the Pull Request
- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request#merging-a-pull-request
1. Address Merge Conflicts
- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line