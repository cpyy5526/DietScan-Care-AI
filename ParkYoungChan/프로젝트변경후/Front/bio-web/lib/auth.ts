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
          placeholder: 'Enter your password'
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

        return {
          key_id: user.key_id,  // Adjust the casing to match your schema
          id: user.id,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',  // Redirect to login on error
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
