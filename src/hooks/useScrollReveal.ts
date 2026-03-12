'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    // Small delay to ensure DOM is ready after client-side navigation
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        '.scroll-reveal:not(.visible), .scroll-reveal-left:not(.visible), .scroll-reveal-right:not(.visible), .scroll-reveal-scale:not(.visible)'
      );
      elements.forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]); // Re-run on route change
}
