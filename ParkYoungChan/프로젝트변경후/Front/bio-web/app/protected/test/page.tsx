'use client';
import { useEffect } from 'react';
import { useBackgroundContext } from './context';

export default function Home() {
  // 컨텍스트에서 상태와 상태 변경 함수 가져오기
  const { isBackgroundActive, setIsBackgroundActive } = useBackgroundContext();

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBackgroundActive(e.target.checked);
  };

  // 배경 스타일 업데이트
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      if (isBackgroundActive) {
        body.style.backgroundImage = "url('/wave-background.png')";
      } else {
        body.style.backgroundImage = 'none';
        body.style.background = '#F8F8FA';
      }
    }
  }, [isBackgroundActive]); // `isBackgroundActive` 상태가 변경될 때만 실행

  return (
    <div>
      <label>
        <input type="checkbox" checked={isBackgroundActive} onChange={handleCheckboxChange} />
        배경전환
      </label>
    </div>
  );
}
