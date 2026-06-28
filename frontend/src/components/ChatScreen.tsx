/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, PlusCircle, ShoppingCart } from 'lucide-react';
import { Product, ChatMessage } from '../types';

interface ChatScreenProps {
  product: Product;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onBuyNow: (product: Product) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  product,
  messages,
  onSendMessage,
  onBuyNow
}) => {
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  // Scroll to bottom when messages load/change
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full bg-[#F5F7FA] min-h-screen pb-24 pt-16 flex flex-col">
      {/* Product context box fixed below Top bar */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] p-3 mx-4 mt-2 rounded-xl shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
            <img className="w-full h-full object-cover" src={product.image} alt={product.title} referrerPolicy="no-referrer" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-[#1A2B4C] line-clamp-1">{product.title}</h3>
            <p className="font-bold text-sm text-[#F39C12]">Rs. {product.price.toFixed(2)}</p>
          </div>
        </div>
        <button 
          onClick={() => onBuyNow(product)}
          className="bg-[#1A2B4C] hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Buy Now
        </button>
      </div>

      {/* Conversation timeline area */}
      <div className="flex-grow overflow-y-auto px-4 py-4 flex flex-col gap-4 max-w-3xl mx-auto w-full">
        {/* Date bubble indicator */}
        <div className="flex justify-center my-1">
          <span className="bg-slate-200/60 px-3 py-1 rounded-full text-[10px] font-semibold text-slate-500 uppercase tracking-wider shadow-2xs">Today</span>
        </div>

        {messages.map((msg) => {
          const isSenderBuyer = msg.sender === 'buyer';
          return (
            <div 
              key={msg.id} 
              className={`flex w-full ${isSenderBuyer ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className="max-w-[80%]">
                {msg.imageUrl ? (
                  /* Condition Image Bubble */
                  <div className="bg-white p-1.5 rounded-2xl rounded-tl-none border border-[#E2E8F0] shadow-xs overflow-hidden">
                    <img className="rounded-xl w-full h-44 object-cover" src={msg.imageUrl} alt="Chat attachment condition preview" referrerPolicy="no-referrer" />
                    {msg.imageCaption && (
                      <div className="p-2">
                        <p className="text-xs text-slate-500 italic mt-1 font-semibold">{msg.imageCaption}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Standard Text Bubble */
                  <div className={`p-3 rounded-2xl shadow-2xs ${
                    isSenderBuyer 
                      ? 'bg-[#1A2B4C] text-white rounded-tr-none' 
                      : 'bg-white text-[#1A2B4C] rounded-tl-none border border-[#E2E8F0]'
                  }`}>
                    <p className="text-xs leading-relaxed font-medium">{msg.text}</p>
                  </div>
                )}
                <p className={`text-[9px] text-slate-400 mt-1 font-semibold ${isSenderBuyer ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={chatBottomRef} />
      </div>

      {/* Message input panel fixed to screen bottom (above viewport safe nav) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#E2E8F0] p-3 z-40">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto flex items-center gap-2">
          <button 
            type="button"
            className="text-slate-400 hover:bg-slate-50 p-2 rounded-full transition-colors active:scale-90"
            title="Upload Files"
          >
            <PlusCircle className="w-5.5 h-5.5" />
          </button>
          <button 
            type="button"
            className="text-slate-400 hover:bg-slate-50 p-2 rounded-full transition-colors active:scale-90"
            title="Scan Photo"
          >
            <Image className="w-5.5 h-5.5" />
          </button>
          
          <div className="flex-1 relative">
            <input 
              className="w-full bg-slate-100 border-none rounded-full py-2.5 px-4 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#1A2B4C]/25 outline-none placeholder:text-slate-400" 
              placeholder="Type your message..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              type="text"
            />
          </div>
          
          <button 
            type="submit"
            className="bg-[#F39C12] hover:opacity-90 text-white p-2.5 rounded-full hover:shadow-md transition-all active:scale-90 flex items-center justify-center"
          >
            <Send className="w-4 h-4 text-white fill-current" />
          </button>
        </form>
        <div className="h-safe" />
      </div>
    </div>
  );
};
