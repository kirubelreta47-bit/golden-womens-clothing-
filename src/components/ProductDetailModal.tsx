import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Check, Ruler, Sparkles, AlertCircle } from 'lucide-react';
import { Product, ProductColor } from '../types/store';
import { formatPrice } from '../utils/orderLinks';

interface ProductDetailModalProps {
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  onDirectCheckout?: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
  onDirectCheckout,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [sizeError, setSizeError] = useState<boolean>(false);

  // Reset variation selections when product changes
  useEffect(() => {
    if (product) {
      setActiveImageIdx(0);
      setSelectedSize('');
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      setSizeError(false);
    }
  }, [product?.id]);

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleWhatsAppCheckout = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    if (onDirectCheckout) {
      onDirectCheckout(product, selectedSize, selectedColor, quantity);
      onClose();
    } else {
      onAddToCart(product, selectedSize, selectedColor, quantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn" role="dialog" aria-modal="true">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-[#FBF9F5] border border-[#E7E2D8] w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl rounded-sm z-10 text-[#1C1917]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#F2EFE9] hover:bg-[#E7E2D8] rounded-full text-[#1C1917] transition-colors z-20 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">

          {/* Left Column: Image Gallery with 3:4 Aspect Ratio */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full bg-[#F2EFE9] rounded-sm overflow-hidden border border-[#E7E2D8]">
              <img
                src={product.images[activeImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-opacity duration-300"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#1C1917] text-[#FBF9F5] text-[10px] uppercase tracking-widest px-2.5 py-1 border border-[#C5A880]/30 shadow">
                  {product.badge}
                </div>
              )}

              <button
                onClick={() => onToggleWishlist(product)}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${isWishlisted
                  ? 'bg-[#1C1917] text-[#C5A880]'
                  : 'bg-white/80 text-[#1C1917] hover:text-[#C5A880]'
                  }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail switcher */}
            <div className="grid grid-cols-2 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-[3/4] rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${activeImageIdx === idx
                    ? 'border-[#C5A880] ring-1 ring-[#C5A880]'
                    : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Specifications & Ordering */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Item ID */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#78716C] mb-1">
                <span>{product.category} atelier piece</span>
                <span className="font-mono text-[#C5A880]">Item ID: #{product.id}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-light leading-tight">
                {product.name}
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#78716C] mt-1 font-light italic">
                {product.subtitle}
              </p>

              {/* Price Banner */}
              <div className="mt-4 p-3 bg-[#F2EFE9] border border-[#C5A880]/30 rounded-sm flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] block">
                    Piece Price
                  </span>
                  <span className="font-serif text-2xl font-medium text-[#1C1917]">
                    {formatPrice(product.priceETB * quantity)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#78716C] leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-wider text-[#78716C]">
                    Color: <strong className="text-[#1C1917] font-medium">{selectedColor.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all cursor-pointer ${selectedColor.name === c.name
                        ? 'border-[#C5A880] bg-[#F2EFE9] font-medium shadow-sm'
                        : 'border-[#E7E2D8] hover:border-[#C5A880]/50'
                        }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector with Required Indicator & Size Guide */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                    Select Size:
                    <strong className={selectedSize ? "text-[#1C1917] font-semibold" : "text-rose-600 font-medium"}>
                      {selectedSize || 'Required'}
                    </strong>
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="flex items-center gap-1 text-[#C5A880] hover:text-[#9E7F55] uppercase tracking-wider text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Measurements</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSize(s);
                        setSizeError(false);
                      }}
                      className={`min-w-10 h-10 px-3 text-xs font-mono rounded transition-all cursor-pointer ${selectedSize === s
                        ? 'bg-[#1C1917] text-[#FBF9F5] font-semibold border-2 border-[#1C1917]'
                        : sizeError
                          ? 'bg-rose-50 text-rose-700 border border-rose-300 hover:border-rose-500'
                          : 'bg-[#F2EFE9] text-[#1C1917] border border-[#E7E2D8] hover:border-[#C5A880]'
                        }`}
                      aria-label={`Select size ${s}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {sizeError && (
                  <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 pt-1 animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Please select your size before adding to bag or ordering.</span>
                  </p>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-[#78716C]">Quantity:</span>
                <div className="flex items-center border border-[#E7E2D8] rounded bg-[#F2EFE9]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-sm hover:text-[#C5A880] transition-colors cursor-pointer"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-sm hover:text-[#C5A880] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                {product.stockCount && (
                  <span className="text-[11px] text-[#C5A880] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {product.stockCount} pieces available in atelier
                  </span>
                )}
              </div>

              {/* Sizing & Material Note */}
              <div className="mt-6 p-3 bg-[#F2EFE9]/60 border-l-2 border-[#C5A880] text-xs text-[#78716C] space-y-1">
                <p><strong>Fabric:</strong> {product.fabric}</p>
                <p><strong>Care:</strong> {product.care}</p>
                <p><strong>Fit:</strong> {product.modelInfo}</p>
              </div>
            </div>

            {/* Action Buttons: Add to Bag & Instant WhatsApp Order */}
            <div className="space-y-3 pt-4 border-t border-[#E7E2D8]">
              {/* Add to Bag */}
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${addedToast
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#1C1917] text-[#FBF9F5] hover:bg-[#332e2b]'
                  }`}
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              {/* Direct Instant WhatsApp Checkout */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/50 rounded text-xs uppercase tracking-wider text-[#1C1917] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Place Order via WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
