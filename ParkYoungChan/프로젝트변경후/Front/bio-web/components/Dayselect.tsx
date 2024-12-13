import React, { useState } from 'react';

interface DayselectProps {
  onDateChange: (date: number) => void; // 선택된 날짜를 부모 컴포넌트로 전달하는 함수
}

const Dayselect: React.FC<DayselectProps> = ({ onDateChange }) => {
	const today = new Date(); // 현재 날짜 객체 생성
	const [year, setYear] = useState(today.getFullYear()); // 현재 연도
	const [month, setMonth] = useState(today.getMonth() + 1); // 현재 월 (0부터 시작하므로 +1)
	const [day, setDay] = useState(today.getDate()); // 현재 일
	

  const handleConvert = () => {
    const selectedDate = new Date(year, month - 1, day); // 월은 0부터 시작하므로 -1
    const timestamp = selectedDate.getTime();
    onDateChange(timestamp); // 부모 컴포넌트에 타임스탬프 전달
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <div>
          <label htmlFor="year" style={{ display: 'block', marginBottom: '5px' }}>
            Year
          </label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{
              width: '80px',
              padding: '5px',
              textAlign: 'center',
              border: '1px solid #ced4da',
              borderRadius: '5px',
            }}
          />
        </div>
        <div>
          <label htmlFor="month" style={{ display: 'block', marginBottom: '5px' }}>
            Month
          </label>
          <input
            id="month"
            type="number"
            value={month}
            min="1"
            max="12"
            onChange={(e) => setMonth(Number(e.target.value))}
            style={{
              width: '60px',
              padding: '5px',
              textAlign: 'center',
              border: '1px solid #ced4da',
              borderRadius: '5px',
            }}
          />
        </div>
        <div>
          <label htmlFor="day" style={{ display: 'block', marginBottom: '5px' }}>
            Day
          </label>
          <input
            id="day"
            type="number"
            value={day}
            min="1"
            max="31"
            onChange={(e) => setDay(Number(e.target.value))}
            style={{
              width: '60px',
              padding: '5px',
              textAlign: 'center',
              border: '1px solid #ced4da',
              borderRadius: '5px',
            }}
          />
        </div>
        <button
          onClick={handleConvert}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Convert →
        </button>
      </div>
    </div>
  );
};

export default Dayselect;
