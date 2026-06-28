/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  condition: 'Like New' | 'Good' | 'Fair' | 'Used';
  category: 'Textbooks' | 'Electronics' | 'Dorm Gear' | 'Bicycles' | 'Furniture' | 'Clothing' | 'Lab Gear' | 'Kitchen' | 'Decor';
  description: string;
  specifications?: Record<string, string>;
  image: string;
  additionalImages?: string[];
  seller: {
    name: string;
    avatar: string;
    rating: number;
    reviewsCount: number;
    joinedYear: number;
    isVerified: boolean;
  };
  pickup: {
    location: string;
    availability: string;
    paymentMethods: string[];
    mapImage: string;
  };
  isVerifiedStudent: boolean;
  isFeatured?: boolean;
  postedTime: string;
}

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller';
  text: string;
  time: string;
  imageUrl?: string;
  imageCaption?: string;
}

export interface ChatThread {
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  sellerName: string;
  sellerAvatar: string;
  messages: ChatMessage[];
  lastMessageTime: string;
  unread?: boolean;
}

export interface PurchaseRecord {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  date: string;
  status: 'Completed' | 'Processing' | 'Cancelled';
}

export type ScreenType = 
  | 'welcome' 
  | 'explore' 
  | 'product-detail' 
  | 'chat' 
  | 'profile' 
  | 'search-discovery' 
  | 'saved-items' 
  | 'purchase-history';
