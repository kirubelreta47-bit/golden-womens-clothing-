import React from 'react';
import { Sparkles, Instagram, Send } from 'lucide-react';
import { STORE_CONTACTS } from '../utils/orderLinks';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#171513] text-[#FAF7F2] text-[11px] sm:text-xs py-2 px-4 border-b border-[#2A2622] select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Placeholder spacer for left balance on desktop */}
        <div className="hidden md:flex items-center gap-2 w-32" />

        {/* Center: Gold Diamond + Promotional Message */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-xs tracking-wide">
          {/* Gold Diamond Icon */}
          <span className="text-[#C69A4A] inline-flex items-center text-xs">
            ◆
          </span>
          <span className="font-light text-stone-200">
            Free delivery on orders over 1,500 ETB
          </span>
          <span className="text-stone-500">•</span>
          <span className="font-light text-stone-300">
            Elegant fashion, always
          </span>
        </div>

        {/* Right: Social Media Icons (Instagram, Telegram, TikTok) */}
        <div className="flex items-center gap-3 w-auto md:w-32 justify-end">
          <a
            href={`https://instagram.com/${STORE_CONTACTS.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-300 hover:text-[#C69A4A] transition-colors"
            title="Instagram"
            aria-label="Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>

          <a
            href={`https://t.me/${STORE_CONTACTS.telegramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-300 hover:text-[#C69A4A] transition-colors"
            title="Telegram"
            aria-label="Telegram"
          >
            <Send className="w-3.5 h-3.5" />
          </a>

          {/* TikTok Icon (SVG) */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-300 hover:text-[#C69A4A] transition-colors"
            title="TikTok"
            aria-label="TikTok"
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.11V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.79 4.54v-8.21a8.16 8.16 0 0 0 5.8 2.35v-3.47a4.85 4.85 0 0 1-3.77-4.2z" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
};
