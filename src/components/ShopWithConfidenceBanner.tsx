import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER, createWhatsAppChatUrl } from '../config/whatsapp';

export const ShopWithConfidenceBanner: React.FC = () => {
  const whatsappUrl = createWhatsAppChatUrl(
    "Hello Golden Women's Clothing! I am visiting your store and would like to ask about custom ordering, sizes, or branch availability.",
    WHATSAPP_PHONE_NUMBER
  );

  return (
    <div className="w-full bg-[#171513] text-[#FAF7F2] py-3 sm:py-3.5 border-y border-[#2A2622] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left: Compact Text matching slim separator design */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-left">
          <span className="text-[#C69A4A] text-xs shrink-0">◆</span>
          <div>
            <span className="font-serif text-xs sm:text-sm font-medium text-[#C69A4A] tracking-tight">
              Shop with Confidence
            </span>
            <span className="hidden sm:inline text-stone-500 text-xs mx-2">•</span>
            <span className="hidden sm:inline text-xs text-stone-300 font-light">
              Your style. Our priority.
            </span>
            <p className="sm:hidden text-[10px] text-stone-400 font-light leading-none mt-0.5">
              Your style. Our priority.
            </p>
          </div>
        </div>

        {/* Right: Small, Sleek Champagne Gold WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 sm:px-5 sm:py-2 bg-[#C69A4A] hover:bg-[#b58b3e] active:scale-95 text-white text-[11px] sm:text-xs font-medium rounded-full shadow-xs transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
          <span>Order via WhatsApp</span>
          <ArrowRight className="w-3 h-3" />
        </a>

      </div>
    </div>
  );
};
