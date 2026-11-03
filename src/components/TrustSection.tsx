import React from 'react';
import { Truck, ShieldCheck, Headphones } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-6 sm:py-10 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal 4-Pillar Strip matching reference image */}
        <div className="bg-white border border-[#EAE3D8] rounded-xl shadow-xs py-5 px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[#EAE3D8]">
            
            {/* Pillar 1: Fast Delivery */}
            <div className="flex items-center gap-3.5 px-2 md:px-6 justify-start md:justify-center">
              <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-[#171513] shrink-0" strokeWidth={1.6} />
              <div className="leading-tight">
                <h4 className="font-serif text-xs sm:text-sm font-bold text-[#171513]">
                  Fast Delivery
                </h4>
                <p className="text-[11px] sm:text-xs text-[#78716C] font-light mt-0.5">
                  Across Ethiopia
                </p>
              </div>
            </div>

            {/* Pillar 2: Secure Ordering via WhatsApp */}
            <div className="flex items-center gap-3.5 px-2 md:px-6 justify-start md:justify-center">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#171513] shrink-0" strokeWidth={1.6} />
              <div className="leading-tight">
                <h4 className="font-serif text-xs sm:text-sm font-bold text-[#171513]">
                  Secure Ordering
                </h4>
                <p className="text-[11px] sm:text-xs text-[#78716C] font-light mt-0.5">
                  via WhatsApp
                </p>
              </div>
            </div>

            {/* Pillar 3: Exchange Policy */}
            <div className="flex items-center gap-3.5 px-2 md:px-6 justify-start md:justify-center">
              {/* Clothes Hanger Icon matching reference */}
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#171513] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <path d="M2 17l10-6 10 6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
              </svg>
              <div className="leading-tight">
                <h4 className="font-serif text-xs sm:text-sm font-bold text-[#171513]">
                  Exchange Policy
                </h4>
                <p className="text-[11px] sm:text-xs text-[#78716C] font-light mt-0.5">
                  Within 7 Days
                </p>
              </div>
            </div>

            {/* Pillar 4: Dedicated Support */}
            <div className="flex items-center gap-3.5 px-2 md:px-6 justify-start md:justify-center">
              <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-[#171513] shrink-0" strokeWidth={1.6} />
              <div className="leading-tight">
                <h4 className="font-serif text-xs sm:text-sm font-bold text-[#171513]">
                  Dedicated Support
                </h4>
                <p className="text-[11px] sm:text-xs text-[#78716C] font-light mt-0.5">
                  Always Here
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
