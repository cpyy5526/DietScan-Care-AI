import prisma from '@/lib/prisma';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import NextAuth, {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {email: credentials.email},
        });

        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const isValidPassword =
            await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        return {id: user.id, email: user.email, name: user.name};
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',  // 오류 시 로그인 페이지로 이동
  },
  session: {
    strategy: 'jwt',  // 정확히 설정
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
