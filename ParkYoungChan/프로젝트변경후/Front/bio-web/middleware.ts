import {getToken} from 'next-auth/jwt';
import {NextResponse} from 'next/server';

export async function middleware(req) {
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  if (!token) {
    // 로그인 페이지로 리다이렉트하면서 쿼리 파라미터로 메시지 전달
    const url = new URL('/login', req.url);
    url.searchParams.set(
        'error', 'authentication_required');  // 에러 메시지 추가
    return NextResponse.redirect(url);
  }

  // 인증된 경우 요청을 계속 처리
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'],  // 보호할 경로 설정
};
