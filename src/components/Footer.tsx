import React, { useState } from 'react';
import { MessageCircle, Send, Instagram, Mail, MapPin, Clock, ArrowRight, Check } from 'lucide-react';
import { GoldenLogo } from './GoldenLogo';
import { STORE_CONTACTS } from '../utils/orderLinks';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#FBF9F5] border-t border-[#C5A880]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#2E2A27]">
          
          {/* Brand & Editorial Ethos */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <GoldenLogo size={46} />
              <div>
                <span className="block font-serif text-2xl tracking-[0.25em] font-light text-[#FBF9F5]">
                  GOLDEN
                </span>
                <span className="block text-[8px] uppercase tracking-[0.3em] text-[#C5A880] font-sans font-medium mt-0.5">
                  Wear Golden, Be Confident
                </span>
              </div>
            </div>
            
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              An intimate fashion salon dedicated to tactile fabrications, fluid bias cuts, and effortless modern silhouettes. Direct chat ordering preserves personal tailor consultations with every single acquisition.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${STORE_CONTACTS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#292524] hover:bg-[#25D366] text-[#C5A880] hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`https://t.me/${STORE_CONTACTS.telegramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#292524] hover:bg-[#229ED9] text-[#C5A880] hover:text-white flex items-center justify-center transition-colors"
                title="Telegram Concierge"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href={`https://instagram.com/${STORE_CONTACTS.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#292524] hover:bg-pink-600 text-[#C5A880] hover:text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Direct Concierge & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              Atelier & Concierge
            </h4>
            <div className="space-y-2 text-xs text-stone-400 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{STORE_CONTACTS.atelierLocation}</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{STORE_CONTACTS.hours}</span>
              </p>
              <p className="flex items-center gap-2 pt-1 font-mono text-[#FBF9F5]">
                <MessageCircle className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{STORE_CONTACTS.phoneDisplay}</span>
              </p>
            </div>
          </div>

          {/* Quick Curations */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              Curations
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Silk Gowns & Slips</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Cashmere Outerwear</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Micro-Plissé Co-ords</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Belgian Linen Suiting</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">New Season Drops</a></li>
            </ul>
          </div>

          {/* VIP Drop Notifications */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              Private Atelier Register
            </h4>
            <p className="text-xs text-stone-400 font-light">
              Receive discreet notifications 2 hours prior to limited-batch drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-[#292524] border border-[#3E3834] focus:border-[#C5A880] px-3.5 py-2.5 rounded text-xs text-white placeholder-stone-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#C5A880] hover:bg-[#b0936b] text-[#1C1917] rounded text-xs transition-colors flex items-center justify-center"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#C5A880] italic">
                  Thank you. You have been placed on the priority atelier list.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Golden Women's Clothing Store. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Addis Ababa, Ethiopia</span>
            <span>•</span>
            <span>Handcrafted In Small Batches</span>
            <span>•</span>
            <span>Direct Concierge Commerce</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
