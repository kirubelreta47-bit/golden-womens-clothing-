/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CategoryType, Currency, ProductColor } from './types/store';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { TrustSection } from './components/TrustSection';
import { InstagramGrid } from './components/InstagramGrid';
import { Footer } from './components/Footer';
import { Sparkles, MessageCircle, Send } from 'lucide-react';
import { STORE_CONTACTS } from './utils/orderLinks';

export default function App() {
  // Store Global State
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart & Wishlist Storage
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

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

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.priceETB - b.priceETB);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceETB - a.priceETB);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // 'featured'
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#C5A880]/20 selection:text-[#1C1917]">
      
      {/* 1. Minimalist Header with Brand Logo */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat as CategoryType)}
        activeCategory={activeCategory}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* 2. Hero Editorial Section (Full-bleed luxury background design on mobile) */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full pb-20">
        
        {/* 3. Category Tabs, Search, and Catalog Sort Bar */}
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalFilteredCount={filteredProducts.length}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* 4. Product Collection: Horizontal Sliding on Mobile, Grid on Tablet/Desktop */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="font-serif text-2xl font-light text-[#1C1917]">
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
              className="mt-2 px-6 py-2.5 bg-[#1C1917] text-[#FBF9F5] rounded text-xs uppercase tracking-wider font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-4 sm:mt-8">
            {/* Mobile horizontal swipe indicator */}
            <div className="flex sm:hidden items-center justify-between text-[11px] text-[#78716C] mb-2 px-1">
              <span className="flex items-center gap-1.5 text-[#C5A880] font-medium uppercase tracking-wider text-[10px]">
                <Sparkles className="w-3 h-3 text-[#C5A880]" />
                <span>Swipe pieces horizontally</span>
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                {filteredProducts.length} pieces • Slide →
              </span>
            </div>

            {/* Horizontal Swipe Carousel on Mobile, Responsive Grid on Desktop */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 sm:pb-0 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 -mx-4 px-4 sm:mx-0 sm:px-0">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="shrink-0 w-[275px] xs:w-[295px] snap-center sm:w-auto"
                >
                  <ProductCard
                    product={product}
                    isWishlisted={isProductWishlisted(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={setSelectedProduct}
                    onAddToCart={(prod, size, col) => handleAddToCart(prod, size, col, 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 8. Trust & Atelier Perks */}
      <TrustSection />

      {/* 9. Seen on Instagram Showcase */}
      <InstagramGrid />

      {/* 10. Footer */}
      <Footer />

      {/* Floating Fast Chat Button (Bottom Right) */}
      <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-2.5 items-end">
        <a
          href={`https://wa.me/${STORE_CONTACTS.whatsappNumber}?text=${encodeURIComponent(
            'Hello Golden Atelier! I am visiting your web store and would like to ask a question regarding size, availability, or custom ordering.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#1C1917] text-white hover:bg-[#25D366] rounded-full shadow-2xl border border-[#C5A880]/40 transition-all duration-300"
          aria-label="Direct WhatsApp Concierge"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] group-hover:text-white transition-colors" />
          <span className="text-[11px] sm:text-xs uppercase tracking-wider font-medium pr-1 hidden sm:inline">
            Stylist Chat
          </span>
        </a>
      </div>

      {/* Interactive Modals & Drawers */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isWishlisted={selectedProduct ? isProductWishlisted(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* Slide-Over Bag / Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
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
        <div className="fixed bottom-6 left-6 z-50 bg-[#1C1917] text-[#FBF9F5] px-4 py-3 rounded border border-[#C5A880]/50 shadow-2xl flex items-center gap-2.5 text-xs tracking-wide animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
