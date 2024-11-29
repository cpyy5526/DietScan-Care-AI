# RNN,GRU,LSTM 정리 및 코드

[딥러닝 개념](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/%E1%84%83%E1%85%B5%E1%86%B8%E1%84%85%E1%85%A5%E1%84%82%E1%85%B5%E1%86%BC%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%2013408556ef388050b0a7e949a8fa3f31.md)

[RNN,GRU,LSTM 개념 정리](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/RNN,GRU,LSTM%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%2013208556ef3880c5bfbeda1cdebb96e7.md)

[오든바이오파울링탐지_baseline (1).ipynb](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2583%25E1%2585%25B3%25E1%2586%25AB%25E1%2584%2587%25E1%2585%25A1%25E1%2584%258B%25E1%2585%25B5%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2591%25E1%2585%25A1%25E1%2584%258B%25E1%2585%25AE%25E1%2586%25AF%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25BC%25E1%2584%2590%25E1%2585%25A1%25E1%2586%25B7%25E1%2584%258C%25E1%2585%25B5_baseline_(1).ipynb)

## 시도1

- 비정상 데이터 정의

```python
import pandas as pd
import numpy as np

# 데이터 초기화 및 설정
df['is_abnormal'] = 0

# 1. 연속적인 급격한 감소 기준 설정
drop_threshold = -0.1  # 예시 변화율 기준 (추후 데이터에 맞게 조정 가능)
sequence_length = 50   # 연속적인 감소를 판단하는 구간 길이

for device_id in df['device_id'].unique():
    device_data = df[df['device_id'] == device_id].reset_index(drop=True)
    
    # 변화율 계산
    device_data['oxygen_diff'] = device_data['oxygen_ppm'].diff().fillna(0)
    
    # 연속적인 급격한 감소 구간을 비정상으로 설정
    device_data['is_drop'] = device_data['oxygen_diff'] <= drop_threshold
    device_data['drop_sequence'] = device_data['is_drop'].astype(int).groupby((~device_data['is_drop']).cumsum()).cumsum()
    device_data.loc[device_data['drop_sequence'] >= sequence_length, 'is_abnormal'] = 1
    
    # 2. 낮은 산소 농도 유지 구간을 비정상으로 설정 (산소 농도 3 이하)
    device_data.loc[device_data['oxygen_ppm'] <= 3, 'is_abnormal'] = 1
    
    # 3. 산소 농도가 1 이하로 유지되는 구간이 100개 이상인 경우 비정상으로 설정
    device_data['low_oxygen'] = device_data['oxygen_ppm'] <= 1
    device_data['low_oxygen_duration'] = device_data['low_oxygen'].astype(int).groupby((~device_data['low_oxygen']).cumsum()).cumsum()
    device_data.loc[device_data['low_oxygen_duration'] >= 100, 'is_abnormal'] = 1
    
    # 결과 반영
    df.update(device_data[['is_abnormal']])

# 최종 비정상 데이터 확인
abnormal_df = df[df['is_abnormal'] == 1].copy()

```

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image.png)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%201.png)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%202.png)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%203.png)

Classification Report:
precision    recall  f1-score   support

```
  Normal       0.85      0.90      0.87     32390
Abnormal       0.69      0.60      0.64     12776

accuracy                           0.81     45166

```

macro avg       0.77      0.75      0.76     45166
weighted avg       0.80      0.81      0.81     45166

## 시도2

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%204.png)

10월 10일 12:00시 이후부터 wando02에서 변동성이 높아졌고, 이후 급격하게 감소하는 패턴

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%205.png)

- 비정상 정의

```python
import pandas as pd
import numpy as np

# 초기화: 비정상 여부를 나타내는 열을 0으로 설정
df['is_abnormal'] = 0

# 1. 용존산소 3 이하인 경우 비정상으로 라벨링
df['is_abnormal'] = (df['oxygen_ppm'] <= 3).astype(int)

# 2. 특정 날짜 구간의 비정상 라벨링
df.loc[(df['device_id'] == 'wando01') & (df['date_time'].between('2024-09-16', '2024-10-23 06:00:00')), 'is_abnormal'] = 1
df.loc[(df['device_id'] == 'wando02') & (df['date_time'] >= '2024-10-10 12:00:00'), 'is_abnormal'] = 1

# 3. 비정상 패턴이 나타나기 전 719개 데이터까지 벡터화된 방식으로 처리
abnormal_indices = df[df['is_abnormal'] == 1].index

# 비정상 인덱스 기준으로 719개 전까지의 인덱스를 계산
shift_array = np.zeros(len(df), dtype=int)  # 초기 배열 생성
for abnormal_index in abnormal_indices:
    start_index = max(0, abnormal_index - 719)
    shift_array[start_index:abnormal_index + 1] = 1

# 데이터프레임에 결과 적용
df['is_abnormal'] = np.maximum(df['is_abnormal'], shift_array)

# 결과 확인
print("Updated abnormal data labeling:")
print(df[df['is_abnormal'] == 1].head())

```

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%206.png)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%207.png)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%208.png)

Classification Report:
precision    recall  f1-score   support

```
  Normal       0.78      0.95      0.86     21191
Abnormal       0.94      0.76      0.84     23866

accuracy                           0.85     45057

```

macro avg       0.86      0.85      0.85     45057
weighted avg       0.87      0.85      0.85     45057

→ 에포크 조기 종료 10으로 변경

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%209.png)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%2010.png)

Classification Report:
precision    recall  f1-score   support

```
  Normal       0.82      0.91      0.86     21191
Abnormal       0.91      0.83      0.87     23866

accuracy                           0.86     45057

```

macro avg       0.87      0.87      0.86     45057
weighted avg       0.87      0.86      0.86     45057

## 시도3

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%2011.png)

→ 9월 9일 15시경부터 변동성이 급격하게 커짐을 확인 → 해당 데이터와 wando2 (10-10 12:00:00) 데이터만을 비정상 데이터로 정의

```python
#시도3
import pandas as pd

# 초기화: 비정상 여부를 나타내는 열을 0으로 설정
df['is_abnormal'] = 0

# 1. wando01에서 9월 9일 15시 이후 비정상 라벨링 (날짜 변경)
start_date_wando01 = pd.Timestamp('2024-09-09 15:00:00')
end_date_wando01 = pd.Timestamp('2024-10-23 06:00:00')
df.loc[(df['device_id'] == 'wando01') & (df['date_time'].between(start_date_wando01, end_date_wando01)), 'is_abnormal'] = 1

# 2. wando02에서 10월 10일 이후 비정상 라벨링
start_date_wando02 = pd.Timestamp('2024-10-10 12:00:00')
df.loc[(df['device_id'] == 'wando02') & (df['date_time'] >= start_date_wando02), 'is_abnormal'] = 1

# 3. 비정상 패턴이 나타나기 전 719개 데이터까지 라벨링
# 비정상 인덱스를 찾고, 해당 인덱스 이전의 719개를 비정상으로 설정
df['abnormal_index'] = df['is_abnormal'].cumsum()  # 비정상 패턴 인덱스 마커

# 각 비정상 데이터에 대해 719개 전까지 라벨링
df['is_abnormal'] = df['is_abnormal'].rolling(window=720, min_periods=1).max()

# 마커 열 삭제
df.drop(columns=['abnormal_index'], inplace=True)

# 결과 확인
print("Updated abnormal data labeling (optimized):")
print(df[df['is_abnormal'] == 1].head())
```

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%2012.png)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%2013.png)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%2014.png)

Classification Report:
               precision    recall  f1-score   support

      Normal       0.99      1.00      0.99     32209
    Abnormal       1.00      0.98      0.99     12848

    accuracy                           0.99     45057
   macro avg       0.99      0.99      0.99     45057
weighted avg       0.99      0.99      0.99     45057

---

### 학습용 데이터 구축 코드

```python
import torch
from torch.utils.data import Dataset, DataLoader
import numpy as np
import pandas as pd
from torch.utils.data import random_split

# Parameters
sequence_length = 720  # 하루 단위 시퀀스 (2분 단위의 720 타임 스텝)
features = ['oxygen_ppm']  # 모델 입력에 사용할 특징

# Function to create sequences from the data
def create_sequences(df, label):
    df = df.sort_values('date_time').reset_index(drop=True)
    data = df[features].values
    sequences = []
    labels = []
    num_sequences = len(data) - sequence_length + 1
    for i in range(num_sequences):
        seq = data[i:i+sequence_length]
        sequences.append(seq)
        labels.append(label)
    return sequences, labels

# 디바이스별로 시퀀스를 생성하여 각 데이터를 병합
all_normal_sequences = []
all_normal_labels = []
all_abnormal_sequences = []
all_abnormal_labels = []

for device_id in df['device_id'].unique():
    device_data = df[df['device_id'] == device_id].reset_index(drop=True)
    
    # Normal sequences (label=0)
    normal_data = device_data[device_data['is_abnormal'] == 0]
    normal_sequences, normal_labels = create_sequences(normal_data, label=0)
    all_normal_sequences.extend(normal_sequences)
    all_normal_labels.extend(normal_labels)
    
    # Abnormal sequences (label=1)
    abnormal_data = device_data[device_data['is_abnormal'] == 1]
    abnormal_sequences, abnormal_labels = create_sequences(abnormal_data, label=1)
    all_abnormal_sequences.extend(abnormal_sequences)
    all_abnormal_labels.extend(abnormal_labels)

# Combine normal and abnormal sequences
all_sequences = np.array(all_normal_sequences + all_abnormal_sequences)
all_labels = np.array(all_normal_labels + all_abnormal_labels)

# Shuffle the data
indices = np.arange(len(all_sequences))
np.random.shuffle(indices)
all_sequences = all_sequences[indices]
all_labels = all_labels[indices]

# Define PyTorch Dataset
class OxygenDataset(Dataset):
    def __init__(self, sequences, labels):
        self.sequences = torch.tensor(sequences, dtype=torch.float32)
        self.labels = torch.tensor(labels, dtype=torch.long)

    def __len__(self):
        return len(self.sequences)

    def __getitem__(self, idx):
        return self.sequences[idx], self.labels[idx]

# Create the dataset
dataset = OxygenDataset(all_sequences, all_labels)

# Parameters for train/validation/test split
train_ratio = 0.7
val_ratio = 0.15
test_ratio = 0.15

# Calculate lengths for each split
dataset_size = len(dataset)
train_size = int(train_ratio * dataset_size)
val_size = int(val_ratio * dataset_size)
test_size = dataset_size - train_size - val_size  # Ensures no leftover samples

# Split the dataset
train_dataset, val_dataset, test_dataset = random_split(dataset, [train_size, val_size, test_size])

# Create DataLoaders for each split
batch_size = 64
train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
val_dataloader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
test_dataloader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

# Example usage with train DataLoader
for batch_sequences, batch_labels in train_dataloader:
    # batch_sequences shape: [batch_size, sequence_length, num_features]
    # batch_labels shape: [batch_size]
    # Here you would pass batch_sequences to your GRU model for training
    pass  # Replace with your training code

# Print dataset sizes
print(f"Train dataset size: {len(train_dataset)}")
print(f"Validation dataset size: {len(val_dataset)}")
print(f"Test dataset size: {len(test_dataset)}")
```

### 모델 학습 코드

```python
!mkdir -p checkpoint

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
from tqdm import tqdm
import os
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
import numpy as np

# Define LSTM-based model
class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, output_size, num_layers=1):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        out, (hn, cn) = self.lstm(x)  # out: [batch_size, seq_len, hidden_size]
        out = self.fc(out[:, -1, :])  # Use the last time step's output
        return out

# Model parameters
input_size = len(features)  # Number of features (e.g., oxygen_ppm)
hidden_size = 32
output_size = 2  # Binary classification (normal/abnormal)
num_layers = 1
epochs = 20
learning_rate = 0.001
best_val_loss = float('inf')
best_model_path = "checkpoint/best_lstm_model.pth"

# Check for GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Instantiate the model, define loss function and optimizer
model = LSTMModel(input_size, hidden_size, output_size, num_layers).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# Learning rate scheduler to reduce learning rate if validation loss does not improve
scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', factor=0.5, patience=3, verbose=True)

# Early stopping parameters
early_stop_patience = 10
no_improvement_count = 0

# Lists to store loss values for plotting
train_losses = []
val_losses = []

# Training loop
for epoch in range(epochs):
    model.train()
    running_loss = 0.0
    correct_predictions = 0
    total_predictions = 0

    # Add tqdm for training progress visualization
    train_loader_tqdm = tqdm(train_dataloader, desc=f"Epoch [{epoch+1}/{epochs}] Training")
    for batch_sequences, batch_labels in train_loader_tqdm:
        batch_sequences, batch_labels = batch_sequences.to(device), batch_labels.to(device)

        # Zero the gradients
        optimizer.zero_grad()

        # Forward pass
        outputs = model(batch_sequences)
        loss = criterion(outputs, batch_labels)

        # Backward pass and optimize
        loss.backward()
        optimizer.step()

        # Track loss and accuracy
        running_loss += loss.item()
        _, predicted = torch.max(outputs, 1)
        correct_predictions += (predicted == batch_labels).sum().item()
        total_predictions += batch_labels.size(0)

    # Calculate training loss and accuracy
    epoch_loss = running_loss / len(train_dataloader)
    epoch_accuracy = correct_predictions / total_predictions
    train_losses.append(epoch_loss)
    print(f"Epoch [{epoch+1}/{epochs}], Loss: {epoch_loss:.4f}, Accuracy: {epoch_accuracy:.4f}")

    # Validation loop
    model.eval()
    val_loss = 0.0
    correct_predictions = 0
    total_predictions = 0

    with torch.no_grad():
        val_loader_tqdm = tqdm(val_dataloader, desc=f"Epoch [{epoch+1}/{epochs}] Validation")
        for batch_sequences, batch_labels in val_loader_tqdm:
            batch_sequences, batch_labels = batch_sequences.to(device), batch_labels.to(device)
            outputs = model(batch_sequences)
            loss = criterion(outputs, batch_labels)
            val_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            correct_predictions += (predicted == batch_labels).sum().item()
            total_predictions += batch_labels.size(0)

    # Calculate validation loss and accuracy
    val_epoch_loss = val_loss / len(val_dataloader)
    val_epoch_accuracy = correct_predictions / total_predictions
    val_losses.append(val_epoch_loss)
    print(f"Validation Loss: {val_epoch_loss:.4f}, Validation Accuracy: {val_epoch_accuracy:.4f}")

    # Save the best model based on validation loss
    if val_epoch_loss < best_val_loss:
        best_val_loss = val_epoch_loss
        torch.save(model.state_dict(), best_model_path)
        print(f"Best model saved with validation loss: {best_val_loss:.4f}")
        print("===============================================================================================")
        no_improvement_count = 0  # Reset early stopping counter
    else:
        no_improvement_count += 1

    # Reduce learning rate if validation loss does not improve
    scheduler.step(val_epoch_loss)

    # Early stopping check
    if no_improvement_count >= early_stop_patience:
        print(f"Early stopping triggered after {epoch+1} epochs.")
        break

# Plot training and validation loss
plt.figure(figsize=(10, 5))
plt.plot(range(1, len(train_losses) + 1), train_losses, label='Train Loss')
plt.plot(range(1, len(val_losses) + 1), val_losses, label='Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.title('Training and Validation Loss Over Epochs')
plt.legend()
plt.show()

```

### 검증 코드

```python
# 검증 코드
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
import torch

# Testing loop
all_labels = []
all_predictions = []
test_loss = 0.0
correct_predictions = 0
total_predictions = 0
model.eval()  # Set the model to evaluation mode

# Load the best model for testing
if os.path.exists(best_model_path):
    model.load_state_dict(torch.load(best_model_path))
    print("Loaded the best model for testing.")

with torch.no_grad():  # No need to compute gradients during testing
    test_loader_tqdm = tqdm(test_dataloader, desc="Testing")
    for batch_sequences, batch_labels in test_loader_tqdm:
        batch_sequences, batch_labels = batch_sequences.to(device), batch_labels.to(device)
        
        # Forward pass
        outputs = model(batch_sequences)
        loss = criterion(outputs, batch_labels)
        test_loss += loss.item()

        # Get predictions
        _, predicted = torch.max(outputs, 1)
        correct_predictions += (predicted == batch_labels).sum().item()
        total_predictions += batch_labels.size(0)
        
        # Collect labels and predictions for evaluation
        all_labels.extend(batch_labels.cpu().numpy())
        all_predictions.extend(predicted.cpu().numpy())

# Calculate test loss and accuracy
test_epoch_loss = test_loss / len(test_dataloader)
test_epoch_accuracy = correct_predictions / total_predictions
print(f"Test Loss: {test_epoch_loss:.4f}, Test Accuracy: {test_epoch_accuracy:.4f}")

# Confusion Matrix
conf_matrix = confusion_matrix(all_labels, all_predictions)
plt.figure(figsize=(10, 7))
sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', xticklabels=['Normal', 'Abnormal'], yticklabels=['Normal', 'Abnormal'])
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()

# Classification Report
class_report = classification_report(all_labels, all_predictions, target_names=['Normal', 'Abnormal'])
print("Classification Report:\n", class_report)

```

- 3이하로 떨어지기 직전의 데이터 719개를 정의
- 

|  | 용존산소 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| 타임 스텝 : 720 |  |  |  |  |
| 1000 |  |  |  |  |
| 1300 |  |  |  |  |

*

|  | 알고리즘 RNN | GRU | LSTM |
| --- | --- | --- | --- |
| 하이퍼파라미터
예시 : 에포크 10 |  |  |  |
| 예시 : 에포크 20 |  |  |  |

---

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%2015.png)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%2016.png)

- 9.15 18:00 ~ 10:23 06:00 데이터 제외 (완도1)

완도2

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%2017.png)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%2018.png)

완도2 : 10.12 18시부터 데이터 제외

- 최종 학습 데이터
    - 특정 기간 데이터 삭제 (완도1: 9월 15일 18:00 ~ 10월 23일 06:00)
    - 특정 기간 데이터 삭제 (완도2: 10월 12일 18:00부터 이후)

![image.png](RNN,GRU,LSTM%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%2013108556ef388035bd5ad782b1bf0a08/image%2019.png)