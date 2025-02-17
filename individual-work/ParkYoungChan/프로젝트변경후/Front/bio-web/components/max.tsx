'use client';

import React, { useEffect, useState } from 'react';
import { fetchData } from '@/app/api/api_protect/fetchData';

export default function Statistical({ sensor_name, sensor_value, what_value, day }) {
  const [oxygenValues, setOxygenValues] = useState([]); // 데이터를 저장할 상태
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData(sensor_name, sensor_value, day);

      // 데이터 순서를 반대로 (가장 오래된 시간이 왼쪽, 최신 시간이 오른쪽)
      const reversedData = data.slice().reverse();

      // Y축 값 (pH 값) 추출
      const oxygenValues = reversedData.map((item) => (what_value == 'tds' ? item[what_value].value / 1000 : item[what_value].value));
      if (oxygenValues.some((value) => value > 100)) {
        setError(true);
      }

      // 상태에 저장
      setOxygenValues(oxygenValues);
    };

    loadData();
  }, [sensor_name, sensor_value, what_value]);

  if (error) {
    return <div className="error-text">센서 오류</div>;
  }

  const max = Math.max(...oxygenValues);
  return <div>{max.toFixed(2)}</div>;
}
