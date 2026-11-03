/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CategoryType, ProductColor } from './types/store';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNavSection } from './components/CategoryNavSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { TrustSection } from './components/TrustSection';
import { ShopWithConfidenceBanner } from './components/ShopWithConfidenceBanner';
import { LocationsSection } from './components/LocationsSection';
import { InstagramGrid } from './components/InstagramGrid';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ArrowRight, Sparkles } from 'lucide-react';

const CART_STORAGE_KEY = 'golden_womens_clothing_cart_v1';
const WISHLIST_STORAGE_KEY = 'golden_womens_clothing_wishlist_v1';

export default function App() {
  // Store Global State
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartCheckoutMode, setCartCheckoutMode] = useState<boolean>(false);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart & Wishlist Storage backed by localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage', e);
      return [];
    }
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Cart actions
  const handleAddToCart = (
    product: Product,
    size?: string,
    color?: ProductColor,
    quantity: number = 1
  ) => {
    const chosenSize = size || product.sizes[0] || 'S';
    const chosenColor = color || product.colors[0];
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor.name}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity,
        },
      ];
    });

    showToast(`Added "${product.name}" (${chosenSize}) to your bag`);
  };

  // Direct checkout action (adds to cart and opens checkout directly)
  const handleDirectCheckout = (
    product: Product,
    size: string,
    color: ProductColor,
    quantity: number = 1
  ) => {
    handleAddToCart(product, size, color, quantity);
    setCartCheckoutMode(true);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from saved`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to your wishlist`);
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isProductWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (activeCategory === 'trending') {
      result = result.filter((p) => p.isTrending || p.badge?.includes('Trending'));
    } else if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#171513] flex flex-col font-sans selection:bg-[#C69A4A]/20 selection:text-[#171513]">

      {/* MAIN NAVIGATION HEADER */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => {
          setCartCheckoutMode(false);
          setCartOpen(true);
        }}
        onOpenWishlist={() => setWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={(cat) => setActiveCategory(cat as CategoryType)}
        activeCategory={activeCategory}
      />

      {/* 3. HERO EDITORIAL BANNER matching reference */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. CATEGORY NAVIGATION SHELF & PROMO CARD matching reference */}
      <CategoryNavSection
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 5. LATEST ARRIVALS COLLECTION matching reference */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full py-10 sm:py-14 scroll-mt-20">

        {/* Centered Collection Header with Accent Lines & View All Button matching reference */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 sm:mb-12 gap-4">
          {/* Desktop Left Spacer to balance View All button */}
          <div className="hidden md:block w-36" />

          {/* Centered Heading with thin gold lines */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C69A4A] font-semibold">
              <span className="w-8 sm:w-12 h-[1px] bg-[#C69A4A]" />
              <span>Our Collection</span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#C69A4A]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#171513] tracking-tight">
              Latest Arrivals
            </h2>
          </div>

          {/* Right: View All Products Button matching reference */}
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-[#171513] hover:bg-[#2b2724] text-[#FAF7F2] text-xs font-medium rounded-full shadow-xs transition-all flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards: 4 Columns on Desktop, 2 Columns on Mobile matching reference */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="font-serif text-2xl font-light text-[#171513]">
              No pieces found matching your criteria.
            </p>
            <p className="text-xs text-[#78716C] max-w-sm mx-auto">
              Try adjusting your search terms or view our full collection across all atelier categories.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 px-6 py-2.5 bg-[#171513] text-[#FAF7F2] rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                isWishlisted={isProductWishlisted(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={setSelectedProduct}
                onAddToCart={(prod, size, col) => handleAddToCart(prod, size, col, 1)}
              />
            ))}
          </div>
        )}

      </main>

      {/* 6. HORIZONTAL 4-PILLAR VALUE / TRUST STRIP matching reference */}
      <TrustSection />

      {/* 7. BOTTOM "SHOP WITH CONFIDENCE" WHATSAPP BANNER matching reference */}
      <ShopWithConfidenceBanner />

      {/* 8. PHYSICAL BOUTIQUE BRANCHES SECTION WITH ICONS */}
      <LocationsSection />

      {/* 10. INSTAGRAM SHOWCASE */}
      <InstagramGrid />

      {/* 11. FOOTER */}
      <Footer />

      {/* 12. FLOATING RIGHT-SIDE ACTIONS matching reference (Wishlist, Cart with Badge, Scroll Top) */}
      <FloatingActions
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => {
          setCartCheckoutMode(false);
          setCartOpen(true);
        }}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* Interactive Modals & Drawers */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isWishlisted={selectedProduct ? isProductWishlisted(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onDirectCheckout={handleDirectCheckout}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* Slide-Over Bag / Drawer with WhatsApp Branch Ordering */}
      <CartDrawer
        isOpen={cartOpen}
        initialCheckoutMode={cartCheckoutMode}
        onClose={() => {
          setCartOpen(false);
          setCartCheckoutMode(false);
        }}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onQuickView={setSelectedProduct}
        onAddToCart={(p) => handleAddToCart(p, p.sizes[0], p.colors[0], 1)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#171513] text-[#FAF7F2] px-4 py-3 rounded border border-[#C69A4A]/50 shadow-2xl flex items-center gap-2.5 text-xs tracking-wide animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#C69A4A] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
