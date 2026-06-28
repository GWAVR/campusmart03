/**
 * Firestore Seed Script
 * 
 * Seeds the Firestore database with initial CampusMart product data.
 * Run with: cd backend && node data/seed.js
 * 
 * This script reads from the frontend data source and writes
 * all seed records into the appropriate Firestore collections.
 */

import { db, collection, doc, setDoc, getDocs } from '../config/firebase.js';

// ─── Seed Data ───────────────────────────────────────────────────────
// Inline seed data (mirrored from src/data.ts) to avoid TypeScript import issues.

const SEED_PRODUCTS = [
  {
    id: 'prod-eng-math',
    title: 'Engineering Mathematics',
    price: 45.00,
    originalPrice: 95.00,
    condition: 'Like New',
    category: 'Textbooks',
    description: 'Barely used 8th edition textbook for Engineering Mathematics.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCwHBwm2Zx8wPBsm06nsejQtiksRZeZs35VsVyIirARQk2wrtS6v-oUywewjBB8TSuTnFTRWQaeDyQFvzDBotiR6Qlg4orS2sNuVmsrdDg1GJhYz8O_KxwxBeTGN7x66n0kXU2uyGv4cd4FJB1zNg78nSWGYKjHzK6C6iNzcnI0SPPrcuvvdrTDUpfDLqHUXwNc17pzMdxoA-tkWcBrI8et5vQw5HYCBjcuA6OL4Z6jRZrXOI30d0RAHoVA1-mqfI5QBeFNsqudA',
    seller: { name: 'Alex J.', avatar: '', rating: 4.8, reviewsCount: 12, joinedYear: 2022, isVerified: true },
    pickup: { location: 'Central Library Piazza', availability: 'Mon-Fri, 2PM - 6PM', paymentMethods: ['Cash', 'CampusPay'], mapImage: '' },
    isVerifiedStudent: true,
    isFeatured: true,
    postedTime: '2 mins ago'
  },
  {
    id: 'prod-ti84',
    title: 'TI-84 Plus CE Graphing Calculator',
    price: 95.00,
    originalPrice: 149.00,
    condition: 'Good',
    category: 'Electronics',
    description: 'Selling my trusty TI-84 Plus CE calculator. In great condition.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcAqN8NShQXi2Q1SWbRXYsvGA-0lUJGayTcXr1QAE-8oBloFHSLmy4Vrj8LhWKZG-FoSFWziy3MoPRmeOPlAx2oaNLPPLeDNaS0eKuK63L_9Urq5hNn-zJb2VFkx7UN92OcDx0qhbxDGFTwA1l82L90QWbjlFNbyvaiwoY21ILF5ZsWSwOUKapi7UoN4IM9Kq1X_r31jGS_cTgD0370f0f0s1f40mHUEdbu_0hmtOh25bnjg7UwBA1quogIKXQlHOM3bYI1tlt3Q',
    seller: { name: 'Alex Rivera', avatar: '', rating: 4.9, reviewsCount: 24, joinedYear: 2022, isVerified: true },
    pickup: { location: 'West Campus Dining Hall', availability: 'Tue & Thu, 1PM - 4PM', paymentMethods: ['CampusPay', 'Venmo'], mapImage: '' },
    isVerifiedStudent: true,
    isFeatured: true,
    postedTime: '2 days ago'
  },
  {
    id: 'prod-org-chem',
    title: 'Organic Chemistry: Structure and Function (8th Ed)',
    price: 120.00,
    originalPrice: 220.00,
    condition: 'Like New',
    category: 'Textbooks',
    description: 'Organic Chemistry textbook with colorful molecular structure illustrations.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZWla5JDCJVil4QS6Old6ROUHXYDyWUCmEKR8vVDkN4k06wnVPAAqSfKg-M6cgjRufkh-nqB8yQRNaj24re168lpulE3PtaPjdNC4by-_fTOm2BI4ghMRCNDivMcI9fbaIrO7HyCO_Bp5_78hEuz5f8DjcY3LFF9bS4qXIG3ib1BAT1AwlZnu2agGAF4PuJKhV_Uv3-rUxLL8eVi__17DDkwKJmOx_6Wjlct72la0j8_ItPJjeZ2889Buu2a0qaScvO1Nyzp8jQw',
    seller: { name: 'Sarah M.', avatar: '', rating: 4.7, reviewsCount: 15, joinedYear: 2023, isVerified: true },
    pickup: { location: 'Science Center Courtyard', availability: 'Wednesdays, 11AM - 1PM', paymentMethods: ['Cash', 'CampusPay'], mapImage: '' },
    isVerifiedStudent: true,
    isFeatured: true,
    postedTime: '5 hours ago'
  },
  {
    id: 'prod-lamp',
    title: 'Adjustable LED Desk Lamp with USB Charging',
    price: 25.00,
    originalPrice: 49.00,
    condition: 'Good',
    category: 'Dorm Gear',
    description: 'Modern LED desk lamp with 3 color temperatures and USB charging.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdalomsYxRFLe_CogdJXW574VY7pt6ff9R-NBFPHNZ7uK-IWu3ziRp7VPc16jpGVrkh8eNU0TNdrVo3NCf1HdRJygSyqICqz7lfn6P9-Rkzs7KHD07WHq43UQxwykvtPepi-wEGsYV9O19aUsXXUttymvRjOynh9mx7EGzofNqGxr-XoStLEfdZgtGJPNqAU2RUfMGOproZTEh7OkRJ4V-7ZuTwVgvQSaCfJHNtvyBoCubnlEhM3zflFr9DiAYQHd4wdO3psXUBg',
    seller: { name: 'Clara Oswald', avatar: '', rating: 4.8, reviewsCount: 8, joinedYear: 2024, isVerified: true },
    pickup: { location: 'Johnson Hall Lobby', availability: 'Every day after 6PM', paymentMethods: ['Cash', 'Venmo'], mapImage: '' },
    isVerifiedStudent: true,
    postedTime: '1 day ago'
  },
  {
    id: 'prod-macbook',
    title: 'MacBook Air M1 2020',
    price: 450.00,
    originalPrice: 999.00,
    condition: 'Good',
    category: 'Electronics',
    description: 'Silver MacBook Air M1, 8GB RAM, 256GB SSD. Battery health at 91%.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9JPDnlgjY_fJhQZ4EBx1OcRMB2eBPX0PwRllg8GRaLcYC-k2jKuHXmAfm09nCWMVGmazvSCvSOXUXcaGuDmV8FGrZ46pxHURxkJ6_bdpIdemlc_XuPmnB23YJyqBx5fbN4eUgUyRP3pi_1XTBVIAQ_Pm61ailTIxqMLgwjAeoO6WtR4snrdNhuOqCD22kMM6ujYVbQvZFSB4FXiHPDotl6dQqQ8-Oav6WhTdCEL7gR5TftaHKyG5p3vdu1kzWYKtHSBghjvYpzQ',
    seller: { name: 'Jordan L.', avatar: '', rating: 4.9, reviewsCount: 18, joinedYear: 2023, isVerified: true },
    pickup: { location: 'Science Center Lounge', availability: 'Monday - Friday, 10AM - 5PM', paymentMethods: ['Venmo', 'CampusPay'], mapImage: '' },
    isVerifiedStudent: true,
    postedTime: '2 mins ago'
  }
];

const SEED_PURCHASES = [
  {
    id: 'pur-1',
    productId: 'prod-org-chem-essentials',
    title: 'Organic Chemistry Essentials',
    price: 85.00,
    image: '',
    date: 'Sept 12, 2024',
    status: 'Completed'
  },
  {
    id: 'pur-2',
    productId: 'prod-mesh-chair',
    title: 'Ergonomic Mesh Desk Chair',
    price: 145.00,
    image: '',
    date: 'Sept 28, 2024',
    status: 'Processing'
  }
];

const SEED_REPORTS = [
  {
    productId: 'prod-ti84',
    reason: 'Incorrect Price',
    details: 'The listing states original price is Rs. 149 and selling price is Rs. 95, but the market value is much lower.',
    timestamp: new Date().toLocaleDateString()
  }
];

// ─── Seed Functions ──────────────────────────────────────────────────

async function seedCollection(collectionName, data, idField = 'id') {
  const existing = await getDocs(collection(db, collectionName));
  if (!existing.empty) {
    console.log(`  ⚠  Collection "${collectionName}" already has ${existing.size} docs — skipping.`);
    return;
  }

  for (const item of data) {
    const docId = item[idField] || item.productId || `auto-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    await setDoc(doc(db, collectionName, docId), item);
  }
  console.log(`  ✅ Seeded "${collectionName}" with ${data.length} records.`);
}

async function main() {
  console.log('\n🌱 CampusMart — Seeding Firestore Database\n');

  try {
    await seedCollection('products', SEED_PRODUCTS, 'id');
    await seedCollection('purchases', SEED_PURCHASES, 'id');
    await seedCollection('product_reports', SEED_REPORTS, 'productId');

    console.log('\n✨ Seed complete!\n');
  } catch (error) {
    console.error('\n❌ Seed failed:', error.message);
    process.exit(1);
  }
}

main();
