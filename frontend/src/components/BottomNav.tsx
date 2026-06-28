/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Search, PlusCircle, MessageSquare, User, Bookmark } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenSellModal: () => void;
  unreadCount?: number;
  savedCount?: number;
  isDarkMode?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenSellModal,
  unreadCount = 0,
  savedCount = 0,
  isDarkMode = false
}) => {
  const activeBgClass = isDarkMode ? 'bg-[#F39C12]/20 text-[#F39C12] font-semibold' : 'bg-[#1A2B4C]/10 text-[#1A2B4C] font-semibold';
  const inactiveClass = isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-[#1A2B4C]';

  return (
    <nav className={`fixed bottom-0 left-0 w-full border-t z-50 shadow-lg py-2 pb-safe px-4 flex justify-around items-center transition-colors duration-150 ${isDarkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-[#E2E8F0]'}`}>
      {/* Home / Explore */}
      <button
        onClick={() => onNavigate('explore')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 active:scale-90 ${
          currentScreen === 'explore' ? activeBgClass : inactiveClass
        }`}
      >
        <Home className={`w-5.5 h-5.5 ${currentScreen === 'explore' ? 'fill-current' : ''}`} />
        <span className="text-[11px] font-medium mt-1">Explore</span>
      </button>

      {/* Search / Discover */}
      <button
        onClick={() => onNavigate('search-discovery')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 active:scale-90 ${
          currentScreen === 'search-discovery' ? activeBgClass : inactiveClass
        }`}
      >
        <Search className="w-5.5 h-5.5" />
        <span className="text-[11px] font-medium mt-1">Search</span>
      </button>

      {/* Sell Listing (FAB behavior) */}
      <button
        onClick={onOpenSellModal}
        className={`flex flex-col items-center justify-center py-1 px-2 transition-all active:scale-90 ${isDarkMode ? 'text-slate-400 hover:text-[#F39C12]' : 'text-slate-500 hover:text-[#F39C12]'}`}
      >
        <PlusCircle className="w-6 h-6 text-[#F39C12] fill-[#F39C12]/10" />
        <span className="text-[11px] font-medium mt-1">Sell</span>
      </button>

      {/* Bookmarked / Saved Items */}
      <button
        onClick={() => onNavigate('saved-items')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 active:scale-90 relative ${
          currentScreen === 'saved-items' ? activeBgClass : inactiveClass
        }`}
      >
        <Bookmark className={`w-5.5 h-5.5 ${currentScreen === 'saved-items' ? 'fill-current' : ''}`} />
        <span className="text-[11px] font-medium mt-1">Saved</span>
        {savedCount > 0 && (
          <span className="absolute top-0 right-3 bg-[#E74C3C] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
            {savedCount}
          </span>
        )}
      </button>

      {/* Profile */}
      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 active:scale-90 relative ${
          currentScreen === 'profile' || currentScreen === 'purchase-history' ? activeBgClass : inactiveClass
        }`}
      >
        <User className={`w-5.5 h-5.5 ${(currentScreen === 'profile' || currentScreen === 'purchase-history') ? 'fill-current' : ''}`} />
        <span className="text-[11px] font-medium mt-1">Profile</span>
      </button>
    </nav>
  );
};
