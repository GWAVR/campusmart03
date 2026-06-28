/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, Product, ChatMessage, PurchaseRecord, ChatThread } from './types';
import { INITIAL_PRODUCTS, INITIAL_PURCHASE_HISTORY, INITIAL_CHATS } from './data';

// Import Custom Modular UI views
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { ChatScreen } from './components/ChatScreen';
import { ProfileScreen, ProductReport } from './components/ProfileScreen';
import { SearchDiscoveryScreen } from './components/SearchDiscoveryScreen';
import { SavedItemsScreen } from './components/SavedItemsScreen';
import { PurchaseHistoryScreen } from './components/PurchaseHistoryScreen';
import { SellModal } from './components/SellModal';

// Icons
import { CheckCircle2, ShieldCheck, ShoppingBag, X, Cloud, CloudOff } from 'lucide-react';

// Haptics Support
import { triggerHaptic, hapticPatterns } from './utils/haptics';

// Firebase Integrations
import {
  getProductsFromFirebase,
  saveProductToFirebase,
  removeProductFromFirebase,
  getSavedIdsFromFirebase,
  saveSavedIdsToFirebase,
  getPurchasesFromFirebase,
  addPurchaseToFirebase,
  getReportsFromFirebase,
  addReportToFirebase,
  removeReportFromFirebase,
  getChatMessagesFromFirebase,
  saveChatMessagesToFirebase,
} from './lib/firebase';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userUniversity, setUserUniversity] = useState('University of Tech');
  const [isVerified, setIsVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('campusmart_is_admin');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Dark mode state with persistence in localStorage and document element toggle
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('campusmart_dark_mode');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('campusmart_dark_mode', String(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      console.error('Failed to set dark mode:', err);
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Core Data Lists kept in Active State for real-time reactivity
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [savedIds, setSavedIds] = useState<string[]>(['prod-eng-math', 'prod-ti84']);
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(INITIAL_PURCHASE_HISTORY);
  const [currentSelectedProduct, setCurrentSelectedProduct] = useState<Product | null>(null);

  // Single active chat thread state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHATS[0].messages);

  // Bottom Navigation helper states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Modals overlays state
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [purchaseSuccessItem, setPurchaseSuccessItem] = useState<Product | null>(null);

  // Navigation History Stack to provide full, intuitive Back button flows
  const [navigationHistory, setNavigationHistory] = useState<ScreenType[]>([]);

  // Reported products state with structured report details
  const [productReports, setProductReports] = useState<ProductReport[]>([]);
  const [reportedProductIds, setReportedProductIds] = useState<string[]>([]);
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);

  // Track recently viewed products
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campus_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Update recently viewed list when currentSelectedProduct changes
  useEffect(() => {
    if (currentSelectedProduct) {
      setRecentlyViewedIds(prev => {
        const filtered = prev.filter(id => id !== currentSelectedProduct.id);
        const updated = [currentSelectedProduct.id, ...filtered].slice(0, 3);
        try {
          localStorage.setItem('campus_recently_viewed', JSON.stringify(updated));
        } catch (err) {
          console.error(err);
        }
        return updated;
      });
    }
  }, [currentSelectedProduct]);

  // 1. Synchronize main states with Firebase on mount or user session change
  useEffect(() => {
    let active = true;
    async function syncData() {
      setIsFirebaseLoading(true);
      try {
        const fbProducts = await getProductsFromFirebase(INITIAL_PRODUCTS);
        if (!active) return;
        setProductsList(fbProducts);

        if (userEmail) {
          const fbSavedIds = await getSavedIdsFromFirebase(userEmail, ['prod-eng-math', 'prod-ti84']);
          if (!active) return;
          setSavedIds(fbSavedIds);
        }

        const fbPurchases = await getPurchasesFromFirebase(INITIAL_PURCHASE_HISTORY);
        if (!active) return;
        setPurchases(fbPurchases);

        const initialReports: ProductReport[] = [
          {
            productId: 'prod-ti84',
            reason: 'Incorrect Price',
            details: 'The listing states original price is Rs. 149 and selling price is Rs. 95, but the market value is much lower.',
            timestamp: new Date().toLocaleDateString()
          }
        ];
        const fbReports = await getReportsFromFirebase(initialReports);
        if (!active) return;
        setProductReports(fbReports);
        setReportedProductIds(fbReports.map(r => r.productId));
      } catch (err) {
        console.error("Failed to sync initial Firebase data:", err);
      } finally {
        if (active) {
          setIsFirebaseLoading(false);
        }
      }
    }
    syncData();
    return () => {
      active = false;
    };
  }, [userEmail]);

  // 2. Synchronize Chat thread with Firebase when a chat room is entered
  useEffect(() => {
    if (currentScreen === 'chat' && currentSelectedProduct) {
      let active = true;
      async function syncChat() {
        const defaultGreetings: ChatMessage[] = [
          {
            id: 'msg-seed-1',
            sender: 'buyer',
            text: `Hi ${currentSelectedProduct.seller.name}! Is the "${currentSelectedProduct.title}" still available for pickup?`,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          }
        ];
        const fbMessages = await getChatMessagesFromFirebase(currentSelectedProduct.id, defaultGreetings);
        if (active) {
          setChatMessages(fbMessages);
        }
      }
      syncChat();
      return () => {
        active = false;
      };
    }
  }, [currentScreen, currentSelectedProduct]);

  const handleReportProduct = async (id: string, reason: string, details: string) => {
    const newReport: ProductReport = {
      productId: id,
      reason,
      details,
      timestamp: new Date().toLocaleDateString()
    };
    setProductReports(prev => {
      const updated = [...prev.filter(r => r.productId !== id), newReport];
      return updated;
    });
    setReportedProductIds(prev => {
      return prev.includes(id) ? prev : [...prev, id];
    });
    await addReportToFirebase(newReport);
  };

  const handleDismissReport = async (productId: string) => {
    triggerHaptic(hapticPatterns.medium);
    setProductReports(prev => prev.filter(r => r.productId !== productId));
    setReportedProductIds(prev => prev.filter(id => id !== productId));
    await removeReportFromFirebase(productId);
  };

  const handleRemoveProduct = async (productId: string) => {
    triggerHaptic(hapticPatterns.warning);
    setProductsList(prev => prev.filter(p => p.id !== productId));
    setProductReports(prev => prev.filter(r => r.productId !== productId));
    setReportedProductIds(prev => prev.filter(id => id !== productId));
    await removeProductFromFirebase(productId);
    await removeReportFromFirebase(productId);
  };

  const handleNavigate = (target: ScreenType) => {
    // Record current screen in backtrace history
    setNavigationHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(target);
    window.scrollTo({ top: 0 });
  };

  const handleBack = () => {
    if (navigationHistory.length > 0) {
      const prev = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prevStack => prevStack.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      // Default fallback
      setCurrentScreen('explore');
    }
    window.scrollTo({ top: 0 });
  };

  // Onboarding Setup
  const handleVerifyEdu = (name: string, email: string, university: string, isAdminUser = false) => {
    setUserName(name);
    setUserEmail(email);
    setUserUniversity(university);
    setIsVerified(true);
    setIsAdmin(isAdminUser);
    try {
      localStorage.setItem('campusmart_is_admin', String(isAdminUser));
    } catch (err) {
      console.error('Failed to save admin status:', err);
    }
    // Transition to explore home screen
    setCurrentScreen('explore');
  };

  const handleSkipVerify = () => {
    setUserName('Guest Student');
    setUserEmail('guest@university.edu');
    setUserUniversity('University of Tech');
    setIsVerified(false);
    setIsAdmin(false);
    try {
      localStorage.removeItem('campusmart_is_admin');
    } catch (err) {
      console.error('Failed to clear admin status:', err);
    }
    setCurrentScreen('explore');
  };

  // Saved / Bookmark Toggle
  const handleToggleSave = async (id: string) => {
    triggerHaptic(hapticPatterns.light);
    let nextSavedIds: string[] = [];
    if (savedIds.includes(id)) {
      nextSavedIds = savedIds.filter(item => item !== id);
    } else {
      nextSavedIds = [...savedIds, id];
    }
    setSavedIds(nextSavedIds);
    if (userEmail) {
      await saveSavedIdsToFirebase(userEmail, nextSavedIds);
    }
  };

  // Post Listing
  const handlePostListing = async (newProd: Product) => {
    triggerHaptic(hapticPatterns.medium);
    setProductsList(prev => [newProd, ...prev]);
    await saveProductToFirebase(newProd);
  };

  // Buy Now checkout processes
  const handleBuyNow = async (prod: Product) => {
    triggerHaptic(hapticPatterns.success);
    const newPurchase: PurchaseRecord = {
      id: `pur-custom-${Date.now()}`,
      productId: prod.id,
      title: prod.title,
      price: prod.price,
      image: prod.image,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing'
    };

    setPurchases(prev => [newPurchase, ...prev]);
    setPurchaseSuccessItem(prod);
    await addPurchaseToFirebase(newPurchase);
  };

  // Initiate chat on item
  const handleInitiateChat = async (prod: Product) => {
    setCurrentSelectedProduct(prod);
    
    // Seed new thread messages
    const defaultGreetings: ChatMessage[] = [
      {
        id: 'msg-seed-1',
        sender: 'buyer',
        text: `Hi ${prod.seller.name}! Is the "${prod.title}" still available for pickup?`,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setChatMessages(defaultGreetings);
    handleNavigate('chat');
  };

  // Send Chat message and simulate automated contextual bot reply
  const handleSendMessage = async (text: string) => {
    triggerHaptic(hapticPatterns.light);
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'buyer',
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    const nextMessages = [...chatMessages, userMsg];
    setChatMessages(nextMessages);
    if (currentSelectedProduct) {
      await saveChatMessagesToFirebase(currentSelectedProduct.id, nextMessages);
    }

    // Bot seller simulated reply
    setTimeout(async () => {
      // Trigger subtle haptic for receiving reply if user is active on chat
      triggerHaptic(hapticPatterns.medium);
      const answers = [
        "That works for me! Central Library Piazza works well for handover.",
        "Sure, I can meet later today. I'll bring the item.",
        "Sounds good! Do you accept CampusPay or cash?",
        "Awesome, perfect! See you there. I am wearing a gray hoodie.",
        "Yes, the condition is just as in the description. See you on campus!"
      ];
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      
      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'seller',
        text: randomAnswer,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => {
        const updated = [...prev, botMsg];
        if (currentSelectedProduct) {
          saveChatMessagesToFirebase(currentSelectedProduct.id, updated);
        }
        return updated;
      });
    }, 2000);
  };

  const handleLogout = () => {
    // Reset session states
    setUserName('');
    setUserEmail('');
    setIsVerified(false);
    setIsAdmin(false);
    try {
      localStorage.removeItem('campusmart_is_admin');
    } catch (err) {
      console.error('Failed to clear admin status:', err);
    }
    setSavedIds(['prod-eng-math', 'prod-ti84']);
    setCurrentScreen('welcome');
    setNavigationHistory([]);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans select-none antialiased transition-colors duration-300 ${isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'}`}>
      {/* Top Header layout */}
      <Header 
        currentScreen={currentScreen} 
        onNavigate={handleNavigate} 
        onBack={handleBack} 
        chatThreadName={currentSelectedProduct?.seller.name}
        chatThreadAvatar={currentSelectedProduct?.seller.avatar}
        chatVerifiedStudent={currentSelectedProduct?.isVerifiedStudent}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isFirebaseLoading={isFirebaseLoading}
      />

      {/* Main active screen presentation container */}
      <div className="flex-grow">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onVerifyEdu={handleVerifyEdu} onSkipVerify={handleSkipVerify} isDarkMode={isDarkMode} />
        )}

        {currentScreen === 'explore' && (
          <ExploreScreen 
            products={productsList} 
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectProduct={(p) => {
              setCurrentSelectedProduct(p);
              handleNavigate('product-detail');
            }}
            onNavigate={(tab) => {
              if (tab === 'search-discovery') handleNavigate('search-discovery');
              if (tab === 'profile') handleNavigate('profile');
              if (tab === 'saved-items') handleNavigate('saved-items');
            }}
            onOpenSellModal={() => setIsSellModalOpen(true)}
            searchQueryState={searchQuery}
            setSearchQueryState={setSearchQuery}
            selectedCategoryState={selectedCategory}
            setSelectedCategoryState={setSelectedCategory}
            reportedProductIds={reportedProductIds}
            isDarkMode={isDarkMode}
            recentlyViewedIds={recentlyViewedIds}
          />
        )}

        {currentScreen === 'product-detail' && currentSelectedProduct && (
          <ProductDetailScreen 
            product={currentSelectedProduct}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onInitiateChat={handleInitiateChat}
            onSelectProduct={(p) => {
              setCurrentSelectedProduct(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            allProducts={productsList}
            onNavigate={handleNavigate}
            reportedProductIds={reportedProductIds}
            onReportProduct={handleReportProduct}
            isDarkMode={isDarkMode}
          />
        )}

        {currentScreen === 'chat' && currentSelectedProduct && (
          <ChatScreen 
            product={currentSelectedProduct}
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            onBuyNow={handleBuyNow}
            isDarkMode={isDarkMode}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            onAddMessage={handleSendMessage}
            savedCount={savedIds.length}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
            userName={userName || undefined}
            userEmail={userEmail || undefined}
            userUniversity={userUniversity || undefined}
            isVerified={isVerified}
            isAdmin={isAdmin}
            productReports={productReports}
            products={productsList}
            onDismissReport={handleDismissReport}
            onRemoveProduct={handleRemoveProduct}
            onSelectProduct={(p) => {
              setCurrentSelectedProduct(p);
              handleNavigate('product-detail');
            }}
          />
        )}

        {currentScreen === 'search-discovery' && (
          <SearchDiscoveryScreen 
            products={productsList}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectProduct={(p) => {
              setCurrentSelectedProduct(p);
              handleNavigate('product-detail');
            }}
            onBack={handleBack}
            searchQueryState={searchQuery}
            setSearchQueryState={setSearchQuery}
            selectedCategoryState={selectedCategory}
            setSelectedCategoryState={setSelectedCategory}
            isDarkMode={isDarkMode}
          />
        )}

        {currentScreen === 'saved-items' && (
          <SavedItemsScreen 
            products={productsList}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectProduct={(p) => {
              setCurrentSelectedProduct(p);
              handleNavigate('product-detail');
            }}
            onBack={handleBack}
            onNavigate={(screen) => handleNavigate(screen)}
            isDarkMode={isDarkMode}
          />
        )}

        {currentScreen === 'purchase-history' && (
          <PurchaseHistoryScreen 
            purchases={purchases}
            onBack={handleBack}
            onNavigate={(screen) => handleNavigate(screen)}
            isDarkMode={isDarkMode}
          />
        )}
      </div>

      {/* Global persistent Bottom Navigation Bar (hidden on onboarding page) */}
      {currentScreen !== 'welcome' && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
          onOpenSellModal={() => setIsSellModalOpen(true)}
          unreadCount={1}
          savedCount={savedIds.length}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Sell Modal registered form */}
      {isSellModalOpen && (
        <SellModal 
          onClose={() => setIsSellModalOpen(false)}
          onPostListing={handlePostListing}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Purchase Checkout Complete overlay modal dialog */}
      {purchaseSuccessItem && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-[24px] max-w-sm w-full p-6 text-center border shadow-2xl animate-scale-up ${
            isDarkMode ? 'bg-[#1E293B] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-16 h-16 bg-[#2ECC71]/10 text-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 fill-current text-[#2ECC71]" />
            </div>
            
            <h3 className={`text-lg font-bold font-display ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>Purchase Confirmed!</h3>
            <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              You have successfully secured the listing <strong>{purchaseSuccessItem.title}</strong> for <strong>Rs. {purchaseSuccessItem.price}</strong>.
            </p>
            
            <div className={`my-5 p-3.5 rounded-xl border text-left space-y-1 ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#F8FAFC] border-slate-100'
            }`}>
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Handover Zone:</span>
                <span className={isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}>{purchaseSuccessItem.pickup.location}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Payment accepted:</span>
                <span className="text-[#F39C12] font-bold">{purchaseSuccessItem.pickup.paymentMethods.join(' / ')}</span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button 
                onClick={() => {
                  setPurchaseSuccessItem(null);
                  handleNavigate('purchase-history');
                }}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-[#1A2B4C] font-bold text-xs rounded-xl transition-all duration-150"
              >
                View History
              </button>
              <button 
                onClick={() => setPurchaseSuccessItem(null)}
                className="flex-1 py-3 bg-[#F39C12] hover:opacity-90 text-white font-bold text-xs rounded-xl transition-all duration-150 shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
