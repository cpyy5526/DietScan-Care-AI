import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    key_id: string; // Add custom key_id
    id: string; // Add user ID
    name?: string; // Optional name field
  }

  interface Session {
    user: {
      key_id: string;
      id: string;
      name?: string;
    };
  }

  interface JWT {
    key_id: string;
    id: string;
    name?: string;
  }
}
