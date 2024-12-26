import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const url = new URL('/login', req.url);

    // 이미 error 쿼리 파라미터가 없을 때만 추가
    if (!url.searchParams.has('error')) {
      url.searchParams.set('error', 'authentication_required');
    }

    return NextResponse.redirect(url);
  }

  // 인증된 경우 요청을 계속 처리
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*', '/api/api_protect/:path*'], // 보호할 경로 설정
};
