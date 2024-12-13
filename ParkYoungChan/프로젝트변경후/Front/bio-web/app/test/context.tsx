'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

// 컨텍스트 값의 타입 정의
interface BackgroundContextType {
  isBackgroundActive: boolean;
  setIsBackgroundActive: (active: boolean) => void;
}

// 컨텍스트 초기값을 명시적으로 설정
const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

// Provider의 Props 타입 정의
interface BackgroundProviderProps {
  children: ReactNode;
}

export default function BackgroundProvider({ children }: BackgroundProviderProps) {
  const [isBackgroundActive, setIsBackgroundActive] = useState(false);

  return <BackgroundContext.Provider value={{ isBackgroundActive, setIsBackgroundActive }}>{children}</BackgroundContext.Provider>;
}

// 컨텍스트를 사용하기 위한 커스텀 훅
export function useBackgroundContext() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackgroundContext must be used within a BackgroundProvider');
  }
  return context;
}
