import pandas as pd

# 엑셀 파일 경로 설정 (엑셀 시트 파일 경로에 맞게 설정 필요)
wando1_hydrogen = "/Users/limjuhyeok/Library/Mobile Documents/com~apple~CloudDocs/대학교 파일모음/2024-2/종합설계프로젝트1/biofouling/Biofouling-Detect-AI/데이터 수집/hydrogen/wando1_hydrogen(full_data).xlsx"
wando2_hydrogen = "/Users/limjuhyeok/Library/Mobile Documents/com~apple~CloudDocs/대학교 파일모음/2024-2/종합설계프로젝트1/biofouling/Biofouling-Detect-AI/데이터 수집/hydrogen/wando2_hydrogen(full_data).xlsx"
wando1_oxygen = "/Users/limjuhyeok/Library/Mobile Documents/com~apple~CloudDocs/대학교 파일모음/2024-2/종합설계프로젝트1/biofouling/Biofouling-Detect-AI/데이터 수집/oxygen/wando1_oxygen(full_data).xlsx"
wando2_oxygen = "/Users/limjuhyeok/Library/Mobile Documents/com~apple~CloudDocs/대학교 파일모음/2024-2/종합설계프로젝트1/biofouling/Biofouling-Detect-AI/데이터 수집/oxygen/wando2_oxygen(full_data).xlsx"


# 1. 엑셀 파일에서 데이터 불러오기
df = pd.read_excel(wando1_hydrogen)

# 2. 좌표(coordinates)에서 latitude와 longitude 분리
df['latitude'] = df['coordinates'].apply(lambda x: eval(x)['latitude'] if isinstance(x, str) else x['latitude'])
df['longitude'] = df['coordinates'].apply(lambda x: eval(x)['longitude'] if isinstance(x, str) else x['longitude'])

# 3. 온도(temperature)에서 값과 단위 분리
df['temperature_value'] = df['temperature'].apply(lambda x: eval(x)['value'] if isinstance(x, str) else x['value'])
df['temperature_unit'] = df['temperature'].apply(lambda x: eval(x)['unit'] if isinstance(x, str) else x['unit'])

# 4. 용존 산소(oxygen_mpl, oxygen_per, oxygen_ppm)에서 값과 단위 분리
df['oxygen_mpl_value'] = df['oxygen_mpl'].apply(lambda x: eval(x)['value'] if isinstance(x, str) else x['value'])
df['oxygen_mpl_unit'] = df['oxygen_mpl'].apply(lambda x: eval(x)['unit'] if isinstance(x, str) else x['unit'])

df['oxygen_per_value'] = df['oxygen_per'].apply(lambda x: eval(x)['value'] if isinstance(x, str) else x['value'])
df['oxygen_per_unit'] = df['oxygen_per'].apply(lambda x: eval(x)['unit'] if isinstance(x, str) else x['unit'])

df['oxygen_ppm_value'] = df['oxygen_ppm'].apply(lambda x: eval(x)['value'] if isinstance(x, str) else x['value'])
df['oxygen_ppm_unit'] = df['oxygen_ppm'].apply(lambda x: eval(x)['unit'] if isinstance(x, str) else x['unit'])

# 5. 불필요한 열 삭제
df_cleaned = df.drop(columns=['coordinates', 'temperature', 'oxygen_mpl', 'oxygen_per', 'oxygen_ppm'])

# 6. 정리된 데이터 출력
print(df_cleaned.head())

# 7. 정리된 데이터를 CSV 파일로 저장
# output_csv_file = '/content/wando01_cleaned_data.csv'
# df_cleaned.to_csv(output_csv_file, index=False)

print(f"Cleaned data saved to CSV at: {output_csv_file}")