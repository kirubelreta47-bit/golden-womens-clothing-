import React from 'react';
import { Sparkles, Heart, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { GoldenLogo } from './GoldenLogo';
import { STORE_CONTACTS } from '../utils/orderLinks';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-20 md:py-28 bg-[#FBF9F5] border-b border-[#E7E2D8] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Imagery Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-sm overflow-hidden shadow-2xl border border-[#E7E2D8] bg-[#F2EFE9]">
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80"
                alt="Golden Women's Clothing Atelier"
                className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Overlay Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#1C1917]/90 backdrop-blur-md rounded-xs border border-[#C5A880]/30 text-[#FBF9F5]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  Atelier Philosophy
                </p>
                <p className="font-serif text-lg font-light italic mt-1 leading-snug">
                  "Wear Golden, Be Confident."
                </p>
              </div>
            </div>

            {/* Subtle decorative background watermark */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border border-[#C5A880]/20 pointer-events-none -z-10" />
            <div className="absolute -bottom-6 -right-6 w-44 h-44 rounded-full border border-[#C5A880]/15 pointer-events-none -z-10" />
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2EFE9] rounded-full border border-[#C5A880]/40">
                <GoldenLogo size={18} />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  About Our Brand
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1917] tracking-tight leading-[1.15]">
                Crafted for Elegance, <br />
                <span className="italic font-normal text-[#C5A880]">Rooted in Personal Care.</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#78716C] font-light leading-relaxed">
              Founded in Ethiopia, <strong>Golden Women's Clothing</strong> was created to celebrate modern women with tactile fabrications, fluid bias draping, and timeless tailoring. From private dinners to formal celebrations and curated everyday wardrobes, every piece is designed to inspire poise and effortless confidence.
            </p>

            <p className="text-xs sm:text-sm text-[#78716C] font-light leading-relaxed">
              We operate three physical boutiques across <strong>Addis Ababa (Bole Medhanialem & Kazanchis)</strong> and <strong>Mekelle (Kedamay Weyane)</strong>. To give every customer tailor-level guidance, our website connects seamlessly to WhatsApp, allowing our team to personally check stock in our ERP, verify fit, and arrange pickup or doorstep courier dispatch.
            </p>

            {/* Three Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E7E2D8]">
              <div className="space-y-1.5 p-3.5 bg-[#F2EFE9] rounded-sm border border-[#E7E2D8]">
                <div className="w-7 h-7 rounded-full bg-[#1C1917] text-[#C5A880] flex items-center justify-center mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-serif text-sm font-medium text-[#1C1917]">
                  Mulberry Silks & Wools
                </h4>
                <p className="text-[11px] text-[#78716C] font-light leading-snug">
                  Fine natural momme silks, double-faced cashmeres, and breathable linens.
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 bg-[#F2EFE9] rounded-sm border border-[#E7E2D8]">
                <div className="w-7 h-7 rounded-full bg-[#1C1917] text-[#C5A880] flex items-center justify-center mb-2">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-serif text-sm font-medium text-[#1C1917]">
                  Flattering Silhouettes
                </h4>
                <p className="text-[11px] text-[#78716C] font-light leading-snug">
                  Precision bias cuts and tailored waist sculpting made to turn heads.
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 bg-[#F2EFE9] rounded-sm border border-[#E7E2D8]">
                <div className="w-7 h-7 rounded-full bg-[#1C1917] text-[#C5A880] flex items-center justify-center mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-serif text-sm font-medium text-[#1C1917]">
                  Physical Boutique Trust
                </h4>
                <p className="text-[11px] text-[#78716C] font-light leading-snug">
                  Three physical branches in Addis Ababa & Mekelle with walk-in fittings.
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#catalog-section"
                className="w-full sm:w-auto px-6 py-3 bg-[#1C1917] hover:bg-[#332e2b] text-[#FBF9F5] text-xs uppercase tracking-widest font-medium rounded transition-all text-center flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
              >
                <span>Browse The Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`https://wa.me/${STORE_CONTACTS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#F2EFE9] hover:bg-[#EAE4D9] text-[#1C1917] border border-[#C5A880]/50 text-xs uppercase tracking-widest font-medium rounded transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chat with Our Stylist</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

