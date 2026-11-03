import React from 'react';

interface GoldenLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const GoldenLogo: React.FC<GoldenLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official Medallion Logo SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <radialGradient id="medallionBg" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#1C1917" />
            <stop offset="100%" stopColor="#0B0A09" />
          </radialGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E6CA" />
            <stop offset="25%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#AA7A28" />
            <stop offset="75%" stopColor="#E5C77A" />
            <stop offset="100%" stopColor="#8A631E" />
          </linearGradient>
          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E5AB" />
            <stop offset="50%" stopColor="#C5A880" />
            <stop offset="100%" stopColor="#8C6D3B" />
          </linearGradient>
        </defs>

        {/* Outer Dark Circular Base */}
        <circle cx="100" cy="100" r="96" fill="url(#medallionBg)" stroke="url(#goldGradient)" strokeWidth="3" />
        
        {/* Inner Thin Gold Ring */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#goldRing)" strokeWidth="1.2" opacity="0.85" />

        {/* Silhouette & G Monogram Composite */}
        <g id="artwork">
          {/* Outer sweeping crescent of the G */}
          <path
            d="M 140 50 A 62 62 0 1 0 152 135"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          
          {/* Crossbar of the G */}
          <path
            d="M 115 100 L 150 100 L 150 128"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="4.5"
            strokeLinejoin="miter"
          />

          {/* Couture Woman's Silhouette with Wide-Brim Hat */}
          {/* Hat brim */}
          <path
            d="M 68 66 C 80 50, 115 50, 126 68 C 112 65, 82 66, 68 66 Z"
            fill="url(#goldGradient)"
          />
          {/* Hat crown */}
          <path
            d="M 88 56 C 90 48, 104 48, 108 57 Z"
            fill="url(#goldGradient)"
          />
          {/* Woman's facial profile & neck */}
          <path
            d="M 94 67 C 98 72, 100 78, 97 84 C 95 89, 93 94, 95 99 C 97 104, 101 110, 101 116 C 101 123, 94 135, 90 142 C 86 134, 85 125, 87 116 C 89 108, 91 102, 88 95 C 85 89, 83 80, 89 72 Z"
            fill="url(#goldGradient)"
          />
          {/* Fluid gown back curve */}
          <path
            d="M 97 84 C 105 88, 110 98, 108 108 C 106 118, 102 126, 106 138 C 109 144, 116 148, 118 152 C 105 149, 94 142, 90 135"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Delicate Sparkles on the rings */}
          <circle cx="68" cy="46" r="1.5" fill="#FFF8E7" />
          <path d="M 68 41 L 68 51 M 63 46 L 73 46" stroke="url(#goldGradient)" strokeWidth="0.8" />

          <circle cx="150" cy="132" r="1.5" fill="#FFF8E7" />
          <path d="M 150 127 L 150 137 M 145 132 L 155 132" stroke="url(#goldGradient)" strokeWidth="0.8" />
        </g>

        {/* Micro Medallion Typography */}
        <text
          x="100"
          y="158"
          textAnchor="middle"
          fill="url(#goldGradient)"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="17"
          letterSpacing="4"
          fontWeight="600"
        >
          GOLDEN
        </text>

        <text
          x="100"
          y="172"
          textAnchor="middle"
          fill="url(#goldGradient)"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="7"
          letterSpacing="2.5"
          fontWeight="500"
        >
          — CLOTHING —
        </text>

        <text
          x="100"
          y="183"
          textAnchor="middle"
          fill="#DFCEB8"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="4.5"
          letterSpacing="1"
          fontWeight="400"
          opacity="0.9"
        >
          WEAR GOLDEN, BE CONFIDENT
        </text>
      </svg>

      {/* Side Typography */}
      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.16em] text-[#171513]">
            GOLDEN
          </span>
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.24em] text-[#C69A4A] font-sans font-medium mt-1">
            Wear Golden, Be Confident
          </span>
        </div>
      )}
    </div>
  );
};
