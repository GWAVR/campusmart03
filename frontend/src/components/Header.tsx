/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { School, ArrowLeft, Bell, Share2, MoreVertical, Phone, Sun, Moon, Cloud, CloudLightning } from 'lucide-react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onBack: () => void;
  chatThreadName?: string;
  chatThreadAvatar?: string;
  chatVerifiedStudent?: boolean;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  isFirebaseLoading?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  chatThreadName,
  chatThreadAvatar,
  chatVerifiedStudent,
  isDarkMode = false,
  onToggleDarkMode,
  isFirebaseLoading = false
}) => {
  // Common theme classes
  const headerBgClass = isDarkMode ? 'bg-[#0F172A]/95 border-slate-800' : 'bg-white/95 border-[#E2E8F0]';
  const textPrimaryClass = isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]';
  const textSecondaryClass = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const buttonHoverClass = isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100';

  const renderThemeToggle = () => {
    if (!onToggleDarkMode) return null;
    return (
      <button
        onClick={onToggleDarkMode}
        className={`p-2 rounded-full transition-all active:scale-95 duration-100 ${isDarkMode ? 'text-[#F39C12] hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    );
  };

  if (currentScreen === 'welcome') {
    return (
      <header className={`w-full h-16 flex justify-between items-center px-4 max-w-[1280px] mx-auto z-50 transition-colors ${isDarkMode ? 'bg-[#0F172A]' : 'bg-white'}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('welcome')}>
          <School className={`${isDarkMode ? 'text-[#F39C12]' : 'text-[#1A2B4C]'} w-8 h-8`} />
          <h1 className={`text-xl font-bold font-display tracking-tight ${textPrimaryClass}`}>CampusMart</h1>
          {isFirebaseLoading ? (
            <div className="flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-mono animate-pulse ml-1.5">
              <Cloud className="w-3.5 h-3.5 animate-bounce text-amber-400" />
              <span>Syncing...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] bg-[#2ECC71]/10 text-[#2ECC71] px-2 py-0.5 rounded-full font-mono ml-1.5">
              <Cloud className="w-3.5 h-3.5 text-[#2ECC71]" />
              <span>Firebase</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('explore')}
            className={`font-semibold text-sm transition-opacity ${isDarkMode ? 'text-slate-200 hover:text-white' : 'text-[#1A2B4C] hover:opacity-75'}`}
          >
            Browse
          </button>
          <button className={`font-semibold text-sm transition-opacity ${isDarkMode ? 'text-slate-200 hover:text-white' : 'text-[#1A2B4C] hover:opacity-75'}`}>
            Safety
          </button>
          {renderThemeToggle()}
        </div>
      </header>
    );
  }

  // Top Bar for Product Detail
  if (currentScreen === 'product-detail') {
    return (
      <header className={`fixed top-0 left-0 w-full z-50 border-b backdrop-blur-md transition-colors ${headerBgClass}`}>
        <div className="flex justify-between items-center h-16 px-4 w-full max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className={`p-2 rounded-full transition-all active:scale-95 duration-100 ${textPrimaryClass} ${buttonHoverClass}`}
              aria-label="Back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className={`text-lg font-bold tracking-tight ${textPrimaryClass}`}>CampusMart</span>
          </div>
          <div className="flex items-center gap-2">
            {renderThemeToggle()}
            <button className={`p-2 rounded-full transition-all active:scale-95 duration-100 ${textPrimaryClass} ${buttonHoverClass}`}>
              <Bell className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-full transition-all active:scale-95 duration-100 ${textPrimaryClass} ${buttonHoverClass}`}>
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Header for Chat
  if (currentScreen === 'chat') {
    return (
      <header className={`fixed top-0 left-0 w-full z-50 border-b backdrop-blur-md transition-colors flex justify-between items-center px-4 h-16 ${headerBgClass}`}>
        <div className="flex items-center gap-3 max-w-[70%]">
          <button 
            onClick={onBack}
            className={`p-2 rounded-full active:scale-95 transition-all ${textPrimaryClass} ${buttonHoverClass}`}
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <img 
                className={`w-10 h-10 rounded-full object-cover border ${isDarkMode ? 'border-slate-700' : 'border-[#E2E8F0]'}`} 
                src={chatThreadAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDs-k1buosZ14WMWs5ec7Y-Bsk52MJ3opHHC4iIXeFq-iz9LF_jJh3lPviUQ1dRGBT4zgZFT2nNVl04LmH6X8od4mXcrhpNR4NDpOdxvIBoGPw6TBuDEUe8kRrk43P4a8_r2FI1ZGKu5DBVINKOmLsPZIkW8yqryxMhoQUY89zSktWEnM6rUwLp2ASGc6Drn4Q6s9u8GF1Vu_drSedTcFo7fOgMq5mp0lDcCKvcFnIdH-tZaIBuiBXNngsbPPZVWSiXIbiwxsfB-g"} 
                alt={chatThreadName || "Seller"} 
              />
              {chatVerifiedStudent && (
                <div className="absolute -bottom-1 -right-1 bg-[#2ECC71] border-2 border-white rounded-full p-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <h1 className={`font-bold text-sm truncate ${textPrimaryClass}`}>{chatThreadName || "Alex J."}</h1>
              {chatVerifiedStudent && (
                <span className="text-[10px] font-semibold text-[#2ECC71] uppercase tracking-wider block">Verified Student</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {renderThemeToggle()}
          <button className={`p-2 rounded-full active:scale-95 transition-transform ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
            <Phone className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-full active:scale-95 transition-transform ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>
    );
  }

  // Default Global Header
  return (
    <header className={`fixed top-0 left-0 w-full z-50 border-b transition-colors ${isDarkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-[#E2E8F0]'}`}>
      <div className="flex justify-between items-center h-16 px-4 w-full max-w-[1280px] mx-auto animate-fade-in">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('explore')}>
          <School className={`${isDarkMode ? 'text-[#F39C12]' : 'text-[#1A2B4C]'} w-7 h-7`} />
          <h1 className={`text-xl font-bold font-display ${textPrimaryClass}`}>CampusMart</h1>
          {isFirebaseLoading ? (
            <div className="flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-mono animate-pulse ml-1">
              <Cloud className="w-3.5 h-3.5 animate-bounce text-amber-400" />
              <span>Syncing...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] bg-[#2ECC71]/10 text-[#2ECC71] px-2 py-0.5 rounded-full font-mono ml-1">
              <Cloud className="w-3.5 h-3.5 text-[#2ECC71]" />
              <span>Firebase</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {renderThemeToggle()}
          <button 
            onClick={() => onNavigate('profile')}
            className={`p-1.5 rounded-full transition-colors active:scale-95 duration-100 ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
            title="Profile"
          >
            <div className={`w-8 h-8 rounded-full overflow-hidden border ${isDarkMode ? 'border-slate-700' : 'border-[#E2E8F0]'}`}>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCf8Sgl7bCh2pO487zW7qzlwcq9So5HdIit3IC_04GfLhstVXKLWHBqBolUnlP2NotOla7Q5NipTjUVJAOJ7-b9n6xI-aPfuKCbgG_nwqHsfkpVByN-dlvtQ0446lMq5uOL5MMfDJzq-j0Nk-ScjgE7kv21r0JRQiPpFuqE8ZXf4fyXapURany0TFUtL36AWXaZboieK6LRYGN3NovIcRfSL8B53AYRCYP1_jkb4Imaya03b2DBDaYDT3NjhnGXPu8nh-Gwub_2g" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
