import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, Send, Copy, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '../types/store';
import { formatPrice, buildCartOrderMessage, getWhatsAppUrl, getTelegramUrl } from '../utils/orderLinks';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [deliveryNote, setDeliveryNote] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalETB = cart.reduce((sum, item) => sum + item.product.priceETB * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartMessage = buildCartOrderMessage(cart, deliveryNote);

  const handleWhatsAppCheckout = () => {
    window.open(getWhatsAppUrl(cartMessage), '_blank', 'noopener,noreferrer');
  };

  const handleTelegramCheckout = () => {
    window.open(getTelegramUrl(cartMessage), '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(cartMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#E7E2D8] text-[#1C1917]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E7E2D8] flex items-center justify-between bg-[#F2EFE9]/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
              <h2 className="font-serif text-xl tracking-wide font-medium">Your Atelier Bag</h2>
              <span className="text-xs font-mono bg-[#E7E2D8] px-2 py-0.5 rounded text-[#78716C]">
                {totalItems} {totalItems === 1 ? 'piece' : 'pieces'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#E7E2D8] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F2EFE9] border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-light">Your bag is currently empty</h3>
              <p className="text-xs text-[#78716C] max-w-xs leading-relaxed">
                Explore our curated drops of fine mulberry silk, cashmere outerwear, and tailored co-ords.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-[#1C1917] text-[#FBF9F5] hover:bg-[#332e2b] text-xs uppercase tracking-widest font-medium transition-all rounded shadow"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#E7E2D8]">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                    {/* 3:4 Thumbnail */}
                    <div className="w-20 aspect-[3/4] bg-[#F2EFE9] rounded-sm overflow-hidden shrink-0 border border-[#E7E2D8]">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-medium leading-snug line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#78716C] hover:text-rose-600 transition-colors p-1"
                            title="Remove piece"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-[11px] text-[#78716C]">
                          <span>Size: <strong className="text-[#1C1917]">{item.selectedSize}</strong></span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#E7E2D8] rounded bg-[#F2EFE9]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-[#C5A880] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-[#C5A880] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-sm font-medium">
                          {formatPrice(item.product.priceETB * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Delivery & Fit Notes */}
                <div className="pt-4 space-y-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#78716C]">
                    Delivery Address or Sizing Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder="e.g. Bole Medhanialem area, morning delivery preferred, or custom hem inquiry..."
                    className="w-full text-xs p-2.5 bg-[#F2EFE9] border border-[#E7E2D8] focus:border-[#C5A880] rounded focus:outline-none resize-none text-[#1C1917]"
                  />
                  <p className="text-[10px] text-[#78716C] italic">
                    This note will be automatically included in your WhatsApp / Telegram message.
                  </p>
                </div>
              </div>

              {/* Order Footer & Checkout Buttons */}
              <div className="p-6 bg-[#F2EFE9] border-t border-[#E7E2D8] space-y-4">
                {/* Pricing Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#78716C]">
                    <span>Subtotal ({totalItems} pieces)</span>
                    <span className="font-mono">{formatPrice(totalETB)}</span>
                  </div>
                  <div className="flex justify-between text-[#78716C]">
                    <span>Atelier Doorstep Delivery</span>
                    <span className="text-[#C5A880] font-medium">Calculated upon chat confirmation</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-medium pt-2 border-t border-[#E7E2D8] text-[#1C1917]">
                    <span>Estimated Total</span>
                    <span>{formatPrice(totalETB)}</span>
                  </div>
                </div>

                {/* Direct Ordering Callout */}
                <div className="bg-[#FBF9F5] p-3 rounded border border-[#C5A880]/30 text-[11px] text-[#78716C] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>
                    No online credit card needed. Click below to instantly send your pre-compiled order to our atelier concierge.
                  </span>
                </div>

                {/* Two Prominent Action Buttons */}
                <div className="space-y-2">
                  {/* WhatsApp Checkout */}
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs uppercase tracking-wider rounded shadow transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Complete Order on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Telegram Checkout */}
                  <button
                    onClick={handleTelegramCheckout}
                    className="w-full py-3.5 px-4 bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-medium text-xs uppercase tracking-wider rounded shadow transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Complete Order on Telegram</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Copy Text Alternative */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={handleCopyMessage}
                    className="text-[11px] text-[#78716C] hover:text-[#1C1917] flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Order text copied!' : 'Copy order message manually'}</span>
                  </button>

                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-[#78716C] hover:text-rose-600 transition-colors"
                  >
                    Empty bag
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
