import Home from '@/components/Home';

// 디바이스 목록 설정 (순환 탐색 가능)
const devices = ['wando01', 'wando01b', 'wando02'];

export default async function DevicePage({ params }: { params: { device: string } }) {
  const deviceId = params.device;
  const currentIndex = devices.indexOf(deviceId);

  // 순환 탐색을 위해 이전 및 다음 페이지 계산
  const prevPage = `/protected/${devices[(currentIndex - 1 + devices.length) % devices.length]}`;
  const nextPage = `/protected/${devices[(currentIndex + 1) % devices.length]}`;

  return <Home deviceId={deviceId} nextPage={nextPage} prevPage={prevPage} />;
}
