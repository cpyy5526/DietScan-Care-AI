import { redirect } from 'next/navigation';

export default function MainPage() {
  redirect('protected/wando01'); // 기본 페이지로 wando01 설정
}
