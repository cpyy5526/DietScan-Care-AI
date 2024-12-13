'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import '@/styles/login.css';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams(); // 쿼리 파라미터 읽기

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'authentication_required') {
      setError('접근하려면 로그인이 필요합니다.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get('id') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        id,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('아이디 또는 비밀번호를 확인해주세요.');
      } else {
        router.push('protected/wando01');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleRegister = () => {
    router.push('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">로그인</h1>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <input type="text" name="id" placeholder="id" required className="login-input" />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" required className="login-input" />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <hr className="login-divider" />
        <button onClick={handleRegister} className="register-button">
          회원가입
        </button>
      </div>
    </div>
  );
}
