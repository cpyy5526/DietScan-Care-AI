import torch
import torch.nn as nn
import pandas as pd
import numpy as np
import requests
from datetime import datetime, timedelta
import json
import joblib

# GRU 모델 클래스 정의
class GRUModel(nn.Module):
    def __init__(self, input_size, hidden_size, output_size, num_layers=1):
        super(GRUModel, self).__init__()
        self.gru = nn.GRU(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        out, _ = self.gru(x)
        out = self.fc(out[:, -1, :])
        return out

# 1. Get Access Token
def get_access_token():
    """API 액세스 토큰을 획득합니다."""
    try:
        url = 'https://auth.odn.us/auth/login'
        data = {
            'username': '01084837725',
            'password': '!Bigwave1234'
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        response = requests.post(url, data=data, headers=headers)
        response.raise_for_status()  # HTTP 오류가 있을 경우 예외 발생
        access_token = response.json().get("access_token")

        if not access_token:
            raise ValueError("Access token not found in the response.")

        return {"status": "success", "access_token": access_token}

    except Exception as e:
        return {"status": "error", "message": str(e)}

# 2. Collect Recent Data
def collect_recent_data(device_id, token, sequence_length=720):
    """
    최근 sequence_length 개수만큼의 데이터를 수집합니다.
    Args:
        device_id (str): 장치 ID.
        token (str): API 액세스 토큰.
        sequence_length (int): 수집할 데이터의 길이.
    Returns:
        dict: 수집된 데이터 또는 오류 메시지.
    """
    try:
        # API URL 및 시간 범위 설정
        url = f'https://rojy53nt54.execute-api.ap-northeast-2.amazonaws.com/Prod/devices/{device_id}/sensors/oxygen'
        end_time = datetime.now()
        start_time = end_time - timedelta(days=2)  # 데이터 수집을 위한 여유 기간

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        params = {
            "b_time": int(start_time.timestamp() * 1000),  # 밀리초 단위로 변환
            "a_time": int(end_time.timestamp() * 1000),
            "size": sequence_length * 2  # 여유있게 2배 수집
        }

        try:
            # API 요청
            response = requests.get(url, params=params, headers=headers)
            response.raise_for_status()  # HTTP 상태 코드 확인
            data = response.json()

            # 응답 데이터 처리
            if isinstance(data, list):
                df = pd.DataFrame(data)
            elif isinstance(data, dict) and 'result' in data:
                df = pd.DataFrame(data['result'])
            else:
                raise ValueError("Unexpected data format received from API")

            # 데이터 개수 확인
            if len(df) < sequence_length:
                raise ValueError(f"Insufficient data: only {len(df)} records available, {sequence_length} required")

            # 최근 sequence_length개의 데이터 반환
            df = df.tail(sequence_length)
            return {"status": "success", "data": df}

        except requests.exceptions.RequestException as e:
            return {"status": "error", "message": f"API 요청 오류: {e}"}
        except ValueError as e:
            return {"status": "error", "message": f"데이터 처리 오류: {e}"}
        except Exception as e:
            return {"status": "error", "message": f"예기치 않은 오류 발생: {e}"}

    except Exception as e:
        # 최상위 오류 처리
        return {"status": "error", "message": f"전체 작업 중 오류 발생: {e}"}

# 3. Preprocess Data
def preprocess_data(df):
    """
    수집된 데이터를 전처리합니다.
    Args:
        df (pd.DataFrame): 수집된 데이터.
    Returns:
        dict: 전처리된 텐서와 원본 데이터프레임 또는 오류 메시지.
    """
    try:
        # 타임스탬프 변환
        df['timestamp'] = pd.to_datetime(df['measure_time'], unit='ms')
        df['date_time'] = df['timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S')
        
        # 중첩된 딕셔너리에서 값 추출
        df['oxygen_ppm'] = df['oxygen_mpl'].apply(lambda x: json.loads(str(x).replace("'", '"'))['value'])
        
        # 이상치 및 결측치 확인
        if df['oxygen_ppm'].isnull().any():
            print("Warning: Missing values detected in oxygen_ppm")
        
        # 데이터 정규화 (필요한 경우 주석 처리)
        # scaler = joblib.load('scaler.save')  # 저장된 스케일러가 있다면 로드
        # df['oxygen_ppm'] = scaler.transform(df[['oxygen_ppm']])
        
        # 필요한 피처만 선택하여 텐서로 변환
        features = ['oxygen_ppm']
        X = df[features].values
        X = torch.FloatTensor(X).unsqueeze(0)  # 배치 차원 추가
        
        return {"status": "success", "tensor": X, "processed_df": df}
    
    except Exception as e:
        return {"status": "error", "message": str(e)}

# 4. Load Model
def load_model(model_path):
    """
    저장된 GRU 모델을 로드합니다.
    Args:
        model_path (str): 모델 파일 경로.
    Returns:
        dict: 로드된 모델과 디바이스 정보 또는 오류 메시지.
    """
    try:
        # 모델 정의
        input_size = 1  # oxygen_ppm
        hidden_size = 32
        output_size = 2
        num_layers = 1

        # 모델 인스턴스 생성
        model = GRUModel(input_size, hidden_size, output_size, num_layers)
        
        # GPU 사용 가능 여부 확인
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        # 저장된 가중치 로드
        if torch.cuda.is_available():
            model.load_state_dict(torch.load(model_path))
        else:
            model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
            
        model.to(device)
        model.eval()

        return {"status": "success", "model": model, "device": device}
    
    except Exception as e:
        return {"status": "error", "message": str(e)}

# 5. Predict Results
def predict_anomaly(model, data, device):
    """
    모델을 사용하여 이상 여부를 예측합니다.
    Args:
        model (torch.nn.Module): 로드된 모델.
        data (torch.Tensor): 전처리된 입력 데이터.
        device (torch.device): 사용 중인 디바이스 (CPU/GPU).
    Returns:
        dict: 예측된 클래스, 확률 분포 또는 오류 메시지.
    """
    try:
        # 모델 예측
        with torch.no_grad():
            data = data.to(device)
            outputs = model(data)  # 모델 출력값
            _, predicted = torch.max(outputs, 1)  # 가장 높은 확률의 클래스
            probabilities = torch.nn.functional.softmax(outputs, dim=1)  # 확률 분포 계산

        # 결과 반환
        return {
            "status": "success",
            "predicted_class": predicted.item(),  # 예측된 클래스
            "probabilities": probabilities[0].cpu().tolist()  # 확률 분포를 리스트로 반환
        }

    except Exception as e:
        # 오류 발생 시 메시지 반환
        return {"status": "error", "message": str(e)}
    

def ai_flow():
    try:
        # 1. 액세스 토큰 획득
        token_response = get_access_token()
        if token_response["status"] != "success":
            raise Exception(token_response["message"])
        token = token_response["access_token"]

        # 2. 데이터 수집
        device_id = "wando01"  # 예제 장치 ID
        data_response = collect_recent_data(device_id, token)
        if data_response["status"] != "success":
            raise Exception(data_response["message"])
        df = data_response["data"]

        # 3. 데이터 전처리
        preprocess_response = preprocess_data(df)
        if preprocess_response["status"] != "success":
            raise Exception(preprocess_response["message"])
        processed_data = preprocess_response["tensor"]

        # 4. 모델 로드
        model_path = "model.pth"  # 모델 경로 (실제 경로로 수정 필요)
        model_response = load_model(model_path)
        if model_response["status"] != "success":
            raise Exception(model_response["message"])
        model = model_response["model"]
        device = model_response["device"]

        # 5. 예측
        prediction_response = predict_anomaly(model, processed_data, device)
        if prediction_response["status"] != "success":
            raise Exception(prediction_response["message"])
        
        # 예측 결과 출력
        print("Predicted Class:", prediction_response["predicted_class"])
        print("Probabilities:", prediction_response["probabilities"])

    except Exception as e:
        print("Error during execution:", str(e))
