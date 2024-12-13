import {withAuth} from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',  // 인증되지 않은 사용자가 이동할 페이지
  },
});

// 보호할 경로 설정
export const config = {
  matcher: ['/wando01', '/wando02', '/wando01b'],  // 보호할 경로를 지정
};