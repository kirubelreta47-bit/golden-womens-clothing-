import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col items-center gap-3">
      {/* 1. Floating Wishlist Button matching reference */}
      <button
        onClick={onOpenWishlist}
        className="w-11 h-11 rounded-full bg-white text-[#171513] hover:text-[#C69A4A] shadow-lg border border-[#EAE3D8] flex items-center justify-center transition-all duration-300 hover:scale-105 relative cursor-pointer"
        aria-label="Open Saved Pieces"
        title="Saved Pieces"
      >
        <Heart className="w-5 h-5" />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#171513] text-[#FAF7F2] text-[9px] font-bold flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* 2. Floating Cart Button with Red Badge matching reference */}
      <button
        onClick={onOpenCart}
        className="w-11 h-11 rounded-full bg-white text-[#171513] hover:text-[#C69A4A] shadow-lg border border-[#EAE3D8] flex items-center justify-center transition-all duration-300 hover:scale-105 relative cursor-pointer"
        aria-label="Open Shopping Bag"
        title="Shopping Bag"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E03A3A] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
            {cartCount}
          </span>
        )}
      </button>

      {/* 3. Floating Scroll to Top Arrow matching reference */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-white text-[#171513] hover:text-[#C69A4A] shadow-lg border border-[#EAE3D8] flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer animate-fadeIn"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

