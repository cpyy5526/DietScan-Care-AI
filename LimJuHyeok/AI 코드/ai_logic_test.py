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

def get_access_token():
    """API 액세스 토큰을 획득합니다."""
    url = 'https://auth.odn.us/auth/login'
    data = {
        'username': '01084837725',
        'password': '!Bigwave1234'
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    response = requests.post(url, data=data, headers=headers)
    return response.json()["access_token"]

def collect_recent_data(device_id, token, sequence_length=720):
    """최근 sequence_length 개수만큼의 데이터를 수집합니다."""
    url = f'https://rojy53nt54.execute-api.ap-northeast-2.amazonaws.com/Prod/devices/{device_id}/sensors/oxygen'
    
    # 현재 시간 기준으로 충분한 데이터를 수집하기 위한 시간 범위 설정
    end_time = datetime.now()
    start_time = end_time - timedelta(days=2)  # 2일치 데이터 수집 (여유있게)
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    
    params = {
        "b_time": int(start_time.timestamp() * 1000),
        "a_time": int(end_time.timestamp() * 1000),
        "size": sequence_length * 2  # 여유있게 2배 수집
    }
    
    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()  # HTTP 에러 체크
        data = response.json()
        
        if isinstance(data, list):
            df = pd.DataFrame(data)
        elif isinstance(data, dict) and 'result' in data:
            df = pd.DataFrame(data['result'])
        else:
            raise ValueError("Unexpected data format received from API")
        
        # 최근 sequence_length개 데이터만 사용
        if len(df) < sequence_length:
            raise ValueError(f"Insufficient data: only {len(df)} records available, {sequence_length} required")
            
        df = df.tail(sequence_length)
        return df
        
    except requests.exceptions.RequestException as e:
        print(f"API 요청 중 오류 발생: {e}")
        raise
    except Exception as e:
        print(f"데이터 수집 중 오류 발생: {e}")
        raise

def preprocess_data(df):
    """수집된 데이터를 전처리합니다."""
    try:
        # 타임스탬프 변환
        df['timestamp'] = pd.to_datetime(df['measure_time'], unit='ms')
        df['date_time'] = df['timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S')
        
        # 중첩된 딕셔너리에서 값 추출
        df['oxygen_ppm'] = df['oxygen_mpl'].apply(lambda x: json.loads(str(x).replace("'", '"'))['value'])
        
        # 이상치 및 결측치 확인
        if df['oxygen_ppm'].isnull().any():
            print("Warning: Missing values detected in oxygen_ppm")
        
        # 데이터 정규화 (필요한 경우)
        # scaler = joblib.load('scaler.save')  # 저장된 스케일러가 있다면 로드
        # df['oxygen_ppm'] = scaler.transform(df[['oxygen_ppm']])
        
        # 필요한 피처만 선택하여 텐서로 변환
        features = ['oxygen_ppm']
        X = df[features].values
        X = torch.FloatTensor(X).unsqueeze(0)  # 배치 차원 추가
        
        return X, df
        
    except Exception as e:
        print(f"데이터 전처리 중 오류 발생: {e}")
        raise

def validate_data(df):
    """수집된 데이터의 기본적인 검증을 수행합니다."""
    print("\n=== 데이터 기본 정보 ===")
    print(f"데이터 크기: {df.shape}")
    print("\n=== 결측치 확인 ===")
    print(df.isnull().sum())
    
    # 수집된 시간 범위 확인
    time_range = pd.to_datetime(df['date_time'])
    print("\n=== 시간 범위 ===")
    print(f"시작: {time_range.min()}")
    print(f"종료: {time_range.max()}")
    print(f"전체 기간: {time_range.max() - time_range.min()}")

def load_model(model_path):
    """저장된 모델을 로드합니다."""
    try:
        # 모델 파라미터 설정
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
        
        return model, device
        
    except Exception as e:
        print(f"모델 로드 중 오류 발생: {e}")
        raise

def predict_anomaly(model, data, device):
    """모델을 사용하여 이상 여부를 예측합니다."""
    try:
        with torch.no_grad():
            data = data.to(device)
            outputs = model(data)
            _, predicted = torch.max(outputs, 1)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
        return predicted.item(), probabilities[0].cpu()
        
    except Exception as e:
        print(f"예측 중 오류 발생: {e}")
        raise

def save_results(results, processed_df):
    """예측 결과를 파일로 저장합니다."""
    try:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # 예측 결과 저장
        output_filename = f'prediction_result_{timestamp}.json'
        with open(output_filename, 'w') as f:
            json.dump(results, f, indent=4)
            
        # 처리된 데이터 저장
        data_filename = f'processed_data_{timestamp}.csv'
        processed_df.to_csv(data_filename, index=False)
        
        return output_filename, data_filename
        
    except Exception as e:
        print(f"결과 저장 중 오류 발생: {e}")
        raise

def main():
    try:
        # 1. 모델 로드
        model_path = "model.pth"  # 모델 경로 수정 필요
        model, device = load_model(model_path)
        print("Model loaded successfully")
        
        # 2. 액세스 토큰 획득
        token = get_access_token()
        print("Access token acquired")
        
        # 3. 실시간 데이터 수집
        device_id = 'wando01'
        df = collect_recent_data(device_id, token)
        print(f"Collected {len(df)} records")
        
        # 4. 데이터 전처리
        X, processed_df = preprocess_data(df)
        print("Data preprocessing completed")

        validate_data(df)
        
        # 5. 예측 수행
        prediction, probabilities = predict_anomaly(model, X, device)
        
        # 6. 결과 출력
        print("\nPrediction Results:")
        print(f"Status: {'Abnormal' if prediction == 1 else 'Normal'}")
        print(f"Confidence: Normal {probabilities[0]:.2%}, Abnormal {probabilities[1]:.2%}")
        
        # 7. 최근 데이터 상태 출력
        print("\nRecent Oxygen Levels:")
        print(processed_df[['date_time', 'oxygen_ppm']].tail())
        
        # 8. 결과 저장
        results = {
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'prediction': 'Abnormal' if prediction == 1 else 'Normal',
            'normal_probability': float(probabilities[0]),
            'abnormal_probability': float(probabilities[1]),
            'recent_oxygen_levels': processed_df['oxygen_ppm'].tolist()[-5:],  # 최근 5개 데이터
            'device_id': device_id
        }
        
        output_filename, data_filename = save_results(results, processed_df)
        print(f"\nResults saved to {output_filename}")
        print(f"Processed data saved to {data_filename}")
        
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        raise

if __name__ == "__main__":
    main()