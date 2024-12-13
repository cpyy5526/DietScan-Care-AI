import prisma from '@/lib/prisma';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: {label: 'ID', type: 'text', placeholder: 'Enter your ID'},
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.id || !credentials?.password) {
          throw new Error('Both ID and Password are required');
        }

        const user = await prisma.user.findUnique({
          where: {id: credentials.id},
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const isValidPassword =
            await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        // Prisma의 name 필드가 null일 경우 undefined로 변환
        return {
          key_id: user.key_id,
          id: user.id,
          name: user.name ?? undefined,  // null -> undefined 변환
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.key_id = user.key_id;
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({session, token}) {
      session.user = {
        key_id: token.key_id as string,
        id: token.id as string,
        name: token.name as string | undefined,
      };
      return session;
    },
  },
};
