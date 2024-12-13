import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchData } from '@/app/api/api_protect/fetchData';

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

interface RangeDataItem {
  key: number;
  inference_time: string;
  inference_result: string;
}

interface GraphOxygenProps {
  deviceId: string;
  day: number;
  data: RangeDataItem[]; // data는 RangeDataItem 타입의 배열
}

export default function GraphOxygen({ deviceId, day, data }: GraphOxygenProps) {
  const [oxygen, setOxygen] = useState<ResultItem[]>([]);

  useEffect(() => {
    const fetchOxygenData = async () => {
      try {
        const data = await fetchData(deviceId, 'oxygen', day); // fetchData 호출
        setOxygen(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOxygenData();
  }, [deviceId, day]);

  const formattedData = useMemo(() => {
    const redRanges = data
      .filter((d) => d.inference_result === 'O')
      .map((d) => {
        const inferenceTime = new Date(d.inference_time).getTime();
        return {
          start: inferenceTime - 60 * 60 * 1000, // 1시간 전
          end: inferenceTime,
        };
      });

    return oxygen.map((item) => {
      const isInRedRange = redRanges.some((range) => item.measure_time >= range.start && item.measure_time <= range.end);

      return {
        x: new Date(item.measure_time), // 13자리 Unix timestamp
        y: item.oxygen_ppm.value,
        pointBackgroundColor: isInRedRange ? 'red' : '#4FC3F7', // 빨간색 또는 기본 색
        pointBorderColor: isInRedRange ? 'darkred' : '#4FC3F7',
        pointRadius: isInRedRange ? 6 : 3, // 강조된 포인트는 크기를 크게
      };
    });
  }, [oxygen, data]);

  const chartData = useMemo(
    () => ({
      datasets: [
        {
          label: 'Oxygen (ppm)',
          data: formattedData,
          borderColor: '#4FC3F7',
          backgroundColor: 'rgba(79, 195, 247, 0.2)', // 진한 초록색, 약간 투명
          fill: true,
          pointBackgroundColor: formattedData.map((d) => d.pointBackgroundColor), // 각각의 포인트 색상
          pointRadius: formattedData.map((d) => d.pointRadius), // 각각의 포인트 크기
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
        display: false,
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
