'use client';

import { useEffect, useState } from 'react';

async function fetchLatestData(sensor_id: string) {
  const response = await fetch(`/api/api_protect/latest?sensor_id=${sensor_id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

interface latestProps {
  deviceId: string;
}
export default function latest({ deviceId }: latestProps) {
  const [latestResult, setLatestResult] = useState<number | null>(null); // latestResult 상태
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestData(deviceId)
      .then((data) => {
        setLatestResult(data.inference_result); // inference_result를 latestResult로 저장
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch data');
      });
  }, []);

  return <div>{latestResult === 1 ? `O` : 'X'}</div>;
}
