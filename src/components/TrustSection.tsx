import React from 'react';
import { MessageSquareText, Truck, Sparkles, Shield, Clock } from 'lucide-react';
import { STORE_CONTACTS } from '../utils/orderLinks';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: MessageSquareText,
      title: 'Bespoke Sizing Assistance via Chat',
      desc: 'Connect in real time with our Addis Ababa atelier stylist on WhatsApp or Telegram to verify your exact bust, waist, and length measurements before dispatch.',
      linkText: 'Chat with Stylist',
      linkUrl: `https://wa.me/${STORE_CONTACTS.whatsappNumber}`,
    },
    {
      icon: Truck,
      title: 'Same-Day Courier Delivery',
      desc: 'Express door-to-door courier service across Addis Ababa with tissue-wrapped luxury gift packaging. Worldwide DHL express dispatch also available upon request.',
      linkText: 'Courier Details',
      linkUrl: `https://t.me/${STORE_CONTACTS.telegramHandle}`,
    },
    {
      icon: Sparkles,
      title: 'Limited Edition Releases',
      desc: 'Produced in small exclusive runs per silhouette. Crafted from fine Mulberry silk, Belgian linen, and quality textiles made to last.',
      linkText: 'Explore Collection',
      linkUrl: '#catalog-section',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F2EFE9] border-y border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
            Atelier Service
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1C1917]">
            Personal Boutique Service & Delivery
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
            Order directly on WhatsApp or Telegram. Get friendly sizing advice and fast courier delivery to your door across Addis Ababa.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#FBF9F5] p-8 rounded-sm border border-[#E7E2D8] hover:border-[#C5A880]/60 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#F2EFE9] border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg text-[#1C1917] font-medium leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7E2D8]/70">
                  <a
                    href={pillar.linkUrl}
                    target={pillar.linkUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-wider text-[#C5A880] hover:text-[#9E7F55] font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>{pillar.linkText}</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle Bottom Guarantee Banner */}
        <div className="mt-12 bg-[#FBF9F5]/70 rounded border border-[#E7E2D8] p-4 flex flex-col sm:flex-row items-center justify-around gap-4 text-xs text-[#78716C] text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C5A880]" />
            <span>48-Hour Fitting & Size Exchange Guarantee</span>
          </div>
          <div className="hidden sm:block text-[#E7E2D8]">•</div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C5A880]" />
            <span>Instant Chat Response from 9:00 AM – 8:30 PM</span>
          </div>
        </div>

      </div>
    </section>
  );
};
