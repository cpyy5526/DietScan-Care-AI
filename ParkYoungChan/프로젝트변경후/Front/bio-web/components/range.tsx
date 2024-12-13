'use client';

import { useEffect, useState } from 'react';
import { Table } from 'antd';

async function fetchRangeData(sensor_id: string, start_time: string, end_time: string) {
  const response = await fetch(`/api/range?sensor_id=${sensor_id}&start_time=${start_time}&end_time=${end_time}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

interface RangeData {
  deviceId: string;
  day: number;
}

export default function RangeDataTable({ deviceId, day }: RangeData) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startDate = new Date(day);
    const endDate = new Date(day + 24 * 60 * 60 * 1000);

    const formatTime = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}000`;

    const formattedStartTime = formatTime(startDate);
    const formattedEndTime = formatTime(endDate);

    setLoading(true);
    fetchRangeData(deviceId, formattedStartTime, formattedEndTime)
      .then((fetchedData) => {
        const formattedData = fetchedData.map((item: any, index: number) => ({
          key: index,
          inference_time: item.inference_time,
          inference_result: item.inference_result,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [deviceId, day]);

  const columns = [
    {
      title: 'Inference Time',
      dataIndex: 'inference_time',
      key: 'inference_time',
    },
    {
      title: 'Inference Result',
      dataIndex: 'inference_result',
      key: 'inference_result',
    },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <Table columns={columns} dataSource={data} loading={loading} pagination={false} />;
}
