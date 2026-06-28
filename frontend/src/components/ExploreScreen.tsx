/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Heart, User, CheckCircle2, ChevronRight, SlidersHorizontal, ArrowUpDown, Plus, ShieldAlert } from 'lucide-react';
import { Product } from '../types';

interface ExploreScreenProps {
  products: Product[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (screen: 'search-discovery' | 'profile' | 'saved-items') => void;
  onOpenSellModal: () => void;
  searchQueryState: string;
  setSearchQueryState: (q: string) => void;
  selectedCategoryState: string;
  setSelectedCategoryState: (c: string) => void;
  reportedProductIds?: string[];
  isDarkMode?: boolean;
  recentlyViewedIds?: string[];
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  products,
  savedIds,
  onToggleSave,
  onSelectProduct,
  onNavigate,
  onOpenSellModal,
  searchQueryState,
  setSearchQueryState,
  selectedCategoryState,
  setSelectedCategoryState,
  reportedProductIds = [],
  isDarkMode = false,
  recentlyViewedIds = []
}) => {
  const categoriesList = [
    { name: 'Textbooks', icon: '📖' },
    { name: 'Electronics', icon: '💻' },
    { name: 'Dorm Gear', icon: '🛏️' },
    { name: 'Bicycles', icon: '🚲' },
    { name: 'Furniture', icon: '🪑' },
    { name: 'Clothing', icon: '👕' }
  ];

  // Derive recently viewed products in order of recency
  const recentlyViewedProducts = recentlyViewedIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => !!p);

  // Dynamic search input submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('search-discovery');
  };

  return (
    <div className={`w-full min-h-screen pb-24 pt-20 px-4 max-w-[1280px] mx-auto animate-fade-in transition-colors duration-300 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      {/* Search Input Bar */}
      <section className="mt-4 mb-6">
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl mx-auto flex items-center">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input 
            className={`w-full pl-12 pr-24 py-3.5 shadow-sm rounded-2xl font-medium text-sm focus:outline-none transition-all ${
              isDarkMode 
                ? 'bg-slate-900 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-[#F39C12]/20 focus:border-[#F39C12]' 
                : 'bg-white border border-[#E2E8F0] text-slate-900 focus:ring-2 focus:ring-[#1A2B4C]/20 focus:border-[#1A2B4C]'
            }`} 
            placeholder="Search textbooks, tech, and more..." 
            type="text"
            value={searchQueryState}
            onChange={(e) => setSearchQueryState(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute inset-y-1.5 right-2 px-5 bg-[#F39C12] hover:bg-[#F39C12]/95 text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-sm"
          >
            Search
          </button>
        </form>
      </section>

      {/* Categories Quick Slider */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`font-bold text-base tracking-tight font-display ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>Browse Categories</h2>
          <button 
            onClick={() => {
              setSelectedCategoryState('');
              onNavigate('search-discovery');
            }} 
            className="text-xs font-semibold text-[#3498DB] hover:underline"
          >
            View All
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {categoriesList.map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                setSelectedCategoryState(cat.name);
                onNavigate('search-discovery');
              }}
              className="flex-shrink-0 group cursor-pointer"
            >
              <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center mb-1.5 group-hover:scale-105 transition-all text-2xl shadow-xs border ${
                isDarkMode ? 'bg-[#1E293B] border-slate-800' : 'bg-white border-[#E2E8F0]'
              }`}>
                {cat.icon}
              </div>
              <p className={`text-center text-[11px] font-semibold block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Bento Style Banner Grid */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main large banner */}
        <div className={`md:col-span-2 relative h-48 md:h-64 rounded-2xl overflow-hidden flex items-center p-6 md:p-8 group shadow-md transition-colors ${
          isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-[#1A2B4C]'
        }`}>
          {/* Background textbook opacity */}
          <div 
            className="absolute right-0 top-0 w-1/2 h-full opacity-30 group-hover:opacity-40 transition-opacity bg-cover bg-center hidden sm:block" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzFq40u-o4ZIU6svpg-IvTY5QC24dKtx80uXcp8cQyNufBxX2vgjX1nnV1qMXzo_s5v-ykUly64i1GRYQm4IGvAmDBajbf6nrWZsaUKZMD_bPw588g02x1TSaoVw_cVE08dQE2H8AeM8gy-rlFbesYETYXKCf4Fma8SdnOsqqHU1XBDNY1oNqc4IrCgDmgqcLi56J9zX5iIOtgvvFYTW88kR0awUKaYyZMPiQdeJ1ST6mKnhVYQrUVEDQ68kS7ww0p_fHqQqNiYg')" }}
          />
          <div className="z-10 max-w-sm">
            <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-2 leading-snug">Sell your old textbooks</h3>
            <p className="text-slate-300 text-xs md:text-sm mb-6 leading-relaxed">
              Connect with thousands of students looking for your exact courses. Fast, safe, and campus-verified.
            </p>
            <button 
              onClick={onOpenSellModal}
              className="px-6 py-2.5 bg-[#F39C12] hover:bg-[#F39C12]/90 text-white text-xs font-bold rounded-xl active:scale-95 transition-all shadow-md"
            >
              List Now
            </button>
          </div>
        </div>

        {/* Small badge card */}
        <div className="h-48 md:h-64 rounded-2xl overflow-hidden bg-[#2ECC71] relative p-6 flex flex-col justify-end shadow-md">
          <div className="z-10 text-white">
            <ShieldAlert className="w-8 h-8 text-white mb-3" />
            <h3 className="text-lg font-bold font-display leading-tight mb-1">Verified Student Safety</h3>
            <p className="text-slate-100 text-xs leading-relaxed opacity-95">
              Only @university.edu emails allowed. Buy & sell with confidence among peers.
            </p>
          </div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Recently Viewed Section */}
      {recentlyViewedProducts.length > 0 && (
        <section className="mb-8 animate-fade-in">
          <h2 className={`font-bold text-base font-display mb-4 ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>
            Recently Viewed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentlyViewedProducts.map((item) => {
              const isSaved = savedIds.includes(item.id);
              const isReported = reportedProductIds.includes(item.id);
              return (
                <div
                  key={`recent-${item.id}`}
                  onClick={() => onSelectProduct(item)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] ${
                    isDarkMode 
                      ? 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:shadow-lg' 
                      : 'bg-white hover:bg-slate-50 border-[#E2E8F0] hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  {/* Small compact image */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                    <img 
                      className={`object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 ${
                        isReported ? 'blur-xs opacity-60' : ''
                      }`} 
                      src={item.image} 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Simple text info */}
                  <div className="flex-grow min-w-0">
                    <h4 className={`font-bold text-xs line-clamp-1 group-hover:text-[#F39C12] transition-colors ${
                      isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'
                    }`}>
                      {item.title}
                    </h4>
                    <p className="text-xs font-bold text-[#F39C12] mt-0.5">
                      Rs. {item.price.toFixed(0)}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400">
                      <span>{item.condition}</span>
                      <span>•</span>
                      <span className="truncate">{item.category}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F39C12] flex-shrink-0 transition-all group-hover:translate-x-0.5" />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Product Grid section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`font-bold text-base font-display ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>Recent Listings</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => onNavigate('search-discovery')}
              className={`p-2 border rounded-lg transition-all flex items-center justify-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850' : 'bg-white border-[#E2E8F0] text-slate-600 hover:bg-slate-50'
              }`}
              title="Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('search-discovery')}
              className={`p-2 border rounded-lg transition-all flex items-center justify-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850' : 'bg-white border-[#E2E8F0] text-slate-600 hover:bg-slate-50'
              }`}
              title="Sort"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Cards Layout Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((item) => {
            const isSaved = savedIds.includes(item.id);
            const isReported = reportedProductIds.includes(item.id);
            return (
              <div 
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full group ${
                  isReported 
                    ? 'border-red-500/20 opacity-70 bg-red-950/10 hover:shadow-sm' 
                    : isDarkMode 
                      ? 'bg-[#1E293B] border-slate-800/80 hover:shadow-lg shadow-sm hover:border-slate-700' 
                      : 'bg-white border-[#E2E8F0] hover:shadow-md shadow-xs'
                }`}
              >
                {/* Product Image Frame */}
                <div className="aspect-square relative overflow-hidden bg-slate-100">
                  <img 
                    onClick={() => onSelectProduct(item)}
                    className={`object-cover w-full h-full transition-transform duration-300 group-hover:scale-103 ${
                      isReported ? 'blur-xs opacity-60' : ''
                    }`} 
                    src={item.image} 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                  />
                  {/* Price Tag badge */}
                  <div className={`absolute top-2 right-2 backdrop-blur-sm px-2 py-1 rounded-lg shadow-xs ${
                    isDarkMode ? 'bg-slate-950/85 text-slate-100 border border-slate-800' : 'bg-white/90 text-[#1A2B4C]'
                  }`}>
                    <span className="text-xs font-bold">Rs. {item.price.toFixed(0)}</span>
                  </div>
                  {isReported && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
                      <ShieldAlert className="w-3 h-3 text-white" />
                      Flagged
                    </div>
                  )}
                  {/* Bookmark Heart trigger */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(item.id);
                    }}
                    className={`absolute bottom-2 right-2 p-1.5 rounded-full shadow-md backdrop-blur-sm transition-transform active:scale-90 ${
                      isSaved 
                        ? 'bg-red-50 text-[#E74C3C]' 
                        : isDarkMode 
                          ? 'bg-slate-950/85 text-slate-400 hover:text-slate-200 border border-slate-800' 
                          : 'bg-white/90 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Details Footer */}
                <div className="p-3 flex flex-col flex-grow justify-between">
                  <div onClick={() => onSelectProduct(item)}>
                    <h4 className={`font-bold text-xs line-clamp-1 mb-1 tracking-tight transition-colors group-hover:text-[#F39C12] ${
                      isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'
                    }`}>{item.title}</h4>
                    
                    <div className="flex items-center gap-1.5 mb-2">
                      {item.isVerifiedStudent ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71] fill-current" />
                          <span className="text-[10px] font-semibold text-slate-400">Verified Student</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-[10px] font-semibold text-slate-400">Basic Member</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className={`flex items-center justify-between border-t pt-2 text-[10px] text-slate-400 font-medium ${
                    isDarkMode ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <span>{item.postedTime}</span>
                    <span className="text-slate-500 font-normal">|</span>
                    <span>{item.condition}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Trigger */}
        <div className="pt-8 pb-4 flex justify-center">
          <button 
            onClick={() => onNavigate('search-discovery')}
            className={`px-6 py-2.5 border-2 text-xs font-bold rounded-full transition-all duration-200 ${
              isDarkMode 
                ? 'border-[#F39C12] text-[#F39C12] hover:bg-[#F39C12] hover:text-slate-950' 
                : 'border-[#1A2B4C] text-[#1A2B4C] hover:bg-[#1A2B4C] hover:text-white'
            }`}
          >
            Load More Items
          </button>
        </div>
      </section>

      {/* Floating Action Button for Desktop Posting */}
      <div className="hidden md:flex fixed bottom-24 right-8 z-50">
        <button 
          onClick={onOpenSellModal}
          className="flex items-center gap-2 bg-[#F39C12] hover:opacity-95 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 group font-bold text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Listing</span>
        </button>
      </div>
    </div>
  );
};
