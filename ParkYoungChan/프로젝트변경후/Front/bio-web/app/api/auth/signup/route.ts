import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { name, id, password } = await req.json(); // email 대신 id를 사용하도록 수정

  // 필수 정보 체크
  if (!name || !id || !password) {
    return NextResponse.json({ message: '필수 정보를 입력해주세요.' }, { status: 400 });
  }

  // 이미 존재하는 사용자 확인
  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (existingUser) {
    return NextResponse.json({ message: '이미 등록된 ID입니다.' }, { status: 400 });
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 사용자 생성
  const user = await prisma.user.create({
    data: {
      key_id: undefined, // Prisma가 cuid()로 자동 생성
      id,
      name,
      password: hashedPassword,
      regi_date: new Date(), // 현재 시간을 등록 날짜로 설정
    },
  });

  return NextResponse.json({ message: '회원가입이 완료되었습니다.', user });
}
