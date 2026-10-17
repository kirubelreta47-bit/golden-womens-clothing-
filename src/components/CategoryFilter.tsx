import React from 'react';
import { CategoryType } from '../types/store';
import { Sparkles, SlidersHorizontal, X } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalFilteredCount: number;
  searchQuery: string;
  onClearSearch: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalFilteredCount,
  searchQuery,
  onClearSearch,
}) => {
  const tabs: { label: string; value: CategoryType }[] = [
    { label: 'All Pieces', value: 'all' },
    { label: 'Dresses', value: 'dresses' },
    { label: 'Co-ords & Sets', value: 'coords' },
    { label: 'Tops & Blouses', value: 'tops' },
    { label: 'Outerwear', value: 'outerwear' },
    { label: 'Trending on IG', value: 'trending' },
  ];

  return (
    <div id="catalog-section" className="pt-10 pb-6 border-b border-[#E7E2D8] space-y-4">
      {/* Category Pills & Sorting Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => onSelectCategory(tab.value)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1917] text-[#FBF9F5] shadow-sm font-medium'
                    : 'bg-[#F2EFE9] text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE4D9]'
                }`}
              >
                {tab.value === 'trending' && (
                  <Sparkles className="w-3 h-3 text-[#C5A880] inline mr-1 -mt-0.5" />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right side: Count & Sort dropdown */}
        <div className="flex items-center justify-between md:justify-end gap-4 text-xs text-[#78716C]">
          <span className="font-mono text-[11px]">
            Showing <strong>{totalFilteredCount}</strong> {totalFilteredCount === 1 ? 'piece' : 'pieces'}
          </span>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-[#F2EFE9] border border-[#E7E2D8] rounded px-2.5 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Search Filter Badge */}
      {searchQuery && (
        <div className="flex items-center gap-2 text-xs bg-[#F2EFE9] p-2.5 rounded border border-[#C5A880]/30 w-fit">
          <span className="text-[#78716C]">Filtered by search:</span>
          <span className="font-semibold text-[#1C1917]">"{searchQuery}"</span>
          <button
            onClick={onClearSearch}
            className="p-1 hover:text-rose-600 transition-colors ml-1"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
