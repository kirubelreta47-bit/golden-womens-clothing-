import React, { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Check,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Truck,
  Store,
  Building2,
  AlertCircle,
  Sparkles,
  Copy,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { CartItem, CustomerOrderInfo, OrderFormErrors } from '../types/store';
import { STORE_BRANCHES, BranchName, OrderType, createWhatsAppChatUrl } from '../config/whatsapp';
import { formatPrice, buildWhatsAppOrderMessage } from '../utils/orderLinks';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  initialCheckoutMode?: boolean;
}

const CUSTOMER_INFO_STORAGE_KEY = 'golden_womens_customer_info_v1';

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  initialCheckoutMode = false,
}) => {
  // Navigation inside Drawer: 'cart' | 'checkout' | 'confirmation'
  const [currentStep, setCurrentStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');

  // Customer Information state
  const [customerInfo, setCustomerInfo] = useState<CustomerOrderInfo>(() => {
    const defaultInfo: CustomerOrderInfo = {
      name: '',
      phone: '',
      branch: STORE_BRANCHES[0].name,
      orderType: 'Store Pickup',
      deliveryAddress: '',
      additionalInstructions: '',
    };
    if (typeof window === 'undefined') return defaultInfo;
    try {
      const saved = localStorage.getItem(CUSTOMER_INFO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultInfo,
          ...parsed,
          // ensure valid branch
          branch: STORE_BRANCHES.some((b) => b.name === parsed.branch)
            ? parsed.branch
            : STORE_BRANCHES[0].name,
        };
      }
    } catch {
      // fallback
    }
    return defaultInfo;
  });

  const [formErrors, setFormErrors] = useState<OrderFormErrors>({});
  const [copied, setCopied] = useState<boolean>(false);
  const [lastGeneratedMessage, setLastGeneratedMessage] = useState<string>('');
  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState<boolean>(false);

  // Sync initialCheckoutMode when drawer opens
  useEffect(() => {
    if (isOpen) {
      if (initialCheckoutMode && cart.length > 0) {
        setCurrentStep('checkout');
      } else if (currentStep === 'confirmation' && cart.length === 0) {
        setCurrentStep('cart');
      }
    } else {
      // Reset errors when closed
      setFormErrors({});
    }
  }, [isOpen, initialCheckoutMode, cart.length]);

  // Persist customer info to localStorage whenever valid edits happen
  useEffect(() => {
    try {
      localStorage.setItem(
        CUSTOMER_INFO_STORAGE_KEY,
        JSON.stringify({
          name: customerInfo.name,
          phone: customerInfo.phone,
          branch: customerInfo.branch,
          orderType: customerInfo.orderType,
          deliveryAddress: customerInfo.deliveryAddress,
        })
      );
    } catch {
      // ignore storage errors
    }
  }, [customerInfo]);

  if (!isOpen) return null;

  const totalETB = cart.reduce((sum, item) => sum + item.product.priceETB * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Validate form fields before placing order
  const validateForm = (): boolean => {
    const errors: OrderFormErrors = {};

    if (!customerInfo.name.trim()) {
      errors.name = 'Please provide your full name.';
    }

    const cleanPhone = customerInfo.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errors.phone = 'Please provide your phone number.';
    } else if (cleanPhone.length < 9) {
      errors.phone = 'Please enter a valid phone number (at least 9 digits).';
    }

    if (!customerInfo.branch) {
      errors.branch = 'Please choose your preferred branch.';
    }

    if (customerInfo.orderType === 'Delivery' && !customerInfo.deliveryAddress.trim()) {
      errors.deliveryAddress = 'Delivery address is required for home/office delivery.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    if (!validateForm()) {
      return;
    }

    const orderMessage = buildWhatsAppOrderMessage(cart, customerInfo);
    setLastGeneratedMessage(orderMessage);

    // Open WhatsApp Click-to-Chat in new window
    const whatsappUrl = createWhatsAppChatUrl(orderMessage);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setHasOpenedWhatsApp(true);
    setCurrentStep('confirmation');
  };

  const handleCopyMessage = () => {
    const messageToCopy = lastGeneratedMessage || buildWhatsAppOrderMessage(cart, customerInfo);
    navigator.clipboard.writeText(messageToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleExplicitOrderConfirmed = () => {
    onClearCart();
    setCurrentStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn" role="dialog" aria-modal="true">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#E7E2D8] text-[#1C1917]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E7E2D8] flex items-center justify-between bg-[#F2EFE9]/80 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              {currentStep === 'checkout' && (
                <button
                  onClick={() => setCurrentStep('cart')}
                  className="p-1 -ml-1 text-[#78716C] hover:text-[#1C1917] transition-colors rounded-full hover:bg-[#E7E2D8]"
                  title="Back to Bag"
                  aria-label="Back to Bag"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
              <div>
                <h2 className="font-serif text-lg sm:text-xl tracking-wide font-medium">
                  {currentStep === 'cart' && 'Your Shopping Bag'}
                  {currentStep === 'checkout' && 'Checkout & WhatsApp Order'}
                  {currentStep === 'confirmation' && 'Order Request Sent'}
                </h2>
                <p className="text-[10px] text-[#78716C] font-mono tracking-tight">
                  {currentStep === 'confirmation'
                    ? 'Finalize directly on WhatsApp'
                    : `${totalItems} ${totalItems === 1 ? 'item' : 'items'} • ${formatPrice(totalETB)}`}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#E7E2D8] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content by Step */}
          {cart.length === 0 && currentStep !== 'confirmation' ? (
            /* Empty Cart State */
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F2EFE9] border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-light">Your shopping bag is empty</h3>
              <p className="text-xs text-[#78716C] max-w-xs leading-relaxed">
                Browse our curated drops of fine mulberry silks, cashmere outerwear, and tailored matching sets.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-[#1C1917] text-[#FBF9F5] hover:bg-[#332e2b] text-xs uppercase tracking-widest font-medium transition-all rounded shadow cursor-pointer"
              >
                Discover Collection
              </button>
            </div>
          ) : currentStep === 'cart' ? (
            /* STEP 1: CART LIST VIEW */
            <>
              {/* Product List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-[#E7E2D8]">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 sm:gap-4">
                    {/* 3:4 Thumbnail */}
                    <div className="w-20 sm:w-22 aspect-[3/4] bg-[#F2EFE9] rounded-sm overflow-hidden shrink-0 border border-[#E7E2D8]">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-medium leading-snug line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#78716C] hover:text-rose-600 transition-colors p-1 shrink-0"
                            title="Remove piece"
                            aria-label={`Remove ${item.product.name} from bag`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Variations Badges */}
                        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[#78716C] flex-wrap">
                          <span className="inline-flex items-center gap-1 bg-[#F2EFE9] border border-[#E7E2D8] px-2 py-0.5 rounded font-mono text-[10px]">
                            Size: <strong className="text-[#1C1917] font-semibold">{item.selectedSize}</strong>
                          </span>
                          <span className="inline-flex items-center gap-1 bg-[#F2EFE9] border border-[#E7E2D8] px-2 py-0.5 rounded text-[10px]">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-black/10 shrink-0"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span className="text-[#1C1917] font-medium truncate max-w-[100px]">
                              {item.selectedColor.name}
                            </span>
                          </span>
                        </div>

                        {/* Individual Item Price */}
                        <p className="mt-1 text-[11px] text-[#78716C] font-mono">
                          {formatPrice(item.product.priceETB)} each
                        </p>
                      </div>

                      {/* Quantity & Line Total */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E7E2D8]/50">
                        <div className="flex items-center border border-[#E7E2D8] rounded bg-[#F2EFE9]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 sm:p-1.5 hover:text-[#C5A880] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 sm:p-1.5 hover:text-[#C5A880] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-sm font-semibold text-[#1C1917]">
                          {formatPrice(item.product.priceETB * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="p-4 sm:p-6 bg-[#F2EFE9] border-t border-[#E7E2D8] space-y-4">
                {/* Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#78716C]">
                    <span>Subtotal ({totalItems} pieces)</span>
                    <span className="font-mono">{formatPrice(totalETB)}</span>
                  </div>
                  <div className="flex justify-between text-[#78716C]">
                    <span>Fulfillment / Delivery</span>
                    <span className="text-[#C5A880] font-medium">Pickup or Courier Selection Next</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-medium pt-2 border-t border-[#E7E2D8] text-[#1C1917]">
                    <span>Total Amount</span>
                    <span className="font-semibold text-lg">{formatPrice(totalETB)}</span>
                  </div>
                </div>

                {/* Info Callout */}
                <div className="bg-[#FBF9F5] p-3 rounded border border-[#C5A880]/30 text-[11px] text-[#78716C] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Orders are processed directly via WhatsApp. Select your branch and submit in one click.
                  </span>
                </div>

                {/* Primary CTA: Go to Checkout Step */}
                <button
                  onClick={() => setCurrentStep('checkout')}
                  className="w-full py-3.5 px-4 bg-[#1C1917] hover:bg-[#332e2b] text-[#FBF9F5] font-medium text-xs uppercase tracking-widest rounded shadow transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Proceed to Branch & Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary Actions */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-[#78716C]">
                  <button
                    onClick={onClose}
                    className="hover:text-[#1C1917] transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={onClearCart}
                    className="hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    Clear Bag
                  </button>
                </div>
              </div>
            </>
          ) : currentStep === 'checkout' ? (
            /* STEP 2: CHECKOUT & BRANCH SELECTION */
            <>
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                
                {/* Mini Order Summary Pill */}
                <div className="bg-[#F2EFE9] border border-[#E7E2D8] rounded p-3 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[#78716C] block text-[10px] uppercase tracking-wider">
                      Selected Order ({totalItems} items)
                    </span>
                    <span className="font-serif font-medium text-[#1C1917] text-sm">
                      {formatPrice(totalETB)}
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentStep('cart')}
                    className="text-[#C5A880] hover:text-[#9E7F55] font-medium text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Review Bag
                  </button>
                </div>

                {/* Customer Details Section */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1C1917] flex items-center gap-1.5">
                    <span>1. Customer Details</span>
                  </h3>

                  {/* Name Input */}
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#78716C] mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                      }}
                      placeholder="e.g. Sarah Abebe"
                      className={`w-full text-xs p-2.5 bg-[#F2EFE9] border rounded text-[#1C1917] placeholder-[#78716C]/60 focus:outline-none transition-colors ${
                        formErrors.name
                          ? 'border-rose-500 focus:border-rose-500 bg-rose-50/30'
                          : 'border-[#E7E2D8] focus:border-[#C5A880]'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-[10px] text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#78716C] mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, phone: e.target.value });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                      }}
                      placeholder="e.g. 0911234567"
                      className={`w-full text-xs p-2.5 bg-[#F2EFE9] border rounded text-[#1C1917] placeholder-[#78716C]/60 focus:outline-none transition-colors ${
                        formErrors.phone
                          ? 'border-rose-500 focus:border-rose-500 bg-rose-50/30'
                          : 'border-[#E7E2D8] focus:border-[#C5A880]'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-[10px] text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{formErrors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Branch Selection Section */}
                <div className="space-y-3 pt-3 border-t border-[#E7E2D8]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1C1917] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>2. Preferred Branch</span>
                      <span className="text-rose-500">*</span>
                    </h3>
                  </div>
                  <p className="text-[10px] text-[#78716C]">
                    Select the physical boutique location nearest to you for pickup coordination or delivery dispatch.
                  </p>

                  <div className="space-y-2.5">
                    {STORE_BRANCHES.map((b) => {
                      const isSelected = customerInfo.branch === b.name;
                      const BranchIcon = b.id === 'branch-1' ? Building2 : b.id === 'branch-2' ? Store : MapPin;
                      const branchTag = b.id === 'branch-1' ? 'Bole Flagship' : b.id === 'branch-2' ? 'Kazanchis Hub' : 'Mekelle Central';

                      return (
                        <label
                          key={b.id}
                          onClick={() => {
                            setCustomerInfo({ ...customerInfo, branch: b.name });
                            if (formErrors.branch) setFormErrors({ ...formErrors, branch: undefined });
                          }}
                          className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#C5A880] bg-[#F2EFE9] shadow-sm ring-1 ring-[#C5A880]'
                              : 'border-[#E7E2D8] hover:border-[#C5A880]/50 bg-white/40'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'bg-[#C5A880] text-[#1C1917]'
                              : 'bg-[#F2EFE9] text-[#78716C] border border-[#E7E2D8]'
                          }`}>
                            <BranchIcon className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="block font-medium text-xs text-[#1C1917]">
                                {b.name}
                              </span>
                              <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#FBF9F5] text-[#78716C] border border-[#E7E2D8]">
                                {branchTag}
                              </span>
                            </div>
                            <span className="block text-[11px] text-[#78716C] mt-0.5">
                              {b.address}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  {formErrors.branch && (
                    <p className="text-[10px] text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{formErrors.branch}</span>
                    </p>
                  )}
                </div>

                {/* Fulfillment Preference Section */}
                <div className="space-y-3 pt-3 border-t border-[#E7E2D8]">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1C1917] flex items-center gap-1.5">
                    <span>3. Order Type</span>
                    <span className="text-rose-500">*</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setCustomerInfo({ ...customerInfo, orderType: 'Store Pickup' });
                        if (formErrors.deliveryAddress) {
                          setFormErrors({ ...formErrors, deliveryAddress: undefined });
                        }
                      }}
                      className={`p-3 rounded border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        customerInfo.orderType === 'Store Pickup'
                          ? 'border-[#C5A880] bg-[#F2EFE9] font-medium ring-1 ring-[#C5A880]'
                          : 'border-[#E7E2D8] hover:border-[#C5A880]/50 bg-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs text-[#1C1917]">
                        <Store className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Store Pickup</span>
                      </div>
                      <span className="text-[10px] text-[#78716C] mt-1">
                        Collect in person from branch
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCustomerInfo({ ...customerInfo, orderType: 'Delivery' })}
                      className={`p-3 rounded border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        customerInfo.orderType === 'Delivery'
                          ? 'border-[#C5A880] bg-[#F2EFE9] font-medium ring-1 ring-[#C5A880]'
                          : 'border-[#E7E2D8] hover:border-[#C5A880]/50 bg-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs text-[#1C1917]">
                        <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Home Delivery</span>
                      </div>
                      <span className="text-[10px] text-[#78716C] mt-1">
                        Doorstep courier dispatch
                      </span>
                    </button>
                  </div>

                  {/* Delivery Address (Conditional) */}
                  {customerInfo.orderType === 'Delivery' && (
                    <div className="space-y-1.5 pt-1 animate-fadeIn">
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
                        Delivery Address <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={customerInfo.deliveryAddress}
                        onChange={(e) => {
                          setCustomerInfo({ ...customerInfo, deliveryAddress: e.target.value });
                          if (formErrors.deliveryAddress) {
                            setFormErrors({ ...formErrors, deliveryAddress: undefined });
                          }
                        }}
                        placeholder="e.g. Bole Medhanialem area, behind Edna Mall, House #402..."
                        className={`w-full text-xs p-2.5 bg-[#F2EFE9] border rounded text-[#1C1917] placeholder-[#78716C]/60 focus:outline-none transition-colors resize-none ${
                          formErrors.deliveryAddress
                            ? 'border-rose-500 focus:border-rose-500 bg-rose-50/30'
                            : 'border-[#E7E2D8] focus:border-[#C5A880]'
                        }`}
                      />
                      {formErrors.deliveryAddress ? (
                        <p className="text-[10px] text-rose-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{formErrors.deliveryAddress}</span>
                        </p>
                      ) : (
                        <p className="text-[10px] text-[#78716C] italic">
                          Courier fee is verified directly with your stylist on WhatsApp.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Additional Instructions (Optional) */}
                  <div className="space-y-1.5 pt-2">
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
                      Additional Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={customerInfo.additionalInstructions}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, additionalInstructions: e.target.value })
                      }
                      placeholder="e.g. Preferred pickup date/time, custom hem request, or gift packaging..."
                      className="w-full text-xs p-2.5 bg-[#F2EFE9] border border-[#E7E2D8] focus:border-[#C5A880] rounded text-[#1C1917] placeholder-[#78716C]/60 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Important Inventory & ERP Notice */}
                <div className="p-3 bg-[#F2EFE9]/90 border-l-2 border-[#C5A880] rounded text-[11px] text-[#78716C] space-y-1">
                  <p className="font-medium text-[#1C1917] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>How WhatsApp Ordering Works</span>
                  </p>
                  <p className="leading-relaxed">
                    Clicking below will format your order and open WhatsApp. You will manually press <strong>Send</strong>. Our branch concierge will then check physical inventory in our ERP system and confirm availability with you.
                  </p>
                </div>

              </div>

              {/* Checkout Action Footer */}
              <div className="p-4 sm:p-6 bg-[#F2EFE9] border-t border-[#E7E2D8] space-y-3">
                <div className="flex justify-between items-baseline text-xs text-[#78716C]">
                  <span>Total Payable:</span>
                  <span className="font-serif text-lg font-semibold text-[#1C1917]">
                    {formatPrice(totalETB)}
                  </span>
                </div>

                {/* Place Order via WhatsApp CTA */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs uppercase tracking-wider rounded shadow transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Place Order via WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#78716C] pt-1">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('cart')}
                    className="hover:text-[#1C1917] transition-colors cursor-pointer"
                  >
                    ← Back to Bag
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="hover:text-[#1C1917] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy Message'}</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* STEP 3: CONFIRMATION SCREEN */
            <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 space-y-6 overflow-y-auto">
              <div className="space-y-5 text-center sm:text-left">
                {/* Icon & Title */}
                <div className="w-14 h-14 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mx-auto sm:mx-0">
                  <MessageCircle className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-light text-[#1C1917]">
                    Order Request Prepared
                  </h3>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    Your order details were compiled and sent to WhatsApp chat with Golden Women's Clothing.
                  </p>
                </div>

                {/* Important Next Steps Guidance */}
                <div className="bg-[#F2EFE9] border border-[#C5A880]/40 rounded-sm p-4 text-xs space-y-3 text-left">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1C1917] text-[#FBF9F5] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <p className="font-medium text-[#1C1917]">Press "Send" in WhatsApp</p>
                      <p className="text-[11px] text-[#78716C] leading-relaxed mt-0.5">
                        WhatsApp opened with your pre-filled message. Remember to press Send in the chat window so our stylist receives your request.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2 border-t border-[#E7E2D8]">
                    <span className="w-5 h-5 rounded-full bg-[#1C1917] text-[#FBF9F5] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <p className="font-medium text-[#1C1917]">Stylist ERP Availability Check</p>
                      <p className="text-[11px] text-[#78716C] leading-relaxed mt-0.5">
                        Our store associate at <strong>{customerInfo.branch}</strong> will verify stock in our ERP and confirm item availability and delivery/pickup details with you directly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Summary Recap */}
                <div className="border border-[#E7E2D8] rounded p-3 text-xs space-y-2 bg-white/40">
                  <div className="flex justify-between text-[#78716C]">
                    <span>Recipient:</span>
                    <span className="font-medium text-[#1C1917]">{customerInfo.name} ({customerInfo.phone})</span>
                  </div>
                  <div className="flex justify-between text-[#78716C]">
                    <span>Branch:</span>
                    <span className="font-medium text-[#1C1917]">{customerInfo.branch}</span>
                  </div>
                  <div className="flex justify-between text-[#78716C]">
                    <span>Fulfillment:</span>
                    <span className="font-medium text-[#1C1917]">{customerInfo.orderType}</span>
                  </div>
                  <div className="flex justify-between text-[#78716C] pt-1 border-t border-[#E7E2D8]">
                    <span>Order Total ({totalItems} items):</span>
                    <span className="font-serif font-bold text-sm text-[#1C1917]">{formatPrice(totalETB)}</span>
                  </div>
                </div>

                {/* Re-open WhatsApp & Copy Controls */}
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    onClick={() => {
                      const url = createWhatsAppChatUrl(
                        lastGeneratedMessage || buildWhatsAppOrderMessage(cart, customerInfo)
                      );
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex-1 py-2.5 px-3 bg-[#F2EFE9] hover:bg-[#e8e4db] border border-[#C5A880]/50 rounded text-xs text-[#1C1917] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Re-open WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopyMessage}
                    className="py-2.5 px-3 bg-[#F2EFE9] hover:bg-[#e8e4db] border border-[#E7E2D8] rounded text-xs text-[#1C1917] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Message'}</span>
                  </button>
                </div>
              </div>

              {/* Explicit Clear or Keep Cart Actions (Requirement 5 & 8) */}
              <div className="space-y-2 pt-4 border-t border-[#E7E2D8]">
                <button
                  onClick={handleExplicitOrderConfirmed}
                  className="w-full py-3.5 px-4 bg-[#1C1917] hover:bg-[#332e2b] text-[#FBF9F5] font-medium text-xs uppercase tracking-widest rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>I've Sent the Order (Clear Bag)</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentStep('cart');
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 bg-[#F2EFE9] hover:bg-[#e8e4db] text-[#78716C] hover:text-[#1C1917] text-xs font-medium rounded transition-colors text-center cursor-pointer"
                >
                  Keep Items in Bag & Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
