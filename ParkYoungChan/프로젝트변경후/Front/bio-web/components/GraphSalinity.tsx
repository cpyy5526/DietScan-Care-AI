'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchData } from '@/app/api/api_protect/fetchData';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Title, Tooltip, Legend, Filler, ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Title, Tooltip, Filler, Legend);

interface ResultItem {
  measure_time: number; // 13자리 Unix timestamp
  salinity: {
    value: number;
    unit: string;
  };
}

interface GraphSalinityProps {
  deviceId: string;
  day: number;
}

export default function GraphSalinity({ deviceId, day }: GraphSalinityProps) {
  const [salinity, setOxygen] = useState<ResultItem[]>([]);

  useEffect(() => {
    const fetchOxygenData = async () => {
      try {
        const data = await fetchData(deviceId, 'conductivity', day); // fetchData 호출
        console.log('Data fetched:', data); // 콘솔에 데이터 출력
        setOxygen(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOxygenData();
  }, [deviceId, day]);

  const formattedData = useMemo(
    () =>
      salinity.map((item) => ({
        x: new Date(item.measure_time), // 13자리 Unix timestamp
        y: item.salinity.value,
      })),
    [salinity]
  );

  const chartData = useMemo(
    () => ({
      datasets: [
        {
          label: 'Salinity',
          data: formattedData,
          borderColor: '#7B1FA2',
          backgroundColor: 'rgb(206, 147, 216, 0.2)',
          fill: true,
        },
      ],
    }),
    [formattedData]
  );

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Salinity Time Series',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const rawData = context.raw as { x: Date; y: number }; // 타입 명시
            const date = new Date(rawData.x);
            const hours = date.getHours();
            const formattedTime = `${hours % 12 || 12}${hours >= 12 ? 'pm' : 'am'}`;
            return `Date: ${date.getMonth() + 1}/${date.getDate()} ${formattedTime} Value: ${rawData.y} ppm`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'MM/dd h:mm a', // 툴팁 날짜 및 시간 포맷
          unit: 'hour', // 시간 단위로 표시
        },
        ticks: {
          callback: (value, index, ticks) => {
            const currentDate = new Date(value as number);
            const currentDay = currentDate.toDateString();

            // 이전 tick의 날짜 가져오기
            const prevTick = ticks[index - 1];
            const prevDate = prevTick ? new Date(prevTick.value as number).toDateString() : null;

            // 첫 번째 데이터인 경우 날짜와 시간 표시
            if (index === 0) {
              return `${currentDate.getMonth() + 1}/${currentDate.getDate()} ${currentDate.getHours() % 12 || 12}${currentDate.getHours() >= 12 ? 'pm' : 'am'}`;
            }

            // 날짜가 바뀌는 경우 날짜와 시간 표시
            if (currentDay !== prevDate) {
              return `${currentDate.getMonth() + 1}/${currentDate.getDate()} ${currentDate.getHours() % 12 || 12}${currentDate.getHours() >= 12 ? 'pm' : 'am'}`;
            }

            // 날짜가 동일한 경우 시간만 표시
            return `${currentDate.getHours() % 12 || 12}${currentDate.getHours() >= 12 ? 'pm' : 'am'}`;
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
      },

      y: {
        title: {
          display: true,
          text: 'Salinity',
        },
      },
    },
  };

  if (salinity.length === 0) {
    return <p>Loading data, please wait...</p>;
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={chartData} options={options} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
