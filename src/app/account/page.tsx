'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiUser, FiMail, FiLogOut, FiShoppingBag } from 'react-icons/fi';
import Link from 'next/link';
import { useLocale } from '@/lib/LocaleContext';

const texts = {
  title: { vi: 'Tài khoản', cs: 'Můj účet', en: 'My Account' },
  welcome: { vi: 'Xin chào', cs: 'Vítejte', en: 'Welcome' },
  email: { vi: 'Email', cs: 'E-mail', en: 'Email' },
  name: { vi: 'Họ tên', cs: 'Jméno', en: 'Name' },
  logout: { vi: 'Đăng xuất', cs: 'Odhlásit se', en: 'Sign Out' },
  viewCart: { vi: 'Xem giỏ hàng', cs: 'Zobrazit košík', en: 'View Cart' },
  notLoggedIn: { vi: 'Bạn chưa đăng nhập', cs: 'Nejste přihlášeni', en: 'You are not signed in' },
  login: { vi: 'Đăng nhập', cs: 'Přihlásit se', en: 'Sign In' },
  loading: { vi: 'Đang tải...', cs: 'Načítání...', en: 'Loading...' },
  memberSince: { vi: 'Thành viên', cs: 'Člen od', en: 'Member' },
};

export default function AccountPage() {
  const { locale } = useLocale();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center text-text-muted">
        {texts.loading[locale]}
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-text-muted mb-4">{texts.notLoggedIn[locale]}</p>
        <Link href="/auth/login" className="text-sage-darker font-medium hover:underline">
          {texts.login[locale]}
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-charcoal mb-8">{texts.title[locale]}</h1>

      <div className="bg-sage-lightest rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-sage flex items-center justify-center text-white text-xl font-bold">
            {(session.user.name || session.user.email || '?').charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-charcoal text-lg">
              {texts.welcome[locale]}, {session.user.name || session.user.email?.split('@')[0]}
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex items-center gap-3 text-sm">
            <FiUser size={16} className="text-sage-dark" />
            <span className="text-text-muted w-16">{texts.name[locale]}</span>
            <span className="text-charcoal font-medium">{session.user.name || '-'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FiMail size={16} className="text-sage-dark" />
            <span className="text-text-muted w-16">{texts.email[locale]}</span>
            <span className="text-charcoal font-medium">{session.user.email}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/cart"
          className="flex items-center justify-center gap-2 bg-charcoal text-white py-3 rounded-full font-medium text-sm hover:bg-charcoal-light transition-colors"
        >
          <FiShoppingBag size={16} />
          {texts.viewCart[locale]}
        </Link>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center justify-center gap-2 border border-border py-3 rounded-full font-medium text-sm text-text-secondary hover:bg-sage-lightest transition-colors disabled:opacity-50"
        >
          <FiLogOut size={16} />
          {texts.logout[locale]}
        </button>
      </div>
    </div>
  );
}
