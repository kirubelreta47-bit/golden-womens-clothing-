import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types/store';
import { formatPrice } from '../utils/orderLinks';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onQuickView,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#E7E2D8] text-[#1C1917]">
          {/* Header */}
          <div className="p-6 border-b border-[#E7E2D8] flex items-center justify-between bg-[#F2EFE9]/50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C5A880] fill-[#C5A880]" />
              <h2 className="font-serif text-xl tracking-wide font-medium">Saved Pieces</h2>
              <span className="text-xs font-mono bg-[#E7E2D8] px-2 py-0.5 rounded text-[#78716C]">
                {wishlist.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#E7E2D8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          {wishlist.length === 0 ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F2EFE9] border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-light">No saved favorites yet</h3>
              <p className="text-xs text-[#78716C] max-w-xs leading-relaxed">
                Save pieces you love while browsing to create your personal wardrobe shortlist.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#E7E2D8]">
              {wishlist.map((product) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                  <div 
                    className="w-20 aspect-[3/4] bg-[#F2EFE9] rounded-sm overflow-hidden shrink-0 border border-[#E7E2D8] cursor-pointer"
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          onClick={() => {
                            onClose();
                            onQuickView(product);
                          }}
                          className="font-serif text-sm font-medium hover:text-[#C5A880] cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-[#78716C] hover:text-rose-600 p-1"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs font-serif text-[#1C1917] mt-1">
                        {formatPrice(product.priceETB)}
                      </p>
                    </div>

                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                        }}
                        className="flex-1 py-1.5 px-2 bg-[#1C1917] text-[#FBF9F5] hover:bg-[#332e2b] rounded text-[10px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#C5A880]" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                        className="py-1.5 px-2 bg-[#F2EFE9] hover:bg-[#E7E2D8] border border-[#C5A880]/30 rounded text-[10px] uppercase tracking-wider text-[#1C1917] transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
