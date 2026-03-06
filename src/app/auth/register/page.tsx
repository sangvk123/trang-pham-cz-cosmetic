'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';

const texts = {
  title: { vi: 'Tạo tài khoản', cs: 'Vytvořit účet', en: 'Create Account' },
  name: { vi: 'Họ tên', cs: 'Jméno', en: 'Full Name' },
  email: { vi: 'Email', cs: 'E-mail', en: 'Email' },
  password: { vi: 'Mật khẩu', cs: 'Heslo', en: 'Password' },
  confirmPassword: { vi: 'Xác nhận mật khẩu', cs: 'Potvrzení hesla', en: 'Confirm Password' },
  submit: { vi: 'Đăng ký', cs: 'Zaregistrovat', en: 'Register' },
  hasAccount: { vi: 'Đã có tài khoản?', cs: 'Máte účet?', en: 'Already have an account?' },
  login: { vi: 'Đăng nhập', cs: 'Přihlásit se', en: 'Sign In' },
  loading: { vi: 'Đang đăng ký...', cs: 'Registrace...', en: 'Registering...' },
  passwordHint: {
    vi: 'Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và số',
    cs: 'Minimálně 8 znaků, velká písmena, malá písmena a číslo',
    en: 'Min 8 characters with uppercase, lowercase and number',
  },
  mismatch: { vi: 'Mật khẩu không khớp', cs: 'Hesla se neshodují', en: 'Passwords do not match' },
};

export default function RegisterPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(texts.mismatch[locale]);
      return;
    }

    setLoading(true);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password, name: name.trim() }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Registration failed');
      setLoading(false);
      return;
    }

    // Auto-login after successful registration
    const result = await signIn('credentials', {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
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
          <label className="text-sm font-medium text-charcoal mb-1.5 block">{texts.name[locale]}</label>
          <div className="relative">
            <FiUser size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-charcoal mb-1.5 block">{texts.email[locale]} *</label>
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
          <label className="text-sm font-medium text-charcoal mb-1.5 block">{texts.password[locale]} *</label>
          <div className="relative">
            <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
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
          <p className="text-xs text-text-muted mt-1.5">{texts.passwordHint[locale]}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-charcoal mb-1.5 block">{texts.confirmPassword[locale]} *</label>
          <div className="relative">
            <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark"
            />
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

      <p className="text-center text-sm text-text-muted mt-6">
        {texts.hasAccount[locale]}{' '}
        <Link href="/auth/login" className="text-sage-darker font-medium hover:underline">
          {texts.login[locale]}
        </Link>
      </p>
    </div>
  );
}
