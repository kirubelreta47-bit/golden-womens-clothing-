import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Send } from 'lucide-react';
import { Currency } from '../types/store';
import { STORE_CONTACTS } from '../utils/orderLinks';

interface AnnouncementBarProps {
  currency: Currency;
  onCurrencyToggle: (curr: Currency) => void;
}

const ANNOUNCEMENTS = [
  'Curated Drops • Direct WhatsApp & Telegram Concierge',
  'Addis Ababa Atelier • Doorstep Courier on Orders > 15,000 ETB',
  'Master Tailor Fitting Consultation via Direct Chat',
  'Limited Atelier Drops • Organic Mulberry Silks & Cashmere',
];

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  currency,
  onCurrencyToggle,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#1C1917] text-[#FBF9F5] text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest px-3 sm:px-4 py-2 border-b border-[#C5A880]/30 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Atelier contact hint (desktop only) */}
        <div className="hidden lg:flex items-center gap-3 text-[#C5A880] text-[10px] shrink-0">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            ATELIER OPEN
          </span>
          <span className="text-[#78716C]">|</span>
          <a
            href={`https://wa.me/${STORE_CONTACTS.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 font-mono tracking-normal"
          >
            <MessageCircle className="w-3 h-3 text-[#C5A880]" />
            {STORE_CONTACTS.phoneDisplay}
          </a>
        </div>

        {/* Center: Marquee / Rotating announcement with whitespace-nowrap */}
        <div className="min-w-0 flex-1 overflow-hidden text-center">
          <div className="flex items-center justify-center gap-1.5 whitespace-nowrap overflow-hidden">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C5A880] shrink-0" />
            <span
              key={index}
              className="truncate text-stone-200 transition-opacity duration-300 font-normal tracking-wide"
            >
              {ANNOUNCEMENTS[index]}
            </span>
          </div>
        </div>

        {/* Right: Currency Toggle & Telegram Link with shrink-0 */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={`https://t.me/${STORE_CONTACTS.telegramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 text-[#C5A880] hover:text-white transition-colors text-[10px]"
            title="Chat on Telegram"
          >
            <Send className="w-2.5 h-2.5" />
            <span>@{STORE_CONTACTS.telegramHandle}</span>
          </a>

          <div className="flex items-center bg-[#292524] rounded border border-[#C5A880]/40 p-0.5 text-[9px] sm:text-[10px] shrink-0">
            <button
              onClick={() => onCurrencyToggle('ETB')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                currency === 'ETB'
                  ? 'bg-[#C5A880] text-[#1C1917] font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              ETB
            </button>
            <button
              onClick={() => onCurrencyToggle('USD')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#C5A880] text-[#1C1917] font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              USD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
