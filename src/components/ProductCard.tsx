import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, MessageCircle, Send, Check } from 'lucide-react';
import { Product, ProductColor } from '../types/store';
import { formatPrice, buildSingleProductMessage, getWhatsAppUrl, getTelegramUrl } from '../utils/orderLinks';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'S');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1600);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = buildSingleProductMessage(product, selectedSize, selectedColor, 1);
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const handleTelegramOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = buildSingleProductMessage(product, selectedSize, selectedColor, 1);
    window.open(getTelegramUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="group relative flex flex-col bg-[#FBF9F5] border border-[#E7E2D8] hover:border-[#C5A880]/60 transition-all duration-300 rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container - 3:4 Aspect Ratio */}
      <div 
        className="relative aspect-[3/4] w-full bg-[#F2EFE9] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Hover Flip Image */}
        <img
          src={product.images[1]}
          alt={`${product.name} alternate view`}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          loading="lazy"
        />

        {/* Subtle Dark Gradient Overlay on Hover for action contrast */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 bg-[#1C1917]/90 text-[#FBF9F5] text-[10px] uppercase tracking-widest font-medium backdrop-blur-sm border border-[#C5A880]/30 shadow-sm">
              {product.badge}
            </span>
          )}
          {product.stockCount && product.stockCount <= 3 && (
            <span className="px-2 py-0.5 bg-[#C5A880] text-[#1C1917] text-[9px] uppercase tracking-wider font-bold shadow-sm">
              Few Units Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-[#1C1917] text-[#C5A880] shadow'
              : 'bg-white/80 text-[#1C1917] hover:bg-white hover:text-[#C5A880]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button floating on hover */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2.5 px-3 bg-[#FBF9F5]/95 hover:bg-[#1C1917] hover:text-[#FBF9F5] text-[#1C1917] backdrop-blur-md border border-[#C5A880]/40 text-[11px] uppercase tracking-widest font-medium transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Quick View & Details</span>
          </button>
        </div>
      </div>

      {/* Product Information Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-[#FBF9F5]">
        <div>
          {/* Category micro-tag */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#78716C] mb-1">
            <span>{product.category}</span>
            <span className="font-mono text-[9px] text-[#C5A880]">#{product.id}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base sm:text-lg text-[#1C1917] font-normal leading-snug hover:text-[#C5A880] transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Fabric / Subtitle */}
          <p className="text-xs text-[#78716C] line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>

          {/* Price (in Birr only) */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-medium text-[#1C1917]">
              {formatPrice(product.priceETB)}
            </span>
          </div>
        </div>

        {/* Color Swatches and Size Selector */}
        <div className="space-y-2 pt-2 border-t border-[#E7E2D8]">
          <div className="flex items-center justify-between">
            {/* Color Swatches */}
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor.name === c.name
                      ? 'ring-1 ring-offset-1 ring-[#C5A880] scale-110'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name}`}
                  aria-label={`Select color ${c.name}`}
                />
              ))}
            </div>

            {/* Selected Color Name */}
            <span className="text-[10px] text-[#78716C] truncate max-w-[120px]">
              {selectedColor.name}
            </span>
          </div>

          {/* Size Pills */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase tracking-wider text-[#78716C] mr-1">
              Size:
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(s);
                  }}
                  className={`min-w-6 h-6 px-1.5 text-[10px] font-mono rounded transition-colors ${
                    selectedSize === s
                      ? 'bg-[#1C1917] text-[#FBF9F5] font-semibold'
                      : 'bg-[#F2EFE9] text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Row: Add to Bag & Direct Chat Ordering Buttons */}
        <div className="pt-2 flex flex-col gap-1.5">
          {/* Add to Bag Button */}
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-3 rounded text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              addedToast
                ? 'bg-emerald-800 text-white'
                : 'bg-[#1C1917] text-[#FBF9F5] hover:bg-[#332e2b]'
            }`}
          >
            {addedToast ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>

          {/* Direct Instant Order: WhatsApp & Telegram */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={handleWhatsAppOrder}
              className="py-1.5 px-2 bg-[#F2EFE9] hover:bg-[#e8e4db] border border-[#C5A880]/40 rounded text-[10px] uppercase tracking-wider text-[#1C1917] font-medium transition-colors flex items-center justify-center gap-1.5"
              title="Order this exact piece on WhatsApp"
            >
              <MessageCircle className="w-3 h-3 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleTelegramOrder}
              className="py-1.5 px-2 bg-[#F2EFE9] hover:bg-[#e8e4db] border border-[#C5A880]/40 rounded text-[10px] uppercase tracking-wider text-[#1C1917] font-medium transition-colors flex items-center justify-center gap-1.5"
              title="Order this exact piece on Telegram"
            >
              <Send className="w-3 h-3 text-sky-600" />
              <span>Telegram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
