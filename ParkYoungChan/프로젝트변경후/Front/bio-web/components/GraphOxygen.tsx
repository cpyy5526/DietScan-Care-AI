'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchData } from '@/app/api/fetchData';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Title, Tooltip, Legend, Filler, ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Title, Tooltip, Filler, Legend);

interface ResultItem {
  measure_time: number; // 13자리 Unix timestamp (밀리초)
  oxygen_ppm: {
    value: number;
    unit: string;
  };
}

interface GraphOxygenProps {
  deviceId: string;
  day: number;
}

export default function GraphOxygen({ deviceId, day }: GraphOxygenProps) {
  const [oxygen, setOxygen] = useState<ResultItem[]>([]);

  useEffect(() => {
    const fetchOxygenData = async () => {
      try {
        const data = await fetchData(deviceId, 'oxygen', day); // fetchData 호출
        console.log('Data fetched:', data); // 콘솔에 데이터 출력
        setOxygen(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOxygenData();
  }, [deviceId]);

  const formattedData = useMemo(
    () =>
      oxygen.map((item) => ({
        x: new Date(item.measure_time), // 13자리 Unix timestamp
        y: item.oxygen_ppm.value,
      })),
    [oxygen]
  );

  const chartData = useMemo(
    () => ({
      datasets: [
        {
          label: 'Oxygen (ppm)',
          data: formattedData,
          borderColor: '#4FC3F7',
          backgroundColor: 'rgba(79, 195, 247, 0.2)', // 진한 초록색, 약간 투명
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
        text: 'Oxygen PPM Time Series',
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
          unit: 'hour', // x축 단위: 시간
        },
        ticks: {
          callback: (value, index, ticks) => {
            const date = new Date(value as number);
            const hours = date.getHours();
            const formattedTime = `${hours % 12 || 12}${hours >= 12 ? 'pm' : 'am'}`;
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

            // 첫 번째 데이터 혹은 날짜가 변경되는 경우 날짜 + 시간 표시
            if (
              index === 0 || // 첫 번째 데이터
              new Date(ticks[index]?.value).toDateString() !== new Date(ticks[index - 1]?.value).toDateString()
            ) {
              return `${formattedDate} ${formattedTime}`;
            }

            // 기본적으로 시간만 표시
            return formattedTime;
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Oxygen (ppm)',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={chartData} options={options} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
