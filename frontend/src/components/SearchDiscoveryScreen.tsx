/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ArrowLeft, X, Heart, SlidersHorizontal, ChevronDown, CheckCircle2, Award, History, TrendingUp } from 'lucide-react';
import { Product } from '../types';

interface SearchDiscoveryScreenProps {
  products: Product[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
  searchQueryState: string;
  setSearchQueryState: (q: string) => void;
  selectedCategoryState: string;
  setSelectedCategoryState: (c: string) => void;
  isDarkMode?: boolean;
}

export const SearchDiscoveryScreen: React.FC<SearchDiscoveryScreenProps> = ({
  products,
  savedIds,
  onToggleSave,
  onSelectProduct,
  onBack,
  searchQueryState,
  setSearchQueryState,
  selectedCategoryState,
  setSelectedCategoryState,
  isDarkMode = false
}) => {
  const [activeCondition, setActiveCondition] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  
  // Suggested Mock Categories with pre-linked beautiful images
  const suggestedCategories = [
    { name: 'Lab Gear', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuoybnkvzGfBb74fcC6eh5n-cXTmvq3CWDHusYLWAwAAM6UnGI2PMn6bZHj_oj18RSIFbqU56C1Zs8tc69KPe8obvltMXDpdqfAr8uxIFTiEnUkwUQ6hEkrAxmliy9r71gZJPoG6CoshZgdX2hJjCzSmloABhYJUC0038LRE4mKZ9ptYI6CIBtXAgjYII0imoV8KvigX6mP335I8_eiXg_4MlZCJTENdypDhv8URtFCACRVqqyFlGk13S-04BbIMVM8fqKRo8r7Q' },
    { name: 'Calculators', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVp9oWC1s-fFq9jAhD60uaFeyc6WM6lGtcpcF8Z4cg3tC9jADKYnZyZ2edFiXDNLyc43t5I-dA6oyytc5jWCZvS0_wTJDEpl5LkOq6JUQFGSfcBYRvCouN9lzDWdkNOuLKj8vx0ckB8x9iTgrXgG0SuveyBrgb8N2L8hWJ5q4c37NoGur401RR2Tvo-1JONwR86iA2-IRY89Nb8PYz8-l3I2MCxNrJ6IRk_VMbFai1G_Yzb-cmcb55Ni7tjcz7dZ2VGpSHbHvQCQ' },
    { name: 'Dorm Decor', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWwYtoXjsn8Dkk214SJShYlqeK4ymxebOvZ5MXHGgNbyEuNOS1iampWLBkSDYH6lufnPq1nPV99fY0YGAVIAVftC54T2ewOD3rFPAZCCQF-uEKUEi90UTolsfmlT5f3uBVFNdRJMQCF07U0xhx4Fh_3O1tmaa1-ck-J_k0XN3uB2YtHVU46-TJXa_2bqSOJ_nrHvwYsrjgHRBgYLoxRUl_o3lNG7Fo9X2v-6eChXeyiTAotMYn_Hcg6wTLrfAEqA_bB01CHwI6ng' },
    { name: 'Furniture', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxoQaWp5JJstxjrpXHHNzFD-gqeXmvgNcEwvM7XiGuiU_bicJrdiUXnAhjJBdGDPQjE5oRiRnl58q2ElfHGUg1THc1DARMWTWX7VkCzLv_hzjiP5bnx0HZQcXzui7sA2AvkNyeuKLeuMJz0sTrRNg5QN4vS5le0WS0Csr5suF9l0gQCURLuQenGN1XhZGQzKcLZQisfV3JHotY576yoFc6YpFbJzLut0_jkDT-k4VWfjsTmsUW1LKYKbb2ncMNUCXfTn662rhb0Q' }
  ];

  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Organic Chemistry 2nd Edition',
    'TI-84 Plus CE Calculator',
    'Ergonomic Office Chair'
  ]);

  // Handle Dynamic Filtering
  const filteredProducts = products.filter((item) => {
    // Search Query match
    if (searchQueryState.trim()) {
      const q = searchQueryState.toLowerCase();
      const inTitle = item.title.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      const inCat = item.category.toLowerCase().includes(q);
      if (!inTitle && !inDesc && !inCat) return false;
    }

    // Category match
    if (selectedCategoryState && item.category !== selectedCategoryState) {
      // Allow minor lookup adjustments (e.g. Lab Gear matches Textbooks or Kitchen etc.)
      const isLabGearCategory = selectedCategoryState === 'Lab Gear' && item.category === 'Textbooks';
      const isCalculatorsCategory = selectedCategoryState === 'Calculators' && item.category === 'Kitchen';
      const isDormDecorCategory = selectedCategoryState === 'Dorm Decor' && item.category === 'Dorm Gear';
      if (!isLabGearCategory && !isCalculatorsCategory && !isDormDecorCategory && item.category !== selectedCategoryState) {
        return false;
      }
    }

    // Price range match via sliders
    if (item.price < minPrice || item.price > maxPrice) {
      return false;
    }

    // Condition match
    if (activeCondition && item.condition !== activeCondition) {
      return false;
    }

    return true;
  });

  const clearAllSearches = () => {
    setRecentSearches([]);
  };

  const removeSearchItem = (search: string) => {
    setRecentSearches(recentSearches.filter((item) => item !== search));
  };

  return (
    <div className={`w-full min-h-screen pb-24 animate-fade-in transition-colors duration-300 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      {/* Fixed Search Header */}
      <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b px-4 py-3 transition-colors ${
        isDarkMode ? 'bg-[#0F172A]/90 border-slate-800' : 'bg-white/90 border-[#E2E8F0]'
      }`}>
        <div className="max-w-[1280px] mx-auto flex items-center gap-3">
          <button 
            onClick={onBack}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors active:scale-95 ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-[#1A2B4C]'
            }`}
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative flex-grow">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4.5 h-4.5" />
            </span>
            <input 
              className={`w-full rounded-xl py-2.5 pl-10 pr-10 focus:outline-none transition-all text-xs font-semibold ${
                isDarkMode 
                  ? 'bg-slate-900 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-[#F39C12]/20 focus:border-[#F39C12]' 
                  : 'bg-slate-50 border border-[#E2E8F0] text-slate-800 focus:ring-2 focus:ring-[#1A2B4C]/25 focus:border-[#1A2B4C] focus:bg-white'
              }`} 
              placeholder="Search textbooks, dorm decor, gear..." 
              type="text"
              value={searchQueryState}
              onChange={(e) => setSearchQueryState(e.target.value)}
              autoFocus
            />
            {searchQueryState && (
              <button 
                onClick={() => setSearchQueryState('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container below Header scroll frame */}
      <main className="mt-20 px-4 max-w-[1280px] mx-auto">
        
        {/* Filter Chips row slider */}
        <section className="mt-4 flex flex-col md:flex-row md:items-center gap-4 py-1">
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => {
                setActiveCondition('');
                setMinPrice(0);
                setMaxPrice(500);
                setSelectedCategoryState('');
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#F39C12] hover:bg-[#F39C12]/90 text-slate-950 rounded-full text-xs font-bold whitespace-nowrap shadow-xs active:scale-95 duration-150"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Reset Filters
            </button>

            {/* Condition dropdown filter chip helper */}
            <select 
              value={activeCondition} 
              onChange={(e) => setActiveCondition(e.target.value)}
              className={`flex items-center gap-1 px-3 py-1.5 border rounded-full text-xs font-bold outline-none bg-none appearance-none ${
                isDarkMode ? 'bg-[#1E293B] border-slate-800 text-slate-200' : 'bg-white border-[#E2E8F0] text-[#1A2B4C]'
              }`}
            >
              <option value="">Condition</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Used">Used</option>
            </select>
          </div>

          {/* Range Sliders for Price */}
          <div className={`flex-grow border rounded-2xl p-4 shadow-xs transition-colors ${
            isDarkMode ? 'bg-[#1E293B] border-slate-800 text-slate-100' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className={`text-xs font-bold font-display ${isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}`}>Filter by Price (Rs.)</span>
              <span className="text-xs font-extrabold text-[#F39C12] bg-[#F39C12]/10 px-2.5 py-1 rounded-md self-start sm:self-auto">
                Rs. {minPrice} - Rs. {maxPrice}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Min Price Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 w-16">Min Price:</span>
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  step="5"
                  value={minPrice} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val <= maxPrice) {
                      setMinPrice(val);
                    }
                  }}
                  className={`flex-grow h-1.5 rounded-lg appearance-none cursor-pointer accent-[#F39C12] ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                />
                <span className={`text-[11px] font-bold w-14 text-right ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Rs. {minPrice}</span>
              </div>

              {/* Max Price Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 w-16">Max Price:</span>
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  step="5"
                  value={maxPrice} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= minPrice) {
                      setMaxPrice(val);
                    }
                  }}
                  className={`flex-grow h-1.5 rounded-lg appearance-none cursor-pointer accent-[#F39C12] ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                />
                <span className={`text-[11px] font-bold w-14 text-right ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Rs. {maxPrice}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Section showing matching search items, or Suggested categories if query is empty */}
        {searchQueryState.trim() || selectedCategoryState ? (
          /* Search results listing matching dynamic criteria */
          <section className="mt-8 mb-12">
            <h2 className={`font-bold text-base mb-4 font-display ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>
              Search Results ({filteredProducts.length})
            </h2>
            
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-slate-400 text-sm font-medium">No results found matching your filters.</p>
                <p className="text-slate-400 text-xs mt-1">Try refining your search keyword or clearing the filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredProducts.map((item) => {
                  const isSaved = savedIds.includes(item.id);
                  return (
                    <article 
                      key={item.id}
                      onClick={() => onSelectProduct(item)}
                      className={`group rounded-2xl overflow-hidden border shadow-xs transition-all cursor-pointer flex flex-col justify-between ${
                        isDarkMode ? 'bg-[#1E293B] border-slate-800 hover:border-slate-700' : 'bg-white border-[#E2E8F0] hover:shadow-md'
                      }`}
                    >
                      <div className="aspect-square relative overflow-hidden bg-slate-50">
                        <img src={item.image} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103" alt={item.title} referrerPolicy="no-referrer" />
                        <span className="absolute top-2 left-2 bg-[#2ECC71] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 fill-current" />
                          VERIFIED
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(item.id);
                          }}
                          className={`absolute top-2 right-2 p-1.5 rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-90 ${
                            isSaved 
                              ? 'bg-red-50 text-[#E74C3C]' 
                              : isDarkMode 
                                ? 'bg-slate-950/85 text-slate-400' 
                                : 'bg-white/90 text-slate-400'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <div className="p-3">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">{item.category}</p>
                        <h3 className={`font-bold text-xs line-clamp-1 group-hover:text-[#F39C12] transition-colors ${
                          isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'
                        }`}>{item.title}</h3>
                        <div className="mt-2 flex items-baseline gap-1.5">
                          <span className={`font-extrabold text-sm ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>Rs. {item.price.toFixed(0)}</span>
                          {item.originalPrice && (
                            <span className="text-[10px] font-semibold text-slate-400 line-through">Rs. {item.originalPrice.toFixed(0)}</span>
                          )}
                        </div>
                        <div className={`mt-2 border-t pt-2 flex items-center justify-between text-[9px] text-slate-400 font-semibold ${
                          isDarkMode ? 'border-slate-800' : 'border-slate-50'
                        }`}>
                          <span>{item.pickup.location}</span>
                          <span>{item.condition}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        ) : (
          /* Landing Empty Search frame showing Suggested Categories and History (Image 6) */
          <>
            {recentSearches.length > 0 && (
              <section className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className={`font-bold text-sm font-display ${isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}`}>Recent Searches</h2>
                  <button 
                    onClick={clearAllSearches}
                    className="text-[#E74C3C] text-xs font-semibold hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-col">
                  {recentSearches.map((search, idx) => (
                    <div 
                      key={idx}
                      className={`group flex items-center justify-between py-3 border-b px-2 rounded-lg cursor-pointer ${
                        isDarkMode ? 'border-slate-800 hover:bg-slate-800/40' : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div 
                        onClick={() => setSearchQueryState(search)}
                        className="flex items-center gap-3 flex-1"
                      >
                        <History className="w-4 h-4 text-slate-400" />
                        <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{search}</span>
                      </div>
                      <button 
                        onClick={() => removeSearchItem(search)}
                        className="text-slate-400 hover:text-slate-200 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Suggested Categories grids */}
            <section className="mt-8">
              <h2 className={`font-bold text-sm mb-4 font-display ${isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}`}>Suggested Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {suggestedCategories.map((cat, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedCategoryState(cat.name)}
                    className="group relative aspect-square rounded-2xl overflow-hidden shadow-xs cursor-pointer hover:shadow-md transition-all"
                  >
                    {/* Dark gradient backdrop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img src={cat.image} className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105" alt={cat.name} referrerPolicy="no-referrer" />
                    <div className="absolute bottom-4 left-4 z-20 text-white right-4">
                      <p className="font-bold text-xs font-display">{cat.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trending Items section */}
            <section className="mt-10 mb-12">
              <div className="flex items-center gap-2 mb-4 text-[#F39C12]">
                <TrendingUp className="w-5 h-5" />
                <h2 className={`font-bold text-sm font-display ${isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}`}>Trending Now</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(0, 4).map((item) => {
                  const isSaved = savedIds.includes(item.id);
                  return (
                    <article 
                      key={item.id}
                      onClick={() => onSelectProduct(item)}
                      className={`rounded-2xl overflow-hidden border shadow-xs transition-all cursor-pointer flex flex-col justify-between ${
                        isDarkMode ? 'bg-[#1E293B] border-slate-800 hover:border-slate-700' : 'bg-white border-[#E2E8F0] hover:shadow-md'
                      }`}
                    >
                      <div className="aspect-square relative overflow-hidden bg-slate-50">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.title} referrerPolicy="no-referrer" />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(item.id);
                          }}
                          className={`absolute top-2 right-2 p-1.5 rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-90 ${
                            isSaved 
                              ? 'bg-red-50 text-[#E74C3C]' 
                              : isDarkMode 
                                ? 'bg-slate-950/85 text-slate-400' 
                                : 'bg-white/90 text-slate-400'
                          }`}
                        >
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-3">
                        <h3 className={`font-bold text-xs line-clamp-1 ${isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}`}>{item.title}</h3>
                        <p className={`font-extrabold text-xs mt-1 ${isDarkMode ? 'text-[#F39C12]' : 'text-[#1A2B4C]'}`}>Rs. {item.price.toFixed(0)}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};
