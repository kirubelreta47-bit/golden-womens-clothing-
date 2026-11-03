import React, { useState } from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { Product, ProductColor } from '../types/store';
import { formatPrice } from '../utils/orderLinks';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  index = 0,
}) => {
  const [selectedSize] = useState<string>(product.sizes[0] || 'S');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1600);
  };

  const isNew = product.badge?.toLowerCase().includes('new') || product.isTrending || index < 2;

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white border border-[#EAE3D8] hover:border-[#C69A4A]/60 rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer w-full"
      style={{ animationDelay: `${(index % 8) * 60}ms` }}
    >
      {/* 3:4 Aspect Ratio Product Image - Centered and fully visible */}
      <div className="relative aspect-[3/4] w-full bg-[#F5EFE9] overflow-hidden">
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center sm:object-[center_top] transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Alternate Image on Hover if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover object-center sm:object-[center_top] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
            loading="lazy"
          />
        )}

        {/* Top-Left: Gold "New" Badge */}
        {isNew && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
            <span className="px-2 sm:px-2.5 py-0.5 bg-[#C69A4A] text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-wider rounded-sm shadow-xs">
              New
            </span>
          </div>
        )}

        {/* Top-Right: Circular Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-xs transition-all z-10 cursor-pointer shadow-xs ${isWishlisted
              ? 'bg-[#171513] text-[#C69A4A]'
              : 'bg-white/85 text-[#171513] hover:bg-white hover:text-[#C69A4A]'
            }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Details - Clean, unclipped layout */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5 sm:gap-3 bg-white">
        <div>
          {/* Product Title */}
          <h3
            className="font-serif text-xs sm:text-sm md:text-base font-semibold text-[#171513] leading-snug line-clamp-2 group-hover:text-[#C69A4A] transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-1 flex items-baseline">
            <span className="font-serif text-xs sm:text-sm md:text-base font-bold text-[#171513]">
              {formatPrice(product.priceETB)}
            </span>
          </div>
        </div>

        {/* Bottom Row: Color Swatches & Add to Cart Button (Stacks on small mobile so it never gets cut off) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-1 gap-2">
          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            {product.colors.slice(0, 3).map((c) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={`w-3 h-3 rounded-full border transition-all cursor-pointer ${selectedColor.name === c.name
                    ? 'ring-1 ring-offset-1 ring-[#C69A4A] scale-110'
                    : 'opacity-80 hover:opacity-100'
                  }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select ${c.name}`}
              />
            ))}
          </div>

          {/* Outlined Gold "Add to Cart" Button - Full width on small mobile, auto on desktop */}
          <button
            onClick={handleAdd}
            className={`w-full sm:w-auto px-2.5 sm:px-3 py-1.5 rounded-sm border text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${addedToast
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-[#C69A4A] text-[#C69A4A] hover:bg-[#C69A4A] hover:text-white'
              }`}
            title="Add piece to shopping bag"
          >
            {addedToast ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] sm:text-[11px]">Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span className="text-[10px] sm:text-[11px] font-medium">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
