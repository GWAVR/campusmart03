/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  List, 
  Heart, 
  Shield, 
  ShieldCheck, 
  History, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Star, 
  Landmark, 
  ChevronRight, 
  Sun, 
  Moon, 
  Trash2, 
  Check, 
  AlertTriangle, 
  ExternalLink 
} from 'lucide-react';
import { ScreenType, Product } from '../types';

export interface ProductReport {
  productId: string;
  reason: string;
  details: string;
  timestamp: string;
}

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onLogout: () => void;
  onAddMessage: (text: string) => void;
  savedCount: number;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  userName?: string;
  userEmail?: string;
  userUniversity?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  productReports?: ProductReport[];
  products?: Product[];
  onDismissReport?: (productId: string) => void;
  onRemoveProduct?: (productId: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  onLogout,
  onAddMessage,
  savedCount,
  isDarkMode = false,
  onToggleDarkMode,
  userName = 'Alex Rivera',
  userEmail = 'alex.rivera@university.edu',
  userUniversity = 'University of Tech',
  isVerified = true,
  isAdmin = false,
  productReports = [],
  products = [],
  onDismissReport,
  onRemoveProduct,
  onSelectProduct
}) => {
  // Find products associated with reports
  const activeReports = productReports.map(report => {
    const product = products.find(p => p.id === report.productId);
    return {
      report,
      product
    };
  }).filter(item => item.product !== undefined);

  return (
    <div className={`w-full min-h-screen pb-24 pt-20 px-4 max-w-xl mx-auto transition-colors duration-300 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      
      {/* Profile Header Avatar */}
      <section className="mb-6">
        <div className={`p-6 rounded-2xl shadow-sm border flex flex-col items-center text-center transition-colors ${
          isDarkMode ? 'bg-[#1E293B] border-slate-800' : 'bg-white border-[#E2E8F0]'
        }`}>
          <div className="relative mb-3">
            <div className={`w-24 h-24 rounded-full border-4 shadow-md overflow-hidden flex items-center justify-center ${
              isAdmin 
                ? (isDarkMode ? 'bg-amber-500/10 border-amber-500/80' : 'bg-amber-50 border-amber-400') 
                : 'bg-slate-100 border-white'
            }`}>
              {isAdmin ? (
                <Shield className={`w-12 h-12 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
              ) : (
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCf8Sgl7bCh2pO487zW7qzlwcq9So5HdIit3IC_04GfLhstVXKLWHBqBolUnlP2NotOla7Q5NipTjUVJAOJ7-b9n6xI-aPfuKCbgG_nwqHsfkpVByN-dlvtQ0446lMq5uOL5MMfDJzq-j0Nk-ScjgE7kv21r0JRQiPpFuqE8ZXf4fyXapURany0TFUtL36AWXaZboieK6LRYGN3NovIcRfSL8B53AYRCYP1_jkb4Imaya03b2DBDaYDT3NjhnGXPu8nh-Gwub_2g" 
                  alt={userName} 
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div className={`absolute bottom-1 right-1 rounded-full p-1 border-2 border-white flex items-center justify-center ${
              isAdmin ? 'bg-amber-500 text-slate-950' : 'bg-[#2ECC71] text-white'
            }`} title={isAdmin ? 'Administrator' : 'Verified Student'}>
              {isAdmin ? <Shield className="w-4 h-4 fill-current" /> : <ShieldCheck className="w-4 h-4 fill-current" />}
            </div>
          </div>
          
          <h2 className={`text-lg font-bold font-display ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>{userName}</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              isAdmin 
                ? 'bg-amber-500/20 text-amber-500' 
                : 'bg-[#2ECC71]/10 text-[#2ECC71]'
            }`}>
              {isAdmin ? 'System Administrator' : isVerified ? 'Verified Student' : 'Guest Member'}
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1.5 font-medium">{userUniversity}</p>
          <p className="text-slate-500 text-[10px] font-mono mt-1">{userEmail}</p>

          {/* Trust Bento Grid Metrics */}
          <div className="grid grid-cols-2 gap-3 w-full mt-5">
            <div className={`p-3 rounded-xl border text-center transition-colors ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-100'}`}>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Account Type</p>
              <p className={`font-extrabold text-sm mt-0.5 ${isDarkMode ? 'text-amber-400' : 'text-[#1A2B4C]'}`}>
                {isAdmin ? 'HQ Staff' : 'Student'}
              </p>
            </div>
            <div className={`p-3 rounded-xl border text-center transition-colors ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center justify-center gap-1">
                <Star className="text-[#F39C12] w-4.5 h-4.5 fill-current" />
                <p className={`font-extrabold text-sm ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>
                  {isAdmin ? '5.0 (Staff)' : '4.9 (Trust)'}
                </p>
              </div>
              <p className="text-slate-400 text-[10px] font-bold mt-0.5">Rating &amp; Safety</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Moderation Panel Desk (Only visible when logged in as Admin) */}
      {isAdmin && (
        <section className="mb-6 animate-fade-in">
          <div className={`p-5 rounded-2xl shadow-sm border transition-colors ${
            isDarkMode ? 'bg-slate-900/90 border-amber-500/30' : 'bg-amber-50/20 border-amber-200'
          }`}>
            <div className="flex items-center gap-2 mb-4 border-b pb-3 border-amber-500/20">
              <Shield className="w-5 h-5 text-amber-500" />
              <h3 className={`text-sm font-bold uppercase tracking-wider font-display ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
                Trust &amp; Safety Desk ({activeReports.length})
              </h3>
            </div>

            {activeReports.length === 0 ? (
              <div className="text-center py-6">
                <ShieldCheck className="w-10 h-10 text-[#2ECC71] mx-auto mb-2 opacity-80" />
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>No Pending Flagged Listings</p>
                <p className="text-[10px] text-slate-400 mt-0.5">All student uploads conform to community guidelines.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeReports.map(({ report, product }) => {
                  if (!product) return null;
                  return (
                    <div 
                      key={product.id} 
                      className={`p-3.5 rounded-xl border flex flex-col gap-3 transition-all ${
                        isDarkMode ? 'bg-[#1E293B] border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img 
                          className="w-12 h-12 object-cover rounded-lg border border-slate-200 flex-shrink-0" 
                          src={product.image} 
                          alt={product.title}
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-xs font-bold truncate ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                            {product.title}
                          </h4>
                          <p className="text-[10px] text-amber-500 font-bold mt-0.5">Rs. {product.price}</p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            Seller: <span className="font-semibold">{product.seller.name}</span>
                          </p>
                        </div>
                        {onSelectProduct && (
                          <button 
                            onClick={() => onSelectProduct(product)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all"
                            title="View Listing Details"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Flag context */}
                      <div className={`p-2.5 rounded-lg text-xs ${
                        isDarkMode ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-slate-50 text-slate-600 border border-slate-100'
                      }`}>
                        <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-bold uppercase tracking-wider mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Report Reason: {report.reason}</span>
                        </div>
                        <p className="leading-relaxed text-[11px] font-medium italic">"{report.details}"</p>
                      </div>

                      {/* Admin Decision actions */}
                      <div className="flex gap-2.5">
                        <button
                          onClick={() => onDismissReport && onDismissReport(product.id)}
                          className="flex-1 py-1.5 rounded-lg border border-[#2ECC71]/30 bg-[#2ECC71]/5 hover:bg-[#2ECC71] text-[#2ECC71] hover:text-white transition-all text-[11px] font-bold flex items-center justify-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Keep Post
                        </button>
                        <button
                          onClick={() => onRemoveProduct && onRemoveProduct(product.id)}
                          className="flex-1 py-1.5 rounded-lg border border-[#E74C3C]/30 bg-[#E74C3C]/5 hover:bg-[#E74C3C] text-[#E74C3C] hover:text-white transition-all text-[11px] font-bold flex items-center justify-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove Post
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Menu Navigation Card lists */}
      <section className="space-y-4">
        <div className={`rounded-2xl border overflow-hidden shadow-xs divide-y transition-colors ${
          isDarkMode ? 'bg-[#1E293B] border-slate-800 divide-slate-800/80' : 'bg-white border-[#E2E8F0] divide-slate-100'
        }`}>
          
          {/* Saved Items */}
          <button 
            onClick={() => onNavigate('saved-items')}
            className={`w-full flex items-center justify-between p-4 transition-colors group ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                isDarkMode ? 'bg-[#F39C12]/10 text-[#F39C12]' : 'bg-[#1A2B4C]/5 text-[#1A2B4C] group-hover:bg-[#1A2B4C] group-hover:text-white'
              }`}>
                <Heart className="w-4.5 h-4.5" />
              </div>
              <span className={`font-semibold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Saved Items</span>
            </div>
            <div className="flex items-center gap-1.5">
              {savedCount > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isDarkMode ? 'bg-slate-800 text-[#F39C12]' : 'bg-slate-100 text-[#1A2B4C]'}`}>
                  {savedCount}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>

          {/* Verification Center */}
          <div className={`w-full flex items-center justify-between p-4 transition-colors ${isDarkMode ? 'bg-[#1E293B]' : 'bg-white'}`}>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-[#2ECC71]/10 flex items-center justify-center text-[#2ECC71]">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <span className={`font-semibold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Verification Center</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#2ECC71] text-white text-[9px] px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
            </div>
          </div>

          {/* Purchase History */}
          <button 
            onClick={() => onNavigate('purchase-history')}
            className={`w-full flex items-center justify-between p-4 transition-colors group ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                isDarkMode ? 'bg-[#F39C12]/10 text-[#F39C12]' : 'bg-[#1A2B4C]/5 text-[#1A2B4C] group-hover:bg-[#1A2B4C] group-hover:text-white'
              }`}>
                <History className="w-4.5 h-4.5" />
              </div>
              <span className={`font-semibold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Purchase History</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Second Group: Support and App Adjustments */}
        <div className={`rounded-2xl border overflow-hidden shadow-xs divide-y transition-colors ${
          isDarkMode ? 'bg-[#1E293B] border-slate-800 divide-slate-800/80' : 'bg-white border-[#E2E8F0] divide-slate-100'
        }`}>
          {/* Support */}
          <div className="w-full flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 text-slate-500'}`}>
                <HelpCircle className="w-4.5 h-4.5" />
              </div>
              <span className={`font-semibold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Help &amp; Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Night Mode Toggle Switch */}
          {onToggleDarkMode && (
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isDarkMode ? 'bg-[#F39C12]/20 text-[#F39C12]' : 'bg-slate-100 text-slate-500'}`}>
                  {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </div>
                <span className={`font-semibold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Night-time Mode</span>
              </div>
              <button 
                onClick={onToggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shadow-inner ${isDarkMode ? 'bg-[#F39C12]' : 'bg-slate-300'}`}
                aria-label="Toggle Night Mode"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          )}

          {/* Settings */}
          <div className="w-full flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 text-slate-500'}`}>
                <Settings className="w-4.5 h-4.5" />
              </div>
              <span className={`font-semibold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Log Out Control */}
        <button 
          onClick={onLogout}
          className={`w-full mt-4 py-3.5 px-4 font-semibold text-xs rounded-xl border transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
            isDarkMode 
              ? 'bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border-red-500/20' 
              : 'bg-[#E74C3C]/5 hover:bg-[#E74C3C] hover:text-white text-[#E74C3C] border-[#E74C3C]/15'
          }`}
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </section>
    </div>
  );
};
