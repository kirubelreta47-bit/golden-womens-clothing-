import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CategoryType } from '../types/store';

interface CategoryNavSectionProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryNavSection: React.FC<CategoryNavSectionProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories: {
    id: CategoryType;
    label: string;
    image: string;
  }[] = [
    {
      id: 'dresses',
      label: 'Dresses',
      image: '/images/category-dresses.jpg',
    },
    {
      id: 'tops',
      label: 'Tops',
      image: '/images/category-tops.jpg',
    },
    {
      id: 'coords', // maps to Trousers / Co-ords
      label: 'Trousers',
      image: '/images/category-trousers.jpg',
    },
    {
      id: 'coords', // or skirts
      label: 'Skirts',
      image: '/images/category-skirts.jpg',
    },
    {
      id: 'outerwear', // or Bags
      label: 'Bags',
      image: '/images/category-bags.jpg',
    },
    {
      id: 'trending', // Accessories
      label: 'Accessories',
      image: '/images/category-accessories.jpg',
    },
  ];

  const handleCategoryClick = (catId: CategoryType) => {
    onSelectCategory(catId);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreNewArrivals = () => {
    onSelectCategory('trending');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 sm:py-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left/Center: 6 Circular Category Navigation Items matching reference */}
          <div className="lg:col-span-8 flex items-center justify-between overflow-x-auto pb-2 scrollbar-none gap-4 sm:gap-6">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={`${cat.label}-${idx}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="group flex flex-col items-center gap-2.5 shrink-0 cursor-pointer text-center"
                >
                  {/* Circular Image Container with soft cream border */}
                  <div className={`w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full overflow-hidden bg-[#F5EFE9] border-2 transition-all duration-300 flex items-center justify-center p-1.5 shadow-xs ${
                    isActive
                      ? 'border-[#C69A4A] ring-2 ring-[#C69A4A]/30 scale-105'
                      : 'border-[#EAE3D8] group-hover:border-[#C69A4A] group-hover:scale-105'
                  }`}>
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Category Label */}
                  <span className={`text-xs sm:text-sm font-serif transition-colors ${
                    isActive
                      ? 'text-[#171513] font-semibold'
                      : 'text-[#171513] group-hover:text-[#C69A4A]'
                  }`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: New Arrivals Promotional Card matching reference */}
          <div className="lg:col-span-4">
            <div
              onClick={handleExploreNewArrivals}
              className="group relative bg-[#F7EFE6] hover:bg-[#F3E7DC] border border-[#EAE3D8] rounded-2xl p-5 sm:p-6 flex items-center justify-between overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer h-full min-h-[120px]"
            >
              {/* Left text & Hanger Icon */}
              <div className="space-y-1.5 z-10">
                {/* Decorative Hanger Icon matching reference */}
                <svg
                  className="w-5 h-5 text-[#C69A4A]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4" />
                  <path d="M2 17l10-6 10 6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
                </svg>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#171513] tracking-tight">
                  New Arrivals
                </h3>

                <p className="text-xs text-[#78716C] font-light">
                  Fresh styles just in!
                </p>

                <div className="pt-1 flex items-center gap-1 text-xs font-semibold text-[#171513] group-hover:text-[#C69A4A] transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Right: Model Photo with rounded cutout */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#EAE3D8] bg-[#FAF7F2]">
                <img
                  src="/images/promo-arrivals.jpg"
                  alt="New Arrivals Promo"
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

