'use client';

export default function Logo({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: { w: 120, h: 40 },
    default: { w: 180, h: 56 },
    large: { w: 240, h: 72 },
  };
  const { w, h } = sizes[size];

  return (
    <svg width={w} height={h} viewBox="0 0 240 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Leaf icon */}
      <g transform="translate(8, 12)">
        <path
          d="M24 4C24 4 8 12 4 28C0 44 12 48 24 44C36 48 48 44 44 28C40 12 24 4 24 4Z"
          fill="#2d9f7f"
          opacity="0.9"
        />
        <path
          d="M24 4C24 4 20 20 24 44"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M24 16C28 18 32 22 34 28"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M24 24C20 26 16 30 14 34"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
      {/* Text */}
      <text x="62" y="30" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="#2d9f7f">
        Trang Pham Cz
      </text>
      <text x="62" y="50" fontFamily="Georgia, serif" fontSize="12" fontWeight="400" fill="#6b7280" letterSpacing="3">
        COSMETIC
      </text>
      <line x1="62" y1="55" x2="180" y2="55" stroke="#2d9f7f" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}
