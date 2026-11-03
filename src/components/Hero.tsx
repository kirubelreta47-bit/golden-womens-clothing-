import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section
      id="hero-section"
      className="relative w-full h-[calc(100svh-64px)] sm:h-[calc(100vh-80px)] min-h-[500px] overflow-hidden bg-gradient-to-r from-[#D5C2B1] via-[#E2D5C8] to-[#EBE2D7] flex items-center"
    >
      {/* Subtle Ambient Background Lighting Overlay */}
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/10 to-black/25 pointer-events-none" />

      {/* 1. MOBILE VIEW (< md): Vertical 70/30 Split directly flush against nav */}
      <div className="md:hidden relative w-full h-full flex flex-col overflow-hidden">
        {/* Top 70%: Fashion Model Photography flush with nav */}
        <div className="h-[70%] w-full relative overflow-hidden flex items-center justify-center bg-[#D5C2B1]">
          <img
            src="/golden-womens-clothing-hero-photo.png"
            alt="Golden Women's Clothing Fashion Model"
            className="w-full h-full object-cover object-[62%_35%] filter brightness-[0.98] contrast-[1.02]"
          />
          {/* Subtle bottom gradient feather blending smoothly into text section */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#E2D5C8] to-transparent pointer-events-none" />
        </div>

        {/* Bottom 30%: Right-Side Typography & Button */}
        <div className="h-[30%] w-full bg-gradient-to-b from-[#E2D5C8] via-[#EAE1D5] to-[#EBE2D7] flex flex-col justify-center items-center text-center px-4 py-2 space-y-1.5 relative z-10">
          <p className="font-script text-[#C69A4A] text-xl sm:text-2xl font-normal drop-shadow-xs">
            Step into Elegance
          </p>

          <h1 className="font-serif text-xl sm:text-2xl text-[#171513] font-semibold tracking-tight leading-tight">
            Discover Timeless <span className="font-serif font-normal">Fashion</span>
          </h1>

          <p className="text-[11px] sm:text-xs text-[#78716C] font-light tracking-wide max-w-xs">
            Trendy. Elegant. Uniquely You.
          </p>

          <div className="pt-1">
            <button
              onClick={onExploreClick}
              className="px-6 py-2 bg-[#C69A4A] hover:bg-[#b58b3e] active:scale-95 text-white text-[11px] sm:text-xs font-medium rounded-full shadow-md transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Shop the Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. TABLET & DESKTOP VIEW (>= md): 60/40 Split Layout flush against nav */}
      <div className="hidden md:flex w-full h-full items-center relative z-10">
        {/* Left 60%: Fashion Model Photography edge-to-edge flush with nav */}
        <div className="w-[60%] h-full relative overflow-hidden flex items-center justify-center">
          <img
            src="/golden-womens-clothing-hero-photo.png"
            alt="Golden Women's Clothing Fashion Model"
            className="w-full h-full object-cover object-[60%_35%] lg:object-[62%_32%] filter brightness-[0.98] contrast-[1.02]"
          />
          {/* Soft Gradient Mask blending seamlessly into right text area */}
          <div className="absolute inset-y-0 right-0 w-36 lg:w-56 bg-gradient-to-r from-transparent via-[#E2D5C8]/80 to-[#EBE2D7] pointer-events-none" />
        </div>

        {/* Right 40%: Editorial Typography Composition */}
        <div className="w-[40%] h-full flex flex-col justify-center px-6 lg:px-12 xl:px-16 py-8 space-y-4 lg:space-y-6 text-left">
          {/* Delicate Script Heading */}
          <p className="font-script text-[#C69A4A] text-4xl lg:text-5xl xl:text-6xl font-normal tracking-wide drop-shadow-xs">
            Step into Elegance
          </p>

          {/* Large Editorial Serif Heading */}
          <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white drop-shadow-sm font-semibold tracking-tight leading-[1.12]">
            Discover Timeless <br />
            <span className="font-serif text-white font-normal">Fashion</span>
          </h1>

          {/* Modern Clean Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-stone-100 font-light tracking-wide max-w-md">
            Trendy. Elegant. Uniquely You.
          </p>

          {/* Primary Champagne Gold Button */}
          <div className="pt-2 sm:pt-4">
            <button
              onClick={onExploreClick}
              className="px-8 sm:px-9 py-3.5 sm:py-4 bg-[#C69A4A] hover:bg-[#b58b3e] active:scale-95 text-white text-xs sm:text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Shop the Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
