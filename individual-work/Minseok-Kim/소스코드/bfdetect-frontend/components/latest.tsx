'use client';

import { useEffect, useState } from 'react';
import Modal from './Modal'; // Modal 컴포넌트 가져오기

async function fetchLatestData(sensor_id: string) {
  const response = await fetch(`/api/api_protect/latest?sensor_id=${sensor_id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

interface LatestProps {
  deviceId: string;
}

export default function Latest({ deviceId }: LatestProps) {
  const [latestResult, setLatestResult] = useState<number | null>(null); // latestResult 상태
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부

  useEffect(() => {
    fetchLatestData(deviceId)
      .then((data) => {
        setLatestResult(data.inference_result); // inference_result를 latestResult로 저장
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch data');
      });
  }, [deviceId]);

  useEffect(() => {
    if (latestResult === 1) {
      setIsModalOpen(true); // 모달 열기
    }
  }, [latestResult]);

  const closeModal = () => setIsModalOpen(false); // 모달 닫기

  if (error) {
    return <div>{error}</div>; // 에러 메시지 표시
  }

  return (
    <div>
      {latestResult === 1 ? 'O' : 'X'}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} deviceId={deviceId} />
    </div>
  );
}
