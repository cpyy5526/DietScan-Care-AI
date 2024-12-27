'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <a href="#" onClick={handleLogout}>
      로그아웃
    </a>
  );
}
