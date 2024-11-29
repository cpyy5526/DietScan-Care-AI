import pkg_resources
import sys
import torch

# Python 버전 확인
print(f"Python version: {sys.version}")

# Torch CUDA 사용 가능 여부 확인
print(f"\nPyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"CUDA version: {torch.version.cuda}")

# 설치된 모든 패키지와 버전 출력
print("\nInstalled packages:")
installed_packages = sorted([(d.project_name, d.version) 
                           for d in pkg_resources.working_set])
for package, version in installed_packages:
    print(f"{package}=={version}")