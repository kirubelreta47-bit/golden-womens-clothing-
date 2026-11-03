import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { GoldenLogo } from './GoldenLogo';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  activeCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (sectionId: string, navKey: string) => {
    setActiveNav(navKey);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (cat: string) => {
    onSelectCategory(cat);
    setActiveNav('shop');
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const shopCategories = [
    { label: 'All Pieces', id: 'all' },
    { label: 'Dresses', id: 'dresses' },
    { label: 'Tops & Blouses', id: 'tops' },
    { label: 'Co-ords & Sets', id: 'coords' },
    { label: 'Outerwear', id: 'outerwear' },
    { label: 'Trending on IG', id: 'trending' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE3D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">

          {/* Left: Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#171513] hover:text-[#C69A4A] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              className="cursor-pointer select-none py-1"
              onClick={() => handleNavClick('hero-section', 'home')}
            >
              <GoldenLogo size={38} showText={true} />
            </div>
          </div>

          {/* Center: Main Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* Home */}
            <button
              onClick={() => handleNavClick('hero-section', 'home')}
              className={`text-xs uppercase tracking-wider font-medium transition-colors py-1 relative cursor-pointer ${activeNav === 'home'
                  ? 'text-[#171513] font-semibold'
                  : 'text-[#78716C] hover:text-[#171513]'
                }`}
            >
              Home
              {activeNav === 'home' && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C69A4A] rounded-full" />
              )}
            </button>

            {/* Shop with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                onMouseEnter={() => setShopDropdownOpen(true)}
                className={`text-xs uppercase tracking-wider font-medium transition-colors py-1 relative cursor-pointer flex items-center gap-1 ${activeNav === 'shop'
                    ? 'text-[#171513] font-semibold'
                    : 'text-[#78716C] hover:text-[#171513]'
                  }`}
              >
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5" />
                {activeNav === 'shop' && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C69A4A] rounded-full" />
                )}
              </button>

              {/* Dropdown Menu */}
              {shopDropdownOpen && (
                <div
                  onMouseLeave={() => setShopDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#EAE3D8] rounded-sm shadow-xl py-2 z-50 animate-fadeIn"
                >
                  {shopCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`w-full text-left px-4 py-2 text-xs uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer ${activeCategory === cat.id
                          ? 'bg-[#F5EFE9] text-[#171513] font-semibold'
                          : 'text-[#78716C] hover:bg-[#FAF7F2] hover:text-[#171513]'
                        }`}
                    >
                      <span>{cat.label}</span>
                      {activeCategory === cat.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C69A4A]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* New Arrivals */}
            <button
              onClick={() => {
                onSelectCategory('trending');
                handleNavClick('catalog-section', 'new-arrivals');
              }}
              className={`text-xs uppercase tracking-wider font-medium transition-colors py-1 relative cursor-pointer ${activeNav === 'new-arrivals'
                  ? 'text-[#171513] font-semibold'
                  : 'text-[#78716C] hover:text-[#171513]'
                }`}
            >
              New Arrivals
              {activeNav === 'new-arrivals' && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C69A4A] rounded-full" />
              )}
            </button>

            {/* About */}
            <button
              onClick={() => handleNavClick('footer-section', 'about')}
              className={`text-xs uppercase tracking-wider font-medium transition-colors py-1 relative cursor-pointer ${activeNav === 'about'
                  ? 'text-[#171513] font-semibold'
                  : 'text-[#78716C] hover:text-[#171513]'
                }`}
            >
              About
              {activeNav === 'about' && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C69A4A] rounded-full" />
              )}
            </button>

            {/* Branches */}
            <button
              onClick={() => handleNavClick('locations-section', 'branches')}
              className={`text-xs uppercase tracking-wider font-medium transition-colors py-1 relative cursor-pointer ${activeNav === 'branches'
                  ? 'text-[#171513] font-semibold'
                  : 'text-[#78716C] hover:text-[#171513]'
                }`}
            >
              Branches
              {activeNav === 'branches' && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C69A4A] rounded-full" />
              )}
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick('footer-section', 'contact')}
              className={`text-xs uppercase tracking-wider font-medium transition-colors py-1 relative cursor-pointer ${activeNav === 'contact'
                  ? 'text-[#171513] font-semibold'
                  : 'text-[#78716C] hover:text-[#171513]'
                }`}
            >
              Contact
              {activeNav === 'contact' && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C69A4A] rounded-full" />
              )}
            </button>
          </nav>

          {/* Right: Search, Wishlist & Shopping Bag */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Search Input matching reference */}
            <div className="relative hidden md:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search dresses..."
                className="w-48 lg:w-56 pl-8 pr-4 py-1.5 bg-[#F5EFE9] border border-[#EAE3D8] focus:border-[#C69A4A] rounded-full text-xs text-[#171513] placeholder-stone-400 focus:outline-none transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#171513] hover:text-[#C69A4A] transition-colors relative cursor-pointer"
              aria-label="Open Wishlist"
              title="Saved Pieces"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#171513] text-[#FAF7F2] text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon with Red/Gold Badge matching reference */}
            <button
              onClick={onOpenCart}
              className="p-2 text-[#171513] hover:text-[#C69A4A] transition-colors relative cursor-pointer"
              aria-label="Open shopping bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#E03A3A] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE3D8] bg-[#FAF7F2] px-6 py-5 space-y-4 animate-fadeIn">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search dresses..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#EAE3D8] focus:border-[#C69A4A] rounded-full text-xs text-[#171513] placeholder-stone-400 focus:outline-none"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-col space-y-2.5 pt-2">
            <button
              onClick={() => handleNavClick('hero-section', 'home')}
              className="text-left text-xs uppercase tracking-wider py-2 border-b border-[#EAE3D8]/60 font-semibold text-[#171513]"
            >
              Home
            </button>

            <button
              onClick={() => handleCategorySelect('dresses')}
              className="text-left text-xs uppercase tracking-wider py-2 border-b border-[#EAE3D8]/60 text-[#78716C] hover:text-[#171513] flex items-center justify-between"
            >
              <span>Shop All Dresses</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C69A4A]" />
            </button>

            <button
              onClick={() => {
                onSelectCategory('trending');
                handleNavClick('catalog-section', 'new-arrivals');
              }}
              className="text-left text-xs uppercase tracking-wider py-2 border-b border-[#EAE3D8]/60 text-[#78716C] hover:text-[#171513]"
            >
              New Arrivals
            </button>

            <button
              onClick={() => handleNavClick('footer-section', 'about')}
              className="text-left text-xs uppercase tracking-wider py-2 border-b border-[#EAE3D8]/60 text-[#78716C] hover:text-[#171513]"
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('locations-section', 'branches')}
              className="text-left text-xs uppercase tracking-wider py-2 border-b border-[#EAE3D8]/60 text-[#78716C] hover:text-[#171513]"
            >
              Branches (Addis Ababa & Mekelle)
            </button>

            <button
              onClick={() => handleNavClick('footer-section', 'contact')}
              className="text-left text-xs uppercase tracking-wider py-2 border-b border-[#EAE3D8]/60 text-[#78716C] hover:text-[#171513]"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
