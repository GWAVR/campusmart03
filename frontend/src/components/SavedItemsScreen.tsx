/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Search, SlidersHorizontal, Heart, CheckCircle2, Bookmark, Star } from 'lucide-react';
import { Product } from '../types';

interface SavedItemsScreenProps {
  products: Product[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
  onNavigate: (screen: 'explore' | 'search-discovery') => void;
  isDarkMode?: boolean;
}

export const SavedItemsScreen: React.FC<SavedItemsScreenProps> = ({
  products,
  savedIds,
  onToggleSave,
  onSelectProduct,
  onBack,
  onNavigate,
  isDarkMode = false
}) => {
  const [localSearch, setLocalSearch] = useState('');

  // Collect actual saved products from state lists
  const savedProducts = products.filter((item) => savedIds.includes(item.id));

  // Filter bookmarked list with input query immediately
  const filteredSaved = savedProducts.filter((item) => {
    if (!localSearch.trim()) return true;
    const q = localSearch.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  return (
    <div className={`w-full min-h-screen pb-24 animate-fade-in transition-colors duration-300 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      {/* Top Header navbar fixed */}
      <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b px-4 h-16 shadow-xs flex justify-between items-center transition-colors ${
        isDarkMode ? 'bg-[#0F172A]/90 border-slate-800' : 'bg-white/90 border-[#E2E8F0]'
      }`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className={`p-2 rounded-full transition-colors active:scale-95 ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-[#1A2B4C]'
            }`}
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className={`font-bold text-base font-display ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>Saved Items</h1>
        </div>
        <button className={`p-2 rounded-full transition-colors active:scale-95 ${
          isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-[#1A2B4C]'
        }`}>
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Main Panel Content container */}
      <main className="pt-20 px-4 max-w-[1280px] mx-auto">
        
        {/* Local search input specifically for saved items */}
        <section className="mb-4">
          <div className="relative flex items-center w-full">
            <span className="absolute left-4 text-slate-400">
              <Search className="w-4.5 h-4.5" />
            </span>
            <input 
              className={`w-full pl-11 pr-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs outline-none focus:ring-2 transition-all ${
                isDarkMode 
                  ? 'bg-slate-900 border border-slate-800 text-slate-100 focus:ring-[#F39C12]/20' 
                  : 'bg-white border border-[#E2E8F0] text-slate-900 focus:ring-[#1A2B4C]/25'
              }`} 
              placeholder="Search saved items..." 
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
        </section>

        {/* Bookmark Stats count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-400 font-semibold">{filteredSaved.length} items bookmarked</p>
          <button className={`flex items-center gap-1 font-bold text-xs ${isDarkMode ? 'text-[#F39C12]' : 'text-[#1A2B4C]'}`}>
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>

        {filteredSaved.length === 0 ? (
          /* Bookmark Empty State layout */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 text-slate-400 ${
              isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
            }`}>
              <Bookmark className="w-14 h-14" />
            </div>
            <h2 className={`font-bold text-base mb-2 font-display ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>No saved items yet</h2>
            <p className="text-slate-400 text-xs max-w-xs leading-relaxed font-semibold">
              Start browsing and tap the heart icon on listings to save items you're interested in.
            </p>
            <button 
              onClick={() => onNavigate('explore')}
              className={`mt-6 px-6 py-2.5 font-bold text-xs rounded-xl shadow-md active:scale-95 transition-transform ${
                isDarkMode ? 'bg-[#F39C12] text-slate-950' : 'bg-[#1A2B4C] text-white'
              }`}
            >
              Explore Marketplace
            </button>
          </div>
        ) : (
          /* High fidelity Grid Cards list */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSaved.map((item) => (
              <div 
                key={item.id}
                className={`rounded-xl border shadow-xs overflow-hidden group hover:shadow-md transition-all flex flex-col h-full cursor-pointer justify-between ${
                  isDarkMode ? 'bg-[#1E293B] border-slate-800 hover:border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                {/* Image panel frame */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img 
                    onClick={() => onSelectProduct(item)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103" 
                    src={item.image} 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                  />
                  {/* Heart control button toggles active state */}
                  <button 
                    onClick={() => onToggleSave(item.id)}
                    className={`absolute top-2 right-2 p-1.5 backdrop-blur-xs rounded-full shadow-md text-[#E74C3C] hover:scale-110 active:scale-95 transition-all ${
                      isDarkMode ? 'bg-slate-950/80 border border-slate-800' : 'bg-white/90'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                {/* Details Footer information */}
                <div 
                  onClick={() => onSelectProduct(item)}
                  className="p-3 flex flex-col flex-grow justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {item.isVerifiedStudent ? (
                        <div className="bg-[#2ECC71]/15 text-[#2ECC71] px-2 py-0.5 rounded-full flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-2.5 h-2.5 fill-current" />
                          Verified
                        </div>
                      ) : (
                        <div className="bg-[#F39C12]/15 text-[#F39C12] px-2 py-0.5 rounded-full flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          Featured
                        </div>
                      )}
                    </div>
                    <h3 className={`font-bold text-xs line-clamp-2 leading-tight group-hover:text-[#F39C12] transition-colors ${
                      isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'
                    }`}>{item.title}</h3>
                  </div>

                  <div className="mt-3">
                    <p className={`text-sm font-extrabold ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>Rs. {item.price.toFixed(0)}</p>
                    <p className="text-[10px] text-slate-450 mt-1 font-semibold">{item.postedTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
