import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { GoldenLogo } from './GoldenLogo';
import { STORE_CONTACTS } from '../utils/orderLinks';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  onOpenSizeGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  activeCategory,
  onOpenSizeGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'All Pieces', id: 'all' },
    { label: 'New In', id: 'trending' },
    { label: 'Dresses', id: 'dresses' },
    { label: 'Matching Sets', id: 'coords' },
    { label: 'Outerwear', id: 'outerwear' },
    { label: 'Tops & Blouses', id: 'tops' },
  ];

  const handleNavClick = (id: string) => {
    onSelectCategory(id);
    setMobileMenuOpen(false);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Left: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#1C1917] hover:text-[#C5A880] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo with Official Medallion Emblem */}
            <div
              className="cursor-pointer select-none py-1"
              onClick={() => handleNavClick('all')}
            >
              <GoldenLogo size={34} showText={true} />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 ml-4">
              {navItems.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-[11px] uppercase tracking-widest transition-colors py-1 relative ${
                    activeCategory === item.id
                      ? 'text-[#1C1917] font-semibold'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  {item.label}
                  {activeCategory === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C5A880]" />
                  )}
                </button>
              ))}
              <button
                onClick={onOpenSizeGuide}
                className="text-[11px] uppercase tracking-widest text-[#78716C] hover:text-[#C5A880] transition-colors"
              >
                Size Guide
              </button>
            </nav>
          </div>

          {/* Right: Actions (Concierge & Shopping Bag) */}
          <div className="flex items-center gap-2 sm:gap-3">
            


            {/* Shopping Bag Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#1C1917] text-[#FBF9F5] hover:bg-[#332e2b] transition-all relative shadow-sm cursor-pointer"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880]" />
              <span className="text-[11px] uppercase tracking-wider hidden sm:inline font-medium">
                Bag
              </span>
              <span className="w-4 h-4 rounded-full bg-[#C5A880] text-[#1C1917] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E2D8] bg-[#FBF9F5] px-6 py-5 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-2.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-xs uppercase tracking-widest py-2 border-b border-[#E7E2D8]/60 flex items-center justify-between ${
                  activeCategory === item.id
                    ? 'text-[#1C1917] font-semibold'
                    : 'text-[#78716C]'
                }`}
              >
                <span>{item.label}</span>
                {activeCategory === item.id && (
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                )}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSizeGuide();
              }}
              className="text-left text-xs uppercase tracking-widest py-2 text-[#78716C] border-b border-[#E7E2D8]/60"
            >
              Atelier Size Guide
            </button>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <a
              href={`https://wa.me/${STORE_CONTACTS.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-4 bg-[#F2EFE9] border border-[#C5A880]/50 text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 rounded text-[#1C1917]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              Chat on WhatsApp ({STORE_CONTACTS.phoneDisplay})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
