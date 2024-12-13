'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/register.css';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '회원가입에 실패했습니다.');
      }

      const data = await response.json();
      setSuccess(data.message || '회원가입이 완료되었습니다.');
      setError(null);

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">회원가입</h1>
        {error && <p className="register-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <div>
            <input type="text" name="name" placeholder="Name" required className="register-input" />
          </div>
          <div>
            <input type="email" name="email" placeholder="Email" required className="register-input" />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" required className="register-input" />
          </div>
          <button type="submit" className="register-button">
            회원가입
          </button>
        </form>
        <hr className="register-divider" />
        <button onClick={() => router.push('/login')} className="login-button">
          로그인 화면으로 이동
        </button>
      </div>
    </div>
  );
}
