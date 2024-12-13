import Home from '@/components/Home';

// 디바이스 목록 설정 (순환 탐색 가능)
const devices = ['wando01', 'wando01b', 'wando02'];

interface DevicePageProps {
  params: Promise<{ device: string }>;
}

export default async function DevicePage({ params }: DevicePageProps): Promise<JSX.Element> {
  const { device } = await params; // params를 비동기로 접근
  const deviceId = device;

  const currentIndex = devices.indexOf(deviceId);

  if (currentIndex === -1) {
    return <div>Invalid device ID</div>;
  }

  const prevPage = `/protected/${devices[(currentIndex - 1 + devices.length) % devices.length]}`;
  const nextPage = `/protected/${devices[(currentIndex + 1) % devices.length]}`;

  return <Home deviceId={deviceId} nextPage={nextPage} prevPage={prevPage} />;
}

export async function generateStaticParams() {
  const devices = ['wando01', 'wando01b', 'wando02'];

  return devices.map((device) => ({
    device,
  }));
}
