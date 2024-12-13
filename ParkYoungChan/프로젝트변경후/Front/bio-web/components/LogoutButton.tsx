"use client"; // Client Component로 선언

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" }); // 로그아웃 후 로그인 페이지로 리다이렉트
  };

  return (
    <span
      className="logout cursor-pointer text-blue-500 hover:underline"
      onClick={handleLogout}
    >
      로그아웃
    </span>
  );
}
