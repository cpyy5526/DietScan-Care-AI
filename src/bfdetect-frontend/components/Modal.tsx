'use client';

import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void; // 닫기 이벤트 핸들러
  deviceId: string; // 센서 ID
}

export default function Modal({ isOpen, onClose, deviceId }: ModalProps) {
  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={contentStyle}>
          <img src="/danger.png" alt="위험 경고" style={imageStyle} />
          <h2 style={textStyle}>바이오파울링 위험 메시지</h2>
        </div>
        <div style={messageStyle}>
          <p>{`${deviceId} 센서에서 바이오파울링이 예상됩니다!`}</p>
        </div>
        <div style={buttonContainerStyle}>
          <button onClick={onClose} style={buttonStyle}>
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body // React Portal을 사용하여 body에 렌더링
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  width: '400px',
  height: '150px',
  border: '1px solid #ddd',
  position: 'relative',
};

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center', // 상하 중앙 정렬
  justifyContent: 'flex-start', // 왼쪽 정렬
  gap: '15px', // 이미지와 텍스트 사이 간격
  marginBottom: '15px',
};

const textStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'left', // 텍스트를 왼쪽 정렬
  margin: 0,
};

const imageStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
};

const messageStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#555',
  textAlign: 'center',
  marginBottom: '20px',
};

const buttonContainerStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#ddd',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
};
