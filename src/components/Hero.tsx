import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-[#FBF9F5] via-[#F6F2EA] to-[#FBF9F5] border-b border-[#E7E2D8]">
      
      {/* Mobile Full-Bleed Luxury Background (Pure Editorial Image + Soft Scrim) */}
      <div className="absolute inset-0 md:hidden z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85"
          alt="Golden Atelier"
          className="w-full h-full object-cover object-top filter brightness-[0.55] contrast-[1.05]"
        />
        {/* Elegant gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/70 to-[#1C1917]/40" />
      </div>

      {/* Desktop subtle background watermark rings */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-[#C5A880]/15 pointer-events-none z-0" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#C5A880]/10 pointer-events-none z-0" />

      {/* Content Container - fits to screen */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Editorial Narrative */}
          <div className="md:col-span-7 space-y-4 sm:space-y-5 text-center md:text-left">
            
            {/* Minimalist Season Tag */}
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              New Collection 2026 • Addis Ababa
            </p>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#FBF9F5] md:text-[#1C1917] leading-[1.14]">
              Dresses & Sets <br />
              <span className="italic font-normal text-[#C5A880]">Tailored to Turn Heads.</span>
            </h1>

            {/* Clean, authentic body copy */}
            <p className="text-xs sm:text-sm md:text-base text-stone-200 md:text-stone-600 max-w-sm md:max-w-lg mx-auto md:mx-0 font-normal leading-relaxed">
              Silk dresses & matching sets. Direct WhatsApp & Telegram delivery in Addis Ababa.
            </p>

            {/* Single Clean Primary Action */}
            <div className="pt-2 sm:pt-4 flex justify-center md:justify-start">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A880] text-[#1C1917] hover:bg-[#b5966d] md:bg-[#1C1917] md:text-[#FBF9F5] md:hover:bg-[#332e2b] transition-all text-xs uppercase tracking-[0.2em] font-medium shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop the Collection</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#1C1917] md:text-[#C5A880] group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Desktop Pure Editorial Photography (No ad badges/overlays) */}
          <div className="hidden md:flex md:col-span-5 justify-center">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-[#E7E2D8] bg-[#F2EFE9]">
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85"
                  alt="Golden Women's Clothing Store Lookbook"
                  className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
