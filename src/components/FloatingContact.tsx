'use client';

import { useState } from 'react';
import { FiMessageCircle, FiX, FiPhone } from 'react-icons/fi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

const contacts = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/trangptt.2011',
    icon: FaFacebook,
    bg: 'bg-[#1877F2]',
    hoverBg: 'hover:bg-[#166FE5]',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: FaInstagram,
    bg: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    hoverBg: 'hover:opacity-90',
  },
  {
    name: 'Zalo',
    href: 'https://zalo.me/0607715020',
    icon: SiZalo,
    bg: 'bg-[#0068FF]',
    hoverBg: 'hover:bg-[#0055D4]',
  },
  {
    name: 'Phone',
    href: 'tel:+420607715020',
    icon: FiPhone,
    bg: 'bg-[#25D366]',
    hoverBg: 'hover:bg-[#20BD5A]',
  },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Contact buttons */}
      <div className={`flex flex-col gap-3 transition-all duration-400 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(.3, 1, .3, 1)' }}
      >
        {contacts.map((c, i) => (
          <a
            key={c.name}
            href={c.href}
            target={c.name === 'Phone' ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className={`group relative w-12 h-12 ${c.bg} ${c.hoverBg} rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110`}
            title={c.name}
            style={{
              transitionDelay: open ? `${i * 50}ms` : '0ms',
              transitionTimingFunction: 'cubic-bezier(.3, 1, .3, 1)',
            }}
          >
            <c.icon size={22} />
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-charcoal text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
              {c.name}
            </span>
          </a>
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-400 hover:scale-105 ${
          open ? 'bg-charcoal rotate-0' : 'bg-sage-darker float-bounce'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(.3, 1, .3, 1)' }}
      >
        {!open && <span className="absolute inset-0 rounded-full bg-sage-darker pulse-ring" />}
        {open ? <FiX size={22} /> : <FiMessageCircle size={24} />}
      </button>
    </div>
  );
}
