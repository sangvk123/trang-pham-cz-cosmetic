'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import SocialLoginButtons from '@/components/SocialLoginButtons';

const texts = {
  title: { vi: 'Đăng nhập', cs: 'Přihlášení', en: 'Sign In' },
  email: { vi: 'Email', cs: 'E-mail', en: 'Email' },
  password: { vi: 'Mật khẩu', cs: 'Heslo', en: 'Password' },
  submit: { vi: 'Đăng nhập', cs: 'Přihlásit se', en: 'Sign In' },
  noAccount: { vi: 'Chưa có tài khoản?', cs: 'Nemáte účet?', en: "Don't have an account?" },
  register: { vi: 'Đăng ký', cs: 'Registrace', en: 'Register' },
  error: { vi: 'Email hoặc mật khẩu không đúng', cs: 'Neplatný e-mail nebo heslo', en: 'Invalid email or password' },
  loading: { vi: 'Đang đăng nhập...', cs: 'Přihlašování...', en: 'Signing in...' },
};

export default function LoginPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(texts.error[locale]);
    } else {
      router.push('/account');
      router.refresh();
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-charcoal text-center mb-8">{texts.title[locale]}</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-sale-bg text-sale text-sm px-4 py-3 rounded-lg">{error}</div>
        )}

        <div>
          <label className="text-sm font-medium text-charcoal mb-1.5 block">{texts.email[locale]}</label>
          <div className="relative">
            <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-charcoal mb-1.5 block">{texts.password[locale]}</label>
          <div className="relative">
            <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-border rounded-lg py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-charcoal"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-charcoal text-white py-3 rounded-full font-medium text-sm hover:bg-charcoal-light transition-colors disabled:opacity-50"
        >
          {loading ? texts.loading[locale] : texts.submit[locale]}
        </button>
      </form>

      <SocialLoginButtons locale={locale} />

      <p className="text-center text-sm text-text-muted mt-6">
        {texts.noAccount[locale]}{' '}
        <Link href="/auth/register" className="text-sage-darker font-medium hover:underline">
          {texts.register[locale]}
        </Link>
      </p>
    </div>
  );
}
