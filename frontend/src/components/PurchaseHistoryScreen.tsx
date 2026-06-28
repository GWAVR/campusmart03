/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Search, CheckCircle2, RefreshCw, XCircle, BarChart3, Receipt, Award } from 'lucide-react';
import { PurchaseRecord } from '../types';

interface PurchaseHistoryScreenProps {
  purchases: PurchaseRecord[];
  onBack: () => void;
  onNavigate: (screen: 'explore') => void;
  isDarkMode?: boolean;
}

export const PurchaseHistoryScreen: React.FC<PurchaseHistoryScreenProps> = ({
  purchases,
  onBack,
  onNavigate,
  isDarkMode = false
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [orderQuery, setOrderQuery] = useState<string>('');
  const [selectedReceipt, setSelectedReceipt] = useState<PurchaseRecord | null>(null);

  // Dynamic filter for search bar + year buttons
  const filteredPurchases = purchases.filter((order) => {
    // Search Query match
    if (orderQuery.trim()) {
      const q = orderQuery.toLowerCase();
      if (!order.title.toLowerCase().includes(q)) return false;
    }

    // Year selection match
    if (selectedYear !== 'All') {
      const yearStr = order.date.split(', ')[1]; // e.g. "2024"
      if (yearStr !== selectedYear) return false;
    }

    // Since we also changed price state from dollar to Rs. in previous versions, we ensure prices scale normally
    return true;
  });

  // Sum total spent for display metrics (exclude Cancelled status)
  const totalSpent = filteredPurchases
    .filter((order) => order.status !== 'Cancelled')
    .reduce((sum, order) => sum + order.price, 0);

  return (
    <div className={`w-full min-h-screen pb-24 animate-fade-in transition-colors duration-300 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      {/* Top navbar Header */}
      <header className={`fixed top-0 left-0 w-full z-50 border-b flex items-center justify-between px-4 h-16 transition-colors ${
        isDarkMode ? 'bg-[#0F172A]/90 border-slate-800' : 'bg-white border-[#E2E8F0]'
      }`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className={`p-2 rounded-full transition-transform active:scale-95 ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-[#1A2B4C]'
            }`}
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className={`font-bold text-base font-display ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>Purchase History</h1>
        </div>
        <button className={`p-2 rounded-full transition-all active:scale-95 ${
          isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-[#1A2B4C]'
        }`}>
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Main panel container */}
      <main className="pt-20 px-4 max-w-screen-md mx-auto space-y-4">
        
        {/* Search details */}
        <section className="space-y-3">
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4.5 h-4.5" />
            </span>
            <input 
              className={`w-full pl-11 pr-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs outline-none focus:ring-2 transition-all ${
                isDarkMode 
                  ? 'bg-slate-900 border border-slate-800 text-slate-100 focus:ring-[#F39C12]/20' 
                  : 'bg-white border border-[#E2E8F0] text-slate-900 focus:ring-[#1A2B4C]/25'
              }`} 
              placeholder="Search orders..." 
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              type="text"
            />
          </div>

          {/* Horizonal Year Tab buttons */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {['All', '2024', '2023', '2022'].map((year) => (
              <button 
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  selectedYear === year 
                    ? 'border-[#F39C12] bg-[#F39C12] text-white shadow-xs' 
                    : isDarkMode 
                      ? 'border-slate-800 bg-[#1E293B] text-slate-350 hover:bg-slate-800' 
                      : 'border-[#E2E8F0] bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </section>

        {/* List of Orders */}
        <section className="space-y-4">
          {filteredPurchases.length === 0 ? (
            <div className={`py-12 text-center rounded-2xl border ${
              isDarkMode ? 'bg-[#1E293B] border-slate-800' : 'bg-white border-[#E2E8F0]'
            }`}>
              <p className="text-slate-400 text-xs font-semibold">No purchase history found.</p>
            </div>
          ) : (
            filteredPurchases.map((order) => (
              <div 
                key={order.id}
                className={`rounded-2xl overflow-hidden border transition-shadow hover:shadow-md ${
                  isDarkMode ? 'bg-[#1E293B] border-slate-800/80 text-slate-100' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="p-4 flex gap-4">
                  <div className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-100'
                  }`}>
                    <img className="w-full h-full object-cover" src={order.image} alt={order.title} referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className={`font-bold text-xs line-clamp-1 ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>{order.title}</h3>
                        <span className={`font-extrabold text-xs ${isDarkMode ? 'text-[#F39C12]' : 'text-[#1A2B4C]'}`}>Rs. {order.price.toFixed(0)}</span>
                      </div>
                      <p className="text-slate-400 text-[10px] mt-1 font-semibold">Purchased on {order.date}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      {order.status === 'Completed' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-[#2ECC71] border border-emerald-500/25">
                          <CheckCircle2 className="w-3 h-3 mr-1 fill-current" />
                          Completed
                        </span>
                      )}
                      {order.status === 'Processing' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-[#F39C12] border border-amber-500/25">
                          <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                          Processing
                        </span>
                      )}
                      {order.status === 'Cancelled' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-500/10 text-red-400 border border-red-500/25">
                          <XCircle className="w-3 h-3 mr-1" />
                          Cancelled
                        </span>
                      )}

                      <button 
                        onClick={() => setSelectedReceipt(order)}
                        className={`text-xs font-bold hover:underline ${isDarkMode ? 'text-[#F39C12]' : 'text-[#1A2B4C]'}`}
                      >
                        {order.status === 'Cancelled' ? 'View Details' : 'View Receipt'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Dynamic Financial Spent Box metrics */}
        <section className="bg-[#1A2B4C] text-white rounded-2xl p-5 relative overflow-hidden shadow-md">
          <div className="relative z-10 flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">
                TOTAL SPENT {selectedYear === 'All' ? '2024' : selectedYear}
              </p>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Rs. {totalSpent.toFixed(0)}</h2>
            </div>
            
            {/* Right statistic orange bar box */}
            <div className="p-3 bg-[#F39C12] rounded-xl text-white shadow-sm flex items-center justify-center">
              <BarChart3 className="w-7 h-7" />
            </div>
          </div>
          {/* Decorative backdrop circle */}
          <div className="absolute -right-6 -bottom-6 w-28 h-32 bg-indigo-900 rounded-full opacity-30" />
        </section>
      </main>

      {/* Styled receipt popup trigger modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className={`p-6 rounded-[24px] max-w-sm w-full border shadow-xl animate-fade-in text-center flex flex-col items-center ${
            isDarkMode ? 'bg-[#1E293B] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
              isDarkMode ? 'bg-slate-900 text-[#F39C12]' : 'bg-indigo-50 text-[#1A2B4C]'
            }`}>
              <Receipt className="w-7 h-7" />
            </div>
            <h3 className={`font-bold text-sm font-display ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>CampusMart Order Receipt</h3>
            <p className="text-[11px] text-slate-450 mt-0.5">Order ID: #{selectedReceipt.id.toUpperCase()}</p>

            <div className={`mt-4 border-t border-b border-dashed py-3 w-full space-y-2 text-left ${
              isDarkMode ? 'border-slate-850' : 'border-slate-200'
            }`}>
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Product:</span>
                <span className={`truncate max-w-[150px] ${isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}`}>{selectedReceipt.title}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Date:</span>
                <span className={isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}>{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Amount Paid:</span>
                <span className="text-[#F39C12] font-bold">Rs. {selectedReceipt.price.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Status:</span>
                <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{selectedReceipt.status}</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedReceipt(null)}
              className={`mt-6 w-full py-2.5 hover:opacity-95 font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-transform ${
                isDarkMode ? 'bg-[#F39C12] text-slate-950' : 'bg-[#1A2B4C] text-white'
              }`}
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
