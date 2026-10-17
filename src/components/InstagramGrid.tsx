import React from 'react';
import { Instagram, Heart, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/products';
import { STORE_CONTACTS } from '../utils/orderLinks';

export const InstagramGrid: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E7E2D8]">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>Digital Lookbook</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1917]">
              Seen on Instagram
            </h2>
          </div>

          <a
            href={`https://instagram.com/${STORE_CONTACTS.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#1C1917] hover:text-[#C5A880] font-medium transition-colors"
          >
            <span>@{STORE_CONTACTS.instagramHandle}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Portrait Grid with Mobile Horizontal Sliding */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 sm:pb-0 scrollbar-none sm:grid sm:grid-cols-4 sm:gap-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={`https://instagram.com/${STORE_CONTACTS.instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-[240px] snap-center sm:w-auto group relative aspect-[3/4] bg-[#F2EFE9] rounded-sm overflow-hidden border border-[#E7E2D8] block shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Dark Overlay with Caption */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <span className="flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                    <Heart className="w-3 h-3 fill-current text-rose-400" />
                    <span>{post.likes}</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#C5A880] font-medium">
                    {post.productTag}
                  </p>
                  <p className="text-xs text-stone-200 line-clamp-3 font-light leading-snug">
                    {post.caption}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#78716C]">
            Tag <strong className="text-[#1C1917]">#GoldenAtelier</strong> or mention <strong className="text-[#1C1917]">@{STORE_CONTACTS.instagramHandle}</strong> to be featured in our seasonal curation.
          </p>
        </div>

      </div>
    </section>
  );
};
