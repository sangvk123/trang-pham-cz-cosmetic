'use client';

import { FiFacebook, FiShare2, FiCopy } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { useToast } from '@/lib/ToastContext';
import { t } from '@/lib/i18n';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const { locale } = useLocale();
  const { showToast } = useToast();

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, '_blank', 'width=600,height=400');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      showToast(locale === 'vi' ? 'Đã sao chép link' : locale === 'cs' ? 'Odkaz zkopírován' : 'Link copied', 'success');
    } catch {
      // fallback
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: fullUrl });
      } catch {
        // user cancelled
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-muted font-medium">{t('share', locale)}:</span>
      <button
        onClick={shareToFacebook}
        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-sage-lightest transition-colors"
        aria-label="Share to Facebook"
      >
        <FiFacebook size={14} />
      </button>
      <button
        onClick={copyLink}
        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-sage-lightest transition-colors"
        aria-label="Copy link"
      >
        <FiCopy size={14} />
      </button>
      <button
        onClick={nativeShare}
        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-sage-lightest transition-colors"
        aria-label="Share"
      >
        <FiShare2 size={14} />
      </button>
    </div>
  );
}
