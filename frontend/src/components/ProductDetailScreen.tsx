/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare, Heart, Star, MapPin, CreditCard, ChevronRight, CheckCircle2, Award, ShieldCheck, Calendar, Flag, AlertTriangle, ShieldAlert, X, Bell, BellRing, TrendingDown } from 'lucide-react';
import { Product } from '../types';
import { triggerHaptic, hapticPatterns } from '../utils/haptics';

interface ProductDetailScreenProps {
  product: Product;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onInitiateChat: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
  onNavigate: (screen: any) => void;
  reportedProductIds: string[];
  onReportProduct: (id: string, reason: string, details: string) => void;
  isDarkMode?: boolean;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  savedIds,
  onToggleSave,
  onInitiateChat,
  onSelectProduct,
  allProducts,
  onNavigate,
  reportedProductIds,
  onReportProduct,
  isDarkMode = false
}) => {
  const isSaved = savedIds.includes(product.id);
  const isReported = reportedProductIds.includes(product.id);
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  // Price Drop Notified list from localStorage
  const [notifiedIds, setNotifiedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campusmart_price_drops');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState<{
    show: boolean;
    type: 'success' | 'info';
    title: string;
    message: string;
  } | null>(null);

  const [priceDropNotification, setPriceDropNotification] = useState<{
    show: boolean;
    productTitle: string;
    oldPrice: number;
    newPrice: number;
    image: string;
  } | null>(null);

  const isNotified = notifiedIds.includes(product.id);

  const togglePriceAlert = () => {
    triggerHaptic(hapticPatterns.light);
    const updated = isNotified
      ? notifiedIds.filter(id => id !== product.id)
      : [...notifiedIds, product.id];
    
    setNotifiedIds(updated);
    try {
      localStorage.setItem('campusmart_price_drops', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    if (!isNotified) {
      setToast({
        show: true,
        type: 'success',
        title: 'Price Alert Saved!',
        message: 'Saved! We will simulate a price drop notification for this item in 5 seconds.'
      });

      // Automatically hide the toast after 3.5 seconds
      setTimeout(() => {
        setToast(prev => prev?.title === 'Price Alert Saved!' ? null : prev);
      }, 3500);

      // Simulate a price drop after 5 seconds
      setTimeout(() => {
        try {
          const currentSaved = localStorage.getItem('campusmart_price_drops');
          const currentIds = currentSaved ? JSON.parse(currentSaved) : [];
          if (currentIds.includes(product.id)) {
            triggerHaptic(hapticPatterns.alert);
            const dropAmount = Math.max(100, Math.round(product.price * 0.12));
            const newPrice = product.price - dropAmount;
            
            setPriceDropNotification({
              show: true,
              productTitle: product.title,
              oldPrice: product.price,
              newPrice: newPrice,
              image: product.image
            });
          }
        } catch (e) {
          console.error(e);
        }
      }, 5000);
    } else {
      setToast({
        show: true,
        type: 'info',
        title: 'Price Alert Removed',
        message: 'You have cancelled the price drop alert for this listing.'
      });
      setTimeout(() => {
        setToast(prev => prev?.title === 'Price Alert Removed' ? null : prev);
      }, 3000);
    }
  };

  const triggerInstantSimulatedDrop = () => {
    triggerHaptic(hapticPatterns.alert);
    const dropAmount = Math.max(100, Math.round(product.price * 0.15));
    const newPrice = product.price - dropAmount;
    setPriceDropNotification({
      show: true,
      productTitle: product.title,
      oldPrice: product.price,
      newPrice: newPrice,
      image: product.image
    });
  };

  // Report Dialog States
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Inappropriate content or language');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Find other items from the same seller (excluding current product)
  const moreSellerItems = allProducts.filter(
    (item) => item.seller.name === product.seller.name && item.id !== product.id
  );

  // If there are none, show some related random products
  const relatedItems = moreSellerItems.length > 0 
    ? moreSellerItems 
    : allProducts.filter((item) => item.id !== product.id).slice(0, 4);

  // Images slider helper
  const galleryImages = product.additionalImages && product.additionalImages.length > 0
    ? [product.image, ...product.additionalImages]
    : [product.image];

  return (
    <div className={`w-full min-h-screen pb-24 pt-20 px-4 max-w-[1280px] mx-auto animate-fade-in transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'
    }`}>
      {/* Desktop Breadcrumbs */}
      <nav className={`hidden md:flex items-center gap-2 py-4 text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        <span className="hover:text-[#F39C12] cursor-pointer">Home</span>
        <span>/</span>
        <span className="hover:text-[#F39C12] cursor-pointer">{product.category}</span>
        <span>/</span>
        <span className={`font-bold truncate max-w-[200px] ${isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}`}>{product.title}</span>
      </nav>

      {isReported && (
        <div className={`mb-6 border rounded-xl p-4 flex items-start gap-3 animate-fade-in shadow-xs ${
          isDarkMode ? 'bg-red-950/20 border-red-900/50' : 'bg-red-50 border-red-200'
        }`}>
          <div className="p-2 bg-red-100/10 text-red-400 rounded-lg">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className={`text-xs font-bold ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>This Listing Has Been Flagged</h4>
            <p className={`text-[11px] mt-0.5 leading-relaxed ${isDarkMode ? 'text-red-400/90' : 'text-red-600'}`}>
              You have reported this listing as inappropriate. Our campus trust and safety team has been notified and is conducting a review of this item. It remains flagged for your protection.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
        {/* Left Column: Image Canvas & Gallery thumbnail slider */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`relative rounded-2xl overflow-hidden shadow-sm border aspect-[4/3] md:aspect-video lg:aspect-[4/3] ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-[#E2E8F0]'
          }`}>
            <img 
              className="w-full h-full object-cover" 
              src={galleryImages[selectedThumbIndex]} 
              alt={product.title} 
              referrerPolicy="no-referrer"
            />
            {/* Visual indicators */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              {product.isVerifiedStudent && (
                <span className="bg-[#2ECC71] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                  Verified Student
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-[#F39C12] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Gallery Row Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1.5">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedThumbIndex(idx)}
                  className={`min-w-[80px] h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shadow-xs ${
                    idx === selectedThumbIndex ? 'border-[#1A2B4C]' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="Gallery thumb" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pricing details and contextual primary actions card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Info Box */}
          <div className={`p-6 rounded-2xl shadow-sm border transition-colors ${
            isDarkMode ? 'bg-[#1E293B] border-slate-800 text-slate-100' : 'bg-white border-[#E2E8F0]'
          }`}>
            <h1 className={`text-xl md:text-2xl font-bold font-display leading-snug ${
              isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'
            }`}>{product.title}</h1>
            
            {product.specifications?.['Author'] && (
              <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {product.specifications['Author']} • {product.specifications['Edition'] || 'Standard Edition'}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>Rs. {product.price.toFixed(0)}</span>
                {product.originalPrice && (
                  <span className={`ml-2.5 line-through text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Rs. {product.originalPrice.toFixed(0)} (New)
                  </span>
                )}
              </div>
              <span className={`font-bold text-[11px] px-3 py-1.5 rounded-lg border ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-200 border-slate-700' 
                  : 'bg-slate-100 text-[#1A2B4C] border-slate-200'
              }`}>
                {product.condition}
              </span>
            </div>

            {/* Chat / Bookmark controls */}
            <div className="mt-6 flex flex-col gap-3">
              <button 
                onClick={() => onInitiateChat(product)}
                className="w-full py-3.5 bg-[#F39C12] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 flex justify-center items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                Chat with Seller
              </button>
              
              <button 
                onClick={() => onToggleSave(product.id)}
                className={`w-full py-3.5 border-2 font-bold text-sm rounded-xl transition-all active:scale-95 flex justify-center items-center gap-2 cursor-pointer ${
                  isDarkMode 
                    ? 'border-[#F39C12] text-[#F39C12] hover:bg-slate-800' 
                    : 'border-[#1A2B4C] text-[#1A2B4C] hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current text-[#E74C3C]' : ''}`} />
                {isSaved ? 'Remove from Saved' : 'Add to Wishlist'}
              </button>

              {/* Notify me of price drops */}
              <button 
                onClick={togglePriceAlert}
                className={`w-full py-3.5 border-2 font-bold text-sm rounded-xl transition-all active:scale-95 flex justify-center items-center gap-2 cursor-pointer ${
                  isNotified
                    ? isDarkMode
                      ? 'border-[#2ECC71] text-[#2ECC71] bg-[#2ECC71]/10 hover:bg-[#2ECC71]/15'
                      : 'border-[#2ECC71] text-[#2ECC71] bg-emerald-50 hover:bg-emerald-100/50'
                    : isDarkMode
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isNotified ? (
                  <>
                    <BellRing className="w-5 h-5 text-[#2ECC71] animate-bounce" />
                    <span>Price Alert Active</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-5 h-5 text-slate-400" />
                    <span>Notify me of price drops</span>
                  </>
                )}
              </button>

              {/* If active, show simulated test option */}
              {isNotified && (
                <div className={`p-3 rounded-xl border text-center animate-fade-in ${
                  isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <p className={`text-[11px] font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Alert saved! Test the notification instantly:
                  </p>
                  <button
                    onClick={triggerInstantSimulatedDrop}
                    className="px-3.5 py-1.5 bg-[#F39C12] hover:bg-[#F39C12]/95 text-slate-950 font-bold text-[11px] rounded-lg shadow-sm transition-all active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <TrendingDown className="w-3.5 h-3.5" />
                    Trigger Simulated Drop
                  </button>
                </div>
              )}

              <button 
                onClick={() => {
                  if (isReported) return;
                  setIsReportModalOpen(true);
                  setReportSubmitted(false);
                  setReportReason('Inappropriate content or language');
                  setReportDetails('');
                }}
                className={`w-full py-2.5 border rounded-xl font-bold text-xs transition-all active:scale-95 flex justify-center items-center gap-2 cursor-pointer ${
                  isReported 
                    ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed' 
                    : 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300'
                }`}
                disabled={isReported}
              >
                <Flag className={`w-3.5 h-3.5 ${isReported ? 'fill-current text-slate-400' : 'text-red-600'}`} />
                {isReported ? 'Listing Flagged & Reported' : 'Report this Listing'}
              </button>
            </div>
          </div>

          {/* Seller Information Frame */}
          <div className={`p-6 rounded-2xl shadow-sm border transition-colors ${
            isDarkMode ? 'bg-[#1E293B] border-slate-800 text-slate-100' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold text-sm font-display ${isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}`}>Seller Information</h3>
              <button 
                onClick={() => onToggleSave(product.id)}
                className="text-xs font-semibold text-[#3498DB] hover:underline"
              >
                View Profile
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#2ECC71] shadow-xs bg-slate-100">
                <img className="w-full h-full object-cover" src={product.seller.avatar} alt={product.seller.name} referrerPolicy="no-referrer" />
              </div>
              <div className="overflow-hidden">
                <p className={`font-bold truncate ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>{product.seller.name}</p>
                <div className="flex items-center gap-1 text-[#F39C12] mt-0.5">
                  <Star className="w-4 h-4 fill-current" />
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-350' : 'text-slate-800'}`}>{product.seller.rating.toFixed(1)}</span>
                  <span className="text-xs text-slate-400">({product.seller.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Star-based Rating Summary & Successful Campus Transactions */}
            <div className={`mt-4 p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-[#E2E8F0]'
            }`}>
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Seller Rating
                </span>
                <div className="flex items-center gap-1">
                  <div className="flex text-[#F39C12]">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const starValue = i + 1;
                      const isHalf = product.seller.rating >= starValue - 0.5 && product.seller.rating < starValue;
                      const isFull = product.seller.rating >= starValue;
                      return (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            isFull 
                              ? 'fill-current text-[#F39C12]' 
                              : isHalf 
                                ? 'text-[#F39C12] fill-current opacity-70'
                                : 'text-slate-300'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <span className={`text-xs font-extrabold ml-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {product.seller.rating.toFixed(1)}/5.0
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 sm:border-none">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Campus Handovers
                </span>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span className="text-xs font-extrabold text-[#2ECC71] bg-[#2ECC71]/10 px-2 py-0.5 rounded-md">
                    {Math.floor(product.seller.reviewsCount * 1.5) + 2} Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Badges footer */}
            <div className={`mt-4 pt-4 border-t flex gap-4 text-xs font-semibold ${
              isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#2ECC71]" />
                Verified ID
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                Joined {product.seller.joinedYear}
              </div>
            </div>
          </div>

          {/* Campus Pickup details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0]">
            <h3 className="font-bold text-sm text-[#1A2B4C] mb-4 font-display">Campus Pickup</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="p-2.5 bg-indigo-50 text-[#1A2B4C] rounded-xl h-fit shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A2B4C]">{product.pickup.location}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{product.pickup.availability}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 bg-indigo-50 text-[#1A2B4C] rounded-xl h-fit shadow-xs">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A2B4C]">Payment Method</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{product.pickup.paymentMethods.join(' or ')} accepted</p>
                </div>
              </div>
            </div>

            {/* Stylized Miniature Map */}
            <div className="mt-4 rounded-xl overflow-hidden h-32 border border-[#E2E8F0] relative group cursor-pointer shadow-xs">
              <img className="w-full h-full object-cover" src={product.pickup.mapImage} alt="Campus pickup area map" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-[#1A2B4C]/10 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs list component */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0]">
        <div className="border-b border-slate-100 flex gap-8 mb-6 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-4 text-xs font-bold whitespace-nowrap border-b-2 transition-all duration-150 ${
              activeTab === 'description' ? 'border-[#1A2B4C] text-[#1A2B4C]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('specifications')}
            className={`pb-4 text-xs font-bold whitespace-nowrap border-b-2 transition-all duration-150 ${
              activeTab === 'specifications' ? 'border-[#1A2B4C] text-[#1A2B4C]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Specifications
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-xs font-bold whitespace-nowrap border-b-2 transition-all duration-150 ${
              activeTab === 'reviews' ? 'border-[#1A2B4C] text-[#1A2B4C]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Reviews ({product.seller.reviewsCount})
          </button>
        </div>

        {/* Tab Panel contents render */}
        {activeTab === 'description' && (
          <div className="text-slate-600 text-xs leading-relaxed space-y-4 whitespace-pre-line">
            {product.description}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="overflow-hidden border border-slate-100 rounded-xl divide-y divide-slate-100 shadow-xs">
            {Object.entries(product.specifications || { 'Category': product.category, 'Condition': product.condition }).map(([key, val]) => (
              <div key={key} className="flex p-3 text-xs">
                <span className="w-1/3 text-slate-400 font-semibold">{key}</span>
                <span className="w-2/3 text-[#1A2B4C] font-semibold">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="divide-y divide-slate-100">
            {[1, 2].map((i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-slate-200 rounded-full" />
                    <span className="text-xs font-bold text-[#1A2B4C]">Student User {i}</span>
                  </div>
                  <div className="flex text-[#F39C12]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <p className="text-slate-500 text-xs">Smooth transaction and the textbook is as described. Met near the campus center library.</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested items carousel from Alex J. or others */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-base text-[#1A2B4C] font-display">More from {product.seller.name}</h2>
          <button 
            onClick={() => onNavigate('search-discovery')} 
            className="text-xs font-semibold text-[#1A2B4C] hover:underline flex items-center gap-1"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedItems.slice(0, 4).map((related) => (
            <div 
              key={related.id}
              onClick={() => {
                onSelectProduct(related);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-square bg-slate-50 relative overflow-hidden">
                <img src={related.image} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103" alt={related.title} referrerPolicy="no-referrer" />
                <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[#1A2B4C] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  Rs. {related.price.toFixed(0)}
                </span>
              </div>
              <div className="p-3">
                <p className="font-bold text-xs text-[#1A2B4C] truncate group-hover:text-[#F39C12] transition-colors">{related.title}</p>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold">{related.condition}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Report Listing Confirmation Dialog Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A2B4C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 border border-slate-200 shadow-2xl animate-scale-up relative">
            
            {/* Close button */}
            <button 
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!reportSubmitted ? (
              <div className="text-left">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center shadow-xs">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1A2B4C] font-display">Report this Listing</h3>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Campus Trust & Safety</p>
                  </div>
                </div>

                <p className="text-slate-500 text-xs leading-relaxed mt-3">
                  Help us protect the student community. If you believe this item <strong>"{product.title}"</strong> violates campus marketplace policies, please select a reason below.
                </p>

                {/* Reason Select Option Items */}
                <div className="mt-4 space-y-2.5">
                  {[
                    'Inappropriate content or language',
                    'Scam or fraudulent listing',
                    'Prohibited items (weapons, drugs, etc.)',
                    'Incorrect category or spam',
                    'Harassment or offensive behavior'
                  ].map((reason) => {
                    const isSelected = reportReason === reason;
                    return (
                      <label 
                        key={reason}
                        onClick={() => setReportReason(reason)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-[#1A2B4C] bg-slate-50 text-[#1A2B4C] ring-1 ring-[#1A2B4C]' 
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="flex-1">{reason}</span>
                        <div className={`w-4 border rounded-full flex items-center justify-center transition-all ${
                          isSelected ? 'border-[#1A2B4C] h-4' : 'border-slate-300 h-4'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-[#1A2B4C] rounded-full" />}
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Optional description details textarea */}
                <div className="mt-4">
                  <label className="block text-slate-700 text-xs font-bold mb-1 font-display">
                    Additional details or comments (Optional)
                  </label>
                  <textarea 
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Provide any helpful context such as suspicious communication, non-student status, or inaccurate specifications..."
                    rows={3}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#1A2B4C] focus:border-transparent transition-all placeholder:text-slate-400 bg-[#F8FAFC]"
                  />
                </div>

                {/* Action controls */}
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => setIsReportModalOpen(false)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-[#1A2B4C] font-bold text-xs rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      triggerHaptic(hapticPatterns.warning);
                      onReportProduct(product.id, reportReason, reportDetails);
                      setReportSubmitted(true);
                    }}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-md"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-emerald-100">
                  <CheckCircle2 className="w-9 h-9 fill-current text-emerald-600" />
                </div>
                
                <h3 className="text-lg font-bold text-[#1A2B4C] font-display">Thank You for Reporting!</h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Your report for <strong>"{product.title}"</strong> has been successfully submitted to the campus trust and safety moderators.
                </p>
                
                <div className="my-5 bg-slate-50 p-4 rounded-xl border border-slate-100 text-left space-y-2">
                  <div className="text-[11px] font-semibold text-slate-600">
                    <span className="text-slate-400 block mb-0.5">Reason Selected:</span>
                    <span className="text-red-700 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-md inline-block mt-0.5">{reportReason}</span>
                  </div>
                  {reportDetails && (
                    <div className="text-[11px] font-semibold text-slate-600">
                      <span className="text-slate-400 block mb-0.5">Details Provided:</span>
                      <p className="text-slate-700 italic bg-white p-2 rounded-lg border border-slate-100 line-clamp-2">"{reportDetails}"</p>
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400 font-medium">
                    We take reportings seriously. Our moderators will review this listing within 24 hours. The item has been marked as flagged in your interface.
                  </div>
                </div>

                <button 
                  onClick={() => setIsReportModalOpen(false)}
                  className="w-full py-3 bg-[#1A2B4C] hover:opacity-90 text-white font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  Close Confirmation
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating Success/Info Toast Alert */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[9999] animate-fade-in-up">
          <div className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 max-w-sm ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-slate-100' 
              : 'bg-white border-slate-150 text-slate-800'
          }`}>
            <span className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-[#2ECC71]' : 'bg-[#3498DB]'}`} />
            <div className="flex-grow">
              <p className="text-xs font-bold leading-none">{toast.title}</p>
              <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Immersive Mobile-style Push Notification for Price Drop Simulation */}
      {priceDropNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-[9999] animate-bounce-down">
          <div className={`p-4 rounded-2xl shadow-2xl border flex gap-3.5 items-start ${
            isDarkMode 
              ? 'bg-[#1E293B]/95 backdrop-blur-md border-slate-700/80 text-slate-100 shadow-slate-950/50' 
              : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-800 shadow-slate-300/60'
          }`}>
            <div className={`p-2.5 rounded-xl flex-shrink-0 flex items-center justify-center ${
              isDarkMode ? 'bg-[#F39C12]/20 text-[#F39C12]' : 'bg-amber-100 text-[#F39C12]'
            }`}>
              <BellRing className="w-6 h-6 animate-swing" />
            </div>
            
            <div className="flex-grow overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F39C12]">
                  CampusMart Price Alert
                </span>
                <span className="text-[9px] font-semibold text-slate-400">Just Now</span>
              </div>
              <h4 className={`text-xs font-bold mt-1 line-clamp-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {priceDropNotification.productTitle}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                Great news! The price of this listing dropped by <span className="font-bold text-emerald-500">Rs. {(priceDropNotification.oldPrice - priceDropNotification.newPrice).toFixed(0)}</span>!
              </p>
              
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-400 line-through">
                  Rs. {priceDropNotification.oldPrice.toFixed(0)}
                </span>
                <span className="text-sm font-black text-[#2ECC71]">
                  Rs. {priceDropNotification.newPrice.toFixed(0)}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setPriceDropNotification(null)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
