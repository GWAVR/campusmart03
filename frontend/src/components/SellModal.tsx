/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Product } from '../types';

interface SellModalProps {
  onClose: () => void;
  onPostListing: (product: Product) => void;
}

export const SellModal: React.FC<SellModalProps> = ({ onClose, onPostListing }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState<'Textbooks' | 'Electronics' | 'Dorm Gear' | 'Bicycles' | 'Furniture' | 'Clothing'>('Textbooks');
  const [condition, setCondition] = useState<'Like New' | 'Good' | 'Fair' | 'Used'>('Like New');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Central Library Piazza');
  const [availability, setAvailability] = useState('Mon-Fri, 2PM - 6PM');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Prefilled mock high resolution images that students can pick for their listings
  const prefilledImages = [
    { name: 'MacBook Pro laptop', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9JPDnlgjY_fJhQZ4EBx1OcRMB2eBPX0PwRllg8GRaLcYC-k2jKuHXmAfm09nCWMVGmazvSCvSOXUXcaGuDmV8FGrZ46pxHURxkJ6_bdpIdemlc_XuPmnB23YJyqBx5fbN4eUgUyRP3pi_1XTBVIAQ_Pm61ailTIxqMLgwjAeoO6WtR4snrdNhuOqCD22kMM6ujYVbQvZFSB4FXiHPDotl6dQqQ8-Oav6WhTdCEL7gR5TftaHKyG5p3vdu1kzWYKtHSBghjvYpzQ' },
    { name: 'Organic Chem Textbook', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZWla5JDCJVil4QS6Old6ROUHXYDyWUCmEKR8vVDkN4k06wnVPAAqSfKg-M6cgjRufkh-nqB8yQRNaj24re168lpulE3PtaPjdNC4by-_fTOm2BI4ghMRCNDivMcI9fbaIrO7HyCO_Bp5_78hEuz5f8DjcY3LFF9bS4qXIG3ib1BAT1AwlZnu2agGAF4PuJKhV_Uv3-rUxLL8eVi__17DDkwKJmOx_6Wjlct72la0j8_ItPJjeZ2889Buu2a0qaScvO1Nyzp8jQw' },
    { name: 'Pre-Med Textbook Bundle', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB33efOD4MjqrqLSxt0PT34aS_BvpFPoE69o8xliH110s-LTZay5yZh_BVuSQL0Zrsp1pxpQvrPkOcu8m8eBGRZT2Nt6DkfjhB2O3l7pXPz2RH-mROCFwphbsb3bKs2hUOM-xbhgDecCdD5eCX3YA8dFY0x6a59aJMLA-ujRFTuN8MNb2U4k-PHy2G0Ih9NI5pDp-fVX0A7bKs-AVOV0T9cfdhPxAExla1dBBZv493kET56d6KOR3QpB6NTLnHpPsNrd5R_A7HJ9A' },
    { name: 'Road Bike', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6D9PLYOnhVD_tCqkiICfiG5bNsFZed_6LO-hzx7QyvWfjCRF-cve2MgOgXSiB_5e0lkJcnZd3007B9XE6zRKQRdRUqpCVRC1iPPSQT1ZRsgXOunlc6WCQx2Fka2SK--p9KoM7PH1pEA-KHVq2O_na6J0rd3PIgw5Tr1BSlIc03u7Ylp5f-Ra7gBmGsR5DSTciwYo1kRQQROh1jjr836hV171tkCErwy2aaftTIfe3x6-_sOTboa3PFR4UyF4FAWR2uuJIeRsk9g' },
    { name: 'LED Desk Lamp', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdalomsYxRFLe_CogdJXW574VY7pt6ff9R-NBFPHNZ7uK-IWu3ziRp7VPc16jpGVrkh8eNU0TNdrVo3NCf1HdRJygSyqICqz7lfn6P9-Rkzs7KHD07WHq43UQxwykvtPepi-wEGsYV9O19aUsXXUttymvRjOynh9mx7EGzofNqGxr-XoStLEfdZgtGJPNqAU2RUfMGOproZTEh7OkRJ4V-7ZuTwVgvQSaCfJHNtvyBoCubnlEhM3zflFr9DiAYQHd4wdO3psXUBg' },
    { name: 'Dorm Kettle', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC46sOBHqwOR5uAvrNUoxjss01RrwJTVVaEVKtDicHUcJhzK5nPgLlY-yrlnj536OY8DY41TKImHs4zr6Rl70Pu9Ns2dQmVBluA8hxEFMtjUsub1lC6pSGnRNaTNSfonJIgghwgeB-T1M6u3nNNQKcpxrW1FgzWZSGmd9xBH_2PZZEiX26nFMe_ExJKzbDstmZexnzY6E8glh6ZF-SBU3670aSPrxhJOOb8DN5Nx8EGVL2xJtBZ3XIyqUSnzH7MUw7-mPRQ0diZaw' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || !description.trim()) return;

    const parsedPrice = parseFloat(price);
    const parsedOriginalPrice = originalPrice ? parseFloat(originalPrice) : undefined;

    const newProduct: Product = {
      id: `prod-custom-${Date.now()}`,
      title,
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      condition,
      category,
      description,
      image: prefilledImages[selectedImageIndex].url,
      postedTime: 'Just now',
      isVerifiedStudent: true,
      isFeatured: false,
      seller: {
        name: 'Alex Rivera',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCf8Sgl7bCh2pO487zW7qzlwcq9So5HdIit3IC_04GfLhstVXKLWHBqBolUnlP2NotOla7Q5NipTjUVJAOJ7-b9n6xI-aPfuKCbgG_nwqHsfkpVByN-dlvtQ0446lMq5uOL5MMfDJzq-j0Nk-ScjgE7kv21r0JRQiPpFuqE8ZXf4fyXapURany0TFUtL36AWXaZboieK6LRYGN3NovIcRfSL8B53AYRCYP1_jkb4Imaya03b2DBDaYDT3NjhnGXPu8nh-Gwub_2g',
        rating: 4.9,
        reviewsCount: 24,
        joinedYear: 2022,
        isVerified: true
      },
      pickup: {
        location,
        availability,
        paymentMethods: ['CampusPay', 'Venmo'],
        mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
      }
    };

    onPostListing(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A2B4C]/60 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white w-full sm:max-w-md rounded-t-[28px] sm:rounded-[28px] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 flex justify-between items-center border-b border-slate-100">
          <h3 className="font-extrabold text-sm text-[#1A2B4C] font-display">Post New Listing</h3>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body panel listing */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Listing Title</label>
            <input 
              required
              type="text" 
              placeholder="e.g. MacBook Air or Calculus Book" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1A2B4C]/20 focus:border-[#1A2B4C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Price (Rs.)</label>
              <input 
                required
                type="number" 
                placeholder="45" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1A2B4C]/20 focus:border-[#1A2B4C]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Original Price (Rs.)</label>
              <input 
                type="number" 
                placeholder="e.g. 95 (Optional)" 
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1A2B4C]/20 focus:border-[#1A2B4C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl outline-none bg-white focus:ring-2 focus:ring-[#1A2B4C]/25"
              >
                <option value="Textbooks">Textbooks</option>
                <option value="Electronics">Electronics</option>
                <option value="Dorm Gear">Dorm Gear</option>
                <option value="Bicycles">Bicycles</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Condition</label>
              <select 
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl outline-none bg-white focus:ring-2 focus:ring-[#1A2B4C]/25"
              >
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Used">Used</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Choose Listing Photo Placeholder</label>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {prefilledImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square relative rounded-xl overflow-hidden cursor-pointer border-3 transition-all ${
                    selectedImageIndex === idx ? 'border-[#F39C12]' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                  title={img.name}
                >
                  <img src={img.url} className="w-full h-full object-cover" alt="Draft upload preview" referrerPolicy="no-referrer" />
                  {selectedImageIndex === idx && (
                    <div className="absolute top-1 right-1 bg-[#F39C12] text-white p-0.5 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Description</label>
            <textarea 
              required
              rows={3}
              placeholder="Provide a descriptive summary of condition, coarse requirement, or negotiation flexibilities..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1A2B4C]/20 focus:border-[#1A2B4C] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pickup Landmark</label>
              <input 
                type="text" 
                placeholder="e.g. Central Library" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1A2B4C]/25"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Availability Window</label>
              <input 
                type="text" 
                placeholder="e.g. Mon-Fri, 2PM - 6PM" 
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1A2B4C]/25"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-[#F39C12] hover:opacity-95 text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-transform active:scale-95 shadow-md mt-4"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
};
