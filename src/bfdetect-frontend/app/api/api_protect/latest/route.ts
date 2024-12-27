// app/api/latest/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sensor_id = searchParams.get('sensor_id'); // 쿼리 매개변수에서 sensor_id 가져오기

  if (!sensor_id) {
    return NextResponse.json({ error: 'Missing sensor_id' }, { status: 400 });
  }

  const baseUrl = process.env.API_URL; // 외부 API 주소
  const url = `${baseUrl}/results/latest/${sensor_id}`;

  try {
    const response = await fetch(url); // 외부 API 호출
    const data = await response.json(); // 결과 파싱

    return NextResponse.json(data); // JSON 응답
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data', details: error.message }, { status: 500 });
  }
}
