import React from 'react';
import { Building2, Store, MapPin } from 'lucide-react';
import { STORE_BRANCHES, createWhatsAppChatUrl } from '../config/whatsapp';

export const LocationsSection: React.FC = () => {
  const branches = [
    {
      ...STORE_BRANCHES[0],
      icon: Building2,
      subtitle: 'Bole, Addis Ababa',
    },
    {
      ...STORE_BRANCHES[1],
      icon: Store,
      subtitle: 'Kazanchis, Addis Ababa',
    },
    {
      ...STORE_BRANCHES[2],
      icon: MapPin,
      subtitle: 'Kedamay Weyane, Mekelle',
    },
  ];

  return (
    <section id="locations-section" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#EAE3D8] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Centered Section Header */}
        <div className="text-center space-y-2 mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C69A4A] font-semibold">
            <span className="w-8 sm:w-12 h-[1px] bg-[#C69A4A]" />
            <span>Our Boutiques</span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#C69A4A]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#171513] tracking-tight">
            Physical Branches
          </h2>
        </div>

        {/* Minimalist Icon Style Locations: Icon at top, Name of place at bottom */}
        <div className="flex items-center justify-center gap-8 sm:gap-14 lg:gap-24 flex-wrap">
          {branches.map((branch) => {
            const BranchIcon = branch.icon;
            const chatUrl = createWhatsAppChatUrl(
              `Hello Golden Women's Clothing! I would like to inquire about your ${branch.name} location.`
            );

            return (
              <a
                key={branch.id}
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3.5 cursor-pointer text-center"
                title={`Chat with ${branch.name} on WhatsApp`}
              >
                {/* Circular Icon Container */}
                <div className="w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-full bg-[#F5EFE9] border-2 border-[#EAE3D8] group-hover:border-[#C69A4A] group-hover:bg-white flex items-center justify-center text-[#171513] group-hover:text-[#C69A4A] transition-all duration-300 shadow-xs group-hover:shadow-md group-hover:scale-108 relative">
                  <BranchIcon className="w-9 h-9 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                  
                  {/* Subtle WhatsApp indicator dot on hover */}
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Name of the place at the bottom */}
                <div className="space-y-0.5">
                  <h3 className="font-serif text-sm sm:text-base md:text-lg font-medium text-[#171513] group-hover:text-[#C69A4A] transition-colors">
                    {branch.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#78716C] font-light">
                    {branch.subtitle}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
