/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, PurchaseRecord, ChatThread } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-eng-math',
    title: 'Engineering Mathematics',
    price: 45.00,
    originalPrice: 95.00,
    condition: 'Like New',
    category: 'Textbooks',
    description: `Barely used 8th edition textbook for Engineering Mathematics. This is the gold standard for foundation engineering courses. I bought it last semester but ended up using my tablet more often, so the pages are crisp and completely unmarked.

No highlighting or handwritten notes inside. Spine is intact with no creases or damage. Includes access to online portal (unscratched code). Essential for MECH101 and CIVIL200 students.

Happy to meet anywhere near the Engineering South building or the Main Library for the handover. Price is negotiable if you're buying other books I've listed.`,
    specifications: {
      'Author': 'K.A. Stroud',
      'Edition': '8th Edition',
      'Publisher': 'Red Globe Press',
      'ISBN': '978-1352010275',
      'Format': 'Paperback',
      'Language': 'English'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCwHBwm2Zx8wPBsm06nsejQtiksRZeZs35VsVyIirARQk2wrtS6v-oUywewjBB8TSuTnFTRWQaeDyQFvzDBotiR6Qlg4orS2sNuVmsrdDg1GJhYz8O_KxwxBeTGN7x66n0kXU2uyGv4cd4FJB1zNg78nSWGYKjHzK6C6iNzcnI0SPPrcuvvdrTDUpfDLqHUXwNc17pzMdxoA-tkWcBrI8et5vQw5HYCBjcuA6OL4Z6jRZrXOI30d0RAHoVA1-mqfI5QBeFNsqudA',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbfCTvn-mLIV6MAQBguz8ITtAEOQ3WLbOZ20FGFAEkWtDjcliLiXx7bJr0NwLuiHXvCJPPbphKxqxpKs1qssrMYL5T6HVADCiAmOKXOmjTOv-rqjURZxl3IS97IQqMwJbLDEVWZ3I0rWbawvpsJLcAto5dZhal3IoXPJCrNDwdJqSMjqdPIzko2XuKn9RKQb2IzdYuGWXs_ZjBWZ7G4XcuG8ROxR_547KeTWnfI5-zrr1GzA_7ZfCfJYewQK4YGLuvqwJKh8HXTQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA5wb9clluPSAPfKUcmineMO02AjyJeCz9_TWclQwdF2Fejzj-T5q7fxO_8zRUQ2BMvjCkYyUYDaleaqvwTrxispQasKalfxOaUhi2xGB0M-VAvR3_1K8gqztAEINvR6TIDqPfdgtVkrxk6c_0Rkthq7kmQkEqwQqGZmHUaWHsLt6gG8kTqkUbj1G6g_kEqn2hzhIkuM4BoHbhKucjfSd6CQPwbsuGJ5gswhXOfLD35HPVn9sslvFMOAdiGpNI5eUIx6Ag-FeI5Fw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA5GpzcGPIzD6daR3QY_EFMzc27d_vr6TnjRiH063uawZ5pHm7tU4t_kPq4kLIkWaXLWQS1z-Lycp_LshjVshHzMUJj7ru2T-we8ibahbTx_SKkucxcEFyUvt30NH09h6wd4N_IfhSj51hJ04DPO3_jMQaVncHWyFN3HR6FVI1KoDoNhAdmE-pJ8Rf0dmut7N85v-3Eu8ItKLux7vHnXVHpXkQpu16GzLS-s43lO9DYPaXkoWAZlwBEgEhkqHS53CVX_P_vsMGtJw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBiAklIOXq0NcXDfykiJ0E7Yx8XSPAZpCZTSVm_yywLjlLnkDRTcJScTSDLNCZNQmi8mLDJzxocx9mAh7Q_n766JXedVdogOSxox0ymZKEEVJ8rXmEu2ku7RmUAQXksk6FuD3VNiRIdbzFYPpTgCrkPPiNAImHE2CchTojz0hfVENyakU8qFyM9cN8UjtleBPW4Iy08VGj6hD_euSKFz8eU3Yuitx2cZgwwbeSvM3Se8EdkdZvpJT3Z_jHSFXf9lY-qilxwXux3ag'
    ],
    seller: {
      name: 'Alex J.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx7bc7ksJGvH0rQdLkbJU65EyRnRVwivLmuVZVn_0hciCR9SrTIZ1ESKpa4sUSpUf6VQb-Ay1huP_B7EG4owpHzkmTmrhK8ko-yXhNMYxo5T-c3TuGRB0UICoQEoijLCUJuBzw2vA3Yp2qA01AyoINlq7CcxTb4v6yTnii6WdgSXQJoRYeMafQFy4AJWGelTriGS32zUIXS5WAlJlST3n63hro2aaMeRLPq6NocAYNn252QVYb4tETLkJG7BNvOLdm9978Sfo0MA',
      rating: 4.8,
      reviewsCount: 12,
      joinedYear: 2022,
      isVerified: true
    },
    pickup: {
      location: 'Central Library Piazza',
      availability: 'Available: Mon-Fri, 2PM - 6PM',
      paymentMethods: ['Cash', 'CampusPay'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
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
    description: `Selling my trusty TI-84 Plus CE calculator. In great condition with a few light surface scratches on the back cover. The screen is clear of scratch marks and works perfectly. Battery life is stellar; has only been charged twice during the semester. Comes with the charging cable, protective slipcase, and slide cover. Verified student!`,
    specifications: {
      'Model': 'TI-84 Plus CE',
      'Display': 'Color Backlit',
      'Battery': 'Rechargeable Li-ion',
      'Included Accessories': 'Protective Case, Charging Cable'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcAqN8NShQXi2Q1SWbRXYsvGA-0lUJGayTcXr1QAE-8oBloFHSLmy4Vrj8LhWKZG-FoSFWziy3MoPRmeOPlAx2oaNLPPLeDNaS0eKuK63L_9Urq5hNn-zJb2VFkx7UN92OcDx0qhbxDGFTwA1l82L90QWbjlFNbyvaiwoY21ILF5ZsWSwOUKapi7UoN4IM9Kq1X_r31jGS_cTgD0370f0f0s1f40mHUEdbu_0hmtOh25bnjg7UwBA1quogIKXQlHOM3bYI1tlt3Q',
    seller: {
      name: 'Alex Rivera',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCf8Sgl7bCh2pO487zW7qzlwcq9So5HdIit3IC_04GfLhstVXKLWHBqBolUnlP2NotOla7Q5NipTjUVJAOJ7-b9n6xI-aPfuKCbgG_nwqHsfkpVByN-dlvtQ0446lMq5uOL5MMfDJzq-j0Nk-ScjgE7kv21r0JRQiPpFuqE8ZXf4fyXapURany0TFUtL36AWXaZboieK6LRYGN3NovIcRfSL8B53AYRCYP1_jkb4Imaya03b2DBDaYDT3NjhnGXPu8nh-Gwub_2g',
      rating: 4.9,
      reviewsCount: 24,
      joinedYear: 2022,
      isVerified: true
    },
    pickup: {
      location: 'West Campus Dining Hall',
      availability: 'Available: Tue & Thu, 1PM - 4PM',
      paymentMethods: ['CampusPay', 'Venmo'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
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
    description: `A macro photograph of an Organic Chemistry textbook with a vibrant, colorful molecular structure illustration on its cover. The book is presented in a bright, clean university library setting with natural morning light streaming through windows. The style is professional and academic, featuring high-contrast navy and white accents. The mood is industrious and focused on student achievement.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZWla5JDCJVil4QS6Old6ROUHXYDyWUCmEKR8vVDkN4k06wnVPAAqSfKg-M6cgjRufkh-nqB8yQRNaj24re168lpulE3PtaPjdNC4by-_fTOm2BI4ghMRCNDivMcI9fbaIrO7HyCO_Bp5_78hEuz5f8DjcY3LFF9bS4qXIG3ib1BAT1AwlZnu2agGAF4PuJKhV_Uv3-rUxLL8eVi__17DDkwKJmOx_6Wjlct72la0j8_ItPJjeZ2889Buu2a0qaScvO1Nyzp8jQw',
    seller: {
      name: 'Sarah M.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCf8Sgl7bCh2pO487zW7qzlwcq9So5HdIit3IC_04GfLhstVXKLWHBqBolUnlP2NotOla7Q5NipTjUVJAOJ7-b9n6xI-aPfuKCbgG_nwqHsfkpVByN-dlvtQ0446lMq5uOL5MMfDJzq-j0Nk-ScjgE7kv21r0JRQiPpFuqE8ZXf4fyXapURany0TFUtL36AWXaZboieK6LRYGN3NovIcRfSL8B53AYRCYP1_jkb4Imaya03b2DBDaYDT3NjhnGXPu8nh-Gwub_2g',
      rating: 4.7,
      reviewsCount: 15,
      joinedYear: 2023,
      isVerified: true
    },
    pickup: {
      location: 'Science Center Courtyard',
      availability: 'Available: Wednesdays, 11AM - 1PM',
      paymentMethods: ['Cash', 'CampusPay'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
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
    description: `A modern, minimalist LED desk lamp with a matte white finish, positioned on a wooden study desk. The lighting is crisp and cool, creating sharp, clean shadows that emphasize its sleek industrial design. The background includes a blurred vision of a cozy student apartment during a twilight study session. Includes 3 color temperatures, variable dimmer, and a built-in USB port to charge your phone fast.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdalomsYxRFLe_CogdJXW574VY7pt6ff9R-NBFPHNZ7uK-IWu3ziRp7VPc16jpGVrkh8eNU0TNdrVo3NCf1HdRJygSyqICqz7lfn6P9-Rkzs7KHD07WHq43UQxwykvtPepi-wEGsYV9O19aUsXXUttymvRjOynh9mx7EGzofNqGxr-XoStLEfdZgtGJPNqAU2RUfMGOproZTEh7OkRJ4V-7ZuTwVgvQSaCfJHNtvyBoCubnlEhM3zflFr9DiAYQHd4wdO3psXUBg',
    seller: {
      name: 'Clara Oswald',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx7bc7ksJGvH0rQdLkbJU65EyRnRVwivLmuVZVn_0hciCR9SrTIZ1ESKpa4sUSpUf6VQb-Ay1huP_B7EG4owpHzkmTmrhK8ko-yXhNMYxo5T-c3TuGRB0UICoQEoijLCUJuBzw2vA3Yp2qA01AyoINlq7CcxTb4v6yTnii6WdgSXQJoRYeMafQFy4AJWGelTriGS32zUIXS5WAlJlST3n63hro2aaMeRLPq6NocAYNn252QVYb4tETLkJG7BNvOLdm9978Sfo0MA',
      rating: 4.8,
      reviewsCount: 8,
      joinedYear: 2024,
      isVerified: true
    },
    pickup: {
      location: 'Johnson Hall Lobby',
      availability: 'Available: Every day after 6PM',
      paymentMethods: ['Cash', 'Venmo'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
    isVerifiedStudent: true,
    postedTime: '1 day ago'
  },
  {
    id: 'prod-monitor',
    title: 'Dell 27" 4K Monitor - Like New',
    price: 180.00,
    originalPrice: 350.00,
    condition: 'Like New',
    category: 'Electronics',
    description: `A 27-inch 4K computer monitor displaying a vibrant campus landscape photograph. The screen is clean and free of glares, sitting on a minimalist black monitor arm. The room is a high-tech, modern student living space with soft ambient backlighting in light blue tones. Absolute premium condition. Zero dead pixels. Great for coding and graphic tasks!`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFBu-uJMw2uh54gk4P4Z7SAI6Tc7s0T87BDNd8Nzb8CBe2QUQBr5deaoYe6RZeblKTV-d1ZniEq1so-d5pTMJ46U0UX6mucBVPjKlGd3-MCXw0DUG-j_fG06k5ESonNRE83MbBZwooPp5d91xyf4zt7JuUsmHaOPEUKaLtoGu72g_a-9F4Ko1lIsUahsUWm9RNmxsJPLnk5NXk5ESCvSrIkYkzZhwCq4Y92vvIR36ffSsYgwlXXSKlj6dN1yJD_ABLTfvdU4lQgg',
    seller: {
      name: 'Marcus K.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs-k1buosZ14WMWs5ec7Y-Bsk52MJ3opHHC4iIXeFq-iz9LF_jJh3lPviUQ1dRGBT4zgZFT2nNVl04LmH6X8od4mXcrhpNR4NDpOdxvIBoGPw6TBuDEUe8kRrk43P4a8_r2FI1ZGKu5DBVINKOmLsPZIkW8yqryxMhoQUY89zSktWEnM6rUwLp2ASGc6Drn4Q6s9u8GF1Vu_drSedTcFo7fOgMq5mp0lDcCKvcFnIdH-tZaIBuiBXNngsbPPZVWSiXIbiwxsfB-g',
      rating: 5.0,
      reviewsCount: 3,
      joinedYear: 2023,
      isVerified: true
    },
    pickup: {
      location: 'North Campus Quad',
      availability: 'Available: Weekends, 10AM - 5PM',
      paymentMethods: ['CampusPay', 'Venmo'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
    isVerifiedStudent: true,
    postedTime: '3 days ago'
  },
  {
    id: 'prod-headphones',
    title: 'Sony WH-1000XM4 Noise Cancelling Headphones',
    price: 190.00,
    originalPrice: 349.00,
    condition: 'Like New',
    category: 'Electronics',
    description: `Premium noise-canceling headphones in matte navy blue resting on an open textbook. The image is shot with a shallow depth of field, focusing on the texture of the ear cushions. The scene is a busy campus coffee shop with soft, warm golden hour light. The style is modern, energetic, and lifestyle-oriented, emphasizing quality and the student experience. Complete box and documentation included!`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC84uytaAMbVHP72SmlegJm67BLaDP6Z5LI9lH9SgjQyPFcl-lZ0MCWVVWruog9llfzlvUsxPrdNgt9-9oCek2ZM5gZGRYC99qR5IqCDFaSrIDnH6HX_B5cW8uB48eNu4BxKY3Qw_Rs3MFKuQtAbkMSW2bqPIjrQZ6WhdtihQpHth3DpxiutfRaHv-9YEGgPYo5xN-MIFSq-2EuSvPCOcQ6w8rwfhIhxPOwiCILZQnYAiycst08RLoIe86Q6a083a9-InOPIl3HDQ',
    seller: {
      name: 'Alex J.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx7bc7ksJGvH0rQdLkbJU65EyRnRVwivLmuVZVn_0hciCR9SrTIZ1ESKpa4sUSpUf6VQb-Ay1huP_B7EG4owpHzkmTmrhK8ko-yXhNMYxo5T-c3TuGRB0UICoQEoijLCUJuBzw2vA3Yp2qA01AyoINlq7CcxTb4v6yTnii6WdgSXQJoRYeMafQFy4AJWGelTriGS32zUIXS5WAlJlST3n63hro2aaMeRLPq6NocAYNn252QVYb4tETLkJG7BNvOLdm9978Sfo0MA',
      rating: 4.8,
      reviewsCount: 12,
      joinedYear: 2022,
      isVerified: true
    },
    pickup: {
      location: 'Central Library Piazza',
      availability: 'Available: Mon-Fri, 2PM - 6PM',
      paymentMethods: ['Cash', 'CampusPay'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
    isVerifiedStudent: true,
    postedTime: '3 hrs ago'
  },
  {
    id: 'prod-bike',
    title: 'Specialized Allez Road Bike - Large',
    price: 450.00,
    originalPrice: 850.00,
    condition: 'Good',
    category: 'Bicycles',
    description: `A sleek, lightweight road bike leaning against a brick campus wall. The afternoon sun creates long, artistic shadows. The bike is in excellent condition, with polished metal parts and clean tires. The background shows a hint of green campus lawns and students walking. The image captures a sense of freedom and efficient campus travel in a high-quality photographic style. Large frame (suited for 5'10" to 6'2").`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6D9PLYOnhVD_tCqkiICfiG5bNsFZed_6LO-hzx7QyvWfjCRF-cve2MgOgXSiB_5e0lkJcnZd3007B9XE6zRKQRdRUqpCVRC1iPPSQT1ZRsgXOunlc6WCQx2Fka2SK--p9KoM7PH1pEA-KHVq2O_na6J0rd3PIgw5Tr1BSlIc03u7Ylp5f-Ra7gBmGsR5DSTciwYo1kRQQROh1jjr836hV171tkCErwy2aaftTIfe3x6-_sOTboa3PFR4UyF4FAWR2uuJIeRsk9g',
    seller: {
      name: 'Timothee B.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx7bc7ksJGvH0rQdLkbJU65EyRnRVwivLmuVZVn_0hciCR9SrTIZ1ESKpa4sUSpUf6VQb-Ay1huP_B7EG4owpHzkmTmrhK8ko-yXhNMYxo5T-c3TuGRB0UICoQEoijLCUJuBzw2vA3Yp2qA01AyoINlq7CcxTb4v6yTnii6WdgSXQJoRYeMafQFy4AJWGelTriGS32zUIXS5WAlJlST3n63hro2aaMeRLPq6NocAYNn252QVYb4tETLkJG7BNvOLdm9978Sfo0MA',
      rating: 4.5,
      reviewsCount: 6,
      joinedYear: 2022,
      isVerified: false
    },
    pickup: {
      location: 'Dorm Complex Gates',
      availability: 'Available: Weekdays after 4PM',
      paymentMethods: ['Cash', 'CampusPay'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
    isVerifiedStudent: true,
    postedTime: '1 week ago'
  },
  {
    id: 'prod-macbook',
    title: 'MacBook Air M1 2020',
    price: 450.00,
    originalPrice: 999.00,
    condition: 'Good',
    category: 'Electronics',
    description: `A clean, close-up product photo of a silver laptop resting on a minimalist desk. The background is a slightly blurred college dorm room with soft ambient lighting. The shot is crisp and professional, emphasizing the device's sleek design. Silver, 8GB RAM, 256GB SSD. Battery health is at 91% with 112 cycles. Perfect laptop for active college students.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9JPDnlgjY_fJhQZ4EBx1OcRMB2eBPX0PwRllg8GRaLcYC-k2jKuHXmAfm09nCWMVGmazvSCvSOXUXcaGuDmV8FGrZ46pxHURxkJ6_bdpIdemlc_XuPmnB23YJyqBx5fbN4eUgUyRP3pi_1XTBVIAQ_Pm61ailTIxqMLgwjAeoO6WtR4snrdNhuOqCD22kMM6ujYVbQvZFSB4FXiHPDotl6dQqQ8-Oav6WhTdCEL7gR5TftaHKyG5p3vdu1kzWYKtHSBghjvYpzQ',
    seller: {
      name: 'Jordan L.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs-k1buosZ14WMWs5ec7Y-Bsk52MJ3opHHC4iIXeFq-iz9LF_jJh3lPviUQ1dRGBT4zgZFT2nNVl04LmH6X8od4mXcrhpNR4NDpOdxvIBoGPw6TBuDEUe8kRrk43P4a8_r2FI1ZGKu5DBVINKOmLsPZIkW8yqryxMhoQUY89zSktWEnM6rUwLp2ASGc6Drn4Q6s9u8GF1Vu_drSedTcFo7fOgMq5mp0lDcCKvcFnIdH-tZaIBuiBXNngsbPPZVWSiXIbiwxsfB-g',
      rating: 4.9,
      reviewsCount: 18,
      joinedYear: 2023,
      isVerified: true
    },
    pickup: {
      location: 'Science Center Lounge',
      availability: 'Available: Monday - Friday, 10AM - 5PM',
      paymentMethods: ['Venmo', 'CampusPay'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
    isVerifiedStudent: true,
    postedTime: '2 mins ago'
  },
  {
    id: 'prod-bundle',
    title: 'Pre-Med Textbook Bundle',
    price: 85.00,
    originalPrice: 190.00,
    condition: 'Good',
    category: 'Textbooks',
    description: `A stack of popular medical textbooks including Principles of Anatomy and Physiology, Organic Chemistry, and Biology, photographed on a bright study table. The textbooks are in good condition, spine completely intact, minimal pencil markings inside. Indispensable prep materials for first and second-year pre-med study.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB33efOD4MjqrqLSxt0PT34aS_BvpFPoE69o8xliH110s-LTZay5yZh_BVuSQL0Zrsp1pxpQvrPkOcu8m8eBGRZT2Nt6DkfjhB2O3l7pXPz2RH-mROCFwphbsb3bKs2hUOM-xbhgDecCdD5eCX3YA8dFY0x6a59aJMLA-ujRFTuN8MNb2U4k-PHy2G0Ih9NI5pDp-fVX0A7bKs-AVOV0T9cfdhPxAExla1dBBZv493kET56d6KOR3QpB6NTLnHpPsNrd5R_A7HJ9A',
    seller: {
      name: 'Sophia V.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCf8Sgl7bCh2pO487zW7qzlwcq9So5HdIit3IC_04GfLhstVXKLWHBqBolUnlP2NotOla7Q5NipTjUVJAOJ7-b9n6xI-aPfuKCbgG_nwqHsfkpVByN-dlvtQ0446lMq5uOL5MMfDJzq-j0Nk-ScjgE7kv21r0JRQiPpFuqE8ZXf4fyXapURany0TFUtL36AWXaZboieK6LRYGN3NovIcRfSL8B53AYRCYP1_jkb4Imaya03b2DBDaYDT3NjhnGXPu8nh-Gwub_2g',
      rating: 4.8,
      reviewsCount: 3,
      joinedYear: 2024,
      isVerified: true
    },
    pickup: {
      location: 'Medical Campus Courtyard',
      availability: 'Available: Tuesdays, 3PM - 6PM',
      paymentMethods: ['Cash', 'CampusPay'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
    isVerifiedStudent: true,
    postedTime: '15 mins ago'
  },
  {
    id: 'prod-biology',
    title: 'Biology: Global Approach',
    price: 45.00,
    originalPrice: 89.00,
    condition: 'Good',
    category: 'Textbooks',
    description: `A stack of popular medical textbooks and a clean white lab coat arranged neatly on a library table. The lighting is crisp and natural, highlighting a verified student community vibe. This textbook is Campbell Biology 11th Global Edition. No highlights inside, crisp pages. Excellent prep.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3SCPdnNeAxGr2XMbXKa9TwlcsPqQRBAUDJNl9lnM0IDv3caB8GZ5JwHaN7hU5VZgZbi7yCMC6E9_EsA9ukRPcvarXHHOTJXfUGud0gPNdsP--b-C6IAVDpCTjmzrlhUHZ_pTB072NgSsS5axhIZpZ3yLT7P1GXj1YgxgepOVXYgp3c2ppO5sxuxxkz3I1sKDdRb7b4rofOHj4NKMiC1gYZoogKeNYZ4rB_ABau9N_rP_dqtSV0K7fOMhdfh6ZoQ4dzpSWfprNZA',
    seller: {
      name: 'Nolan S.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCf8Sgl7bCh2pO487zW7qzlwcq9So5HdIit3IC_04GfLhstVXKLWHBqBolUnlP2NotOla7Q5NipTjUVJAOJ7-b9n6xI-aPfuKCbgG_nwqHsfkpVByN-dlvtQ0446lMq5uOL5MMfDJzq-j0Nk-ScjgE7kv21r0JRQiPpFuqE8ZXf4fyXapURany0TFUtL36AWXaZboieK6LRYGN3NovIcRfSL8B53AYRCYP1_jkb4Imaya03b2DBDaYDT3NjhnGXPu8nh-Gwub_2g',
      rating: 4.6,
      reviewsCount: 11,
      joinedYear: 2023,
      isVerified: true
    },
    pickup: {
      location: 'Central Library',
      availability: 'Available: Fri, 1PM - 5PM',
      paymentMethods: ['Cash', 'Venmo'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
    isVerifiedStudent: true,
    postedTime: '5 hrs ago'
  },
  {
    id: 'prod-nespresso',
    title: 'Nespresso Pixie',
    price: 75.00,
    originalPrice: 150.00,
    condition: 'Like New',
    category: 'Kitchen',
    description: `A professional-grade dorm kitchen set with a compact coffee maker and a set of ceramic mugs. The image is vibrant and well-lit, emphasizing a high-utility student-centric ecosystem. The style is modern, balancing trust navy backgrounds with pops of learning orange. Includes 10 coffee capsules. Super clean, like new!`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApjlIxv1nKaSLw7F_VTHmrgw0SnGiodzZkeT-50oN8t0k4SzuM0wCv-N8vP_fOE2kcRuI-BTS5BCnaU7xUGdjwfrE7vEbk46u-IsEH6dkar4pEynlGkqEYCtKQq7CnEVbG553SRkwoBx4vBbbQILUKLfaMVvIp7R7-xGFsarqKOMo9wm1oO9u8ibsli09USmp08os6Rm7oFdIppw3O6nnXMIFR_KNcH2hZt61Niz81OH0Q6Ot0FD27LaRx9R7he9KaHkdTa_SaPQ',
    seller: {
      name: 'Hannah B.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCf8Sgl7bCh2pO487zW7qzlwcq9So5HdIit3IC_04GfLhstVXKLWHBqBolUnlP2NotOla7Q5NipTjUVJAOJ7-b9n6xI-aPfuKCbgG_nwqHsfkpVByN-dlvtQ0446lMq5uOL5MMfDJzq-j0Nk-ScjgE7kv21r0JRQiPpFuqE8ZXf4fyXapURany0TFUtL36AWXaZboieK6LRYGN3NovIcRfSL8B53AYRCYP1_jkb4Imaya03b2DBDaYDT3NjhnGXPu8nh-Gwub_2g',
      rating: 4.9,
      reviewsCount: 7,
      joinedYear: 2023,
      isVerified: true
    },
    pickup: {
      location: 'East Hall Lounge',
      availability: 'Available: Wednesdays, 4PM - 7PM',
      paymentMethods: ['Venmo', 'CampusPay'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
    isVerifiedStudent: true,
    postedTime: 'Yesterday'
  },
  {
    id: 'prod-kit',
    title: 'Dorm Kitchen Essentials Kit',
    price: 25.00,
    originalPrice: 55.00,
    condition: 'Used',
    category: 'Kitchen',
    description: `A set of colorful ceramic mugs and a small electric kettle arranged on a kitchen counter. The scene is bright and airy, using a clean light-mode aesthetic with academic green accents. The image represents essential dorm gear for students in a clear, professional way. Perfect starter kit!`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC46sOBHqwOR5uAvrNUoxjss01RrwJTVVaEVKtDicHUcJhzK5nPgLlY-yrlnj536OY8DY41TKImHs4zr6Rl70Pu9Ns2dQmVBluA8hxEFMtjUsub1lC6pSGnRNaTNSfonJIgghwgeB-T1M6u3nNNQKcpxrW1FgzWZSGmd9xBH_2PZZEiX26nFMe_ExJKzbDstmZexnzY6E8glh6ZF-SBU3670aSPrxhJOOb8DN5Nx8EGVL2xJtBZ3XIyqUSnzH7MUw7-mPRQ0diZaw',
    seller: {
      name: 'Daryl W.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx7bc7ksJGvH0rQdLkbJU65EyRnRVwivLmuVZVn_0hciCR9SrTIZ1ESKpa4sUSpUf6VQb-Ay1huP_B7EG4owpHzkmTmrhK8ko-yXhNMYxo5T-c3TuGRB0UICoQEoijLCUJuBzw2vA3Yp2qA01AyoINlq7CcxTb4v6yTnii6WdgSXQJoRYeMafQFy4AJWGelTriGS32zUIXS5WAlJlST3n63hro2aaMeRLPq6NocAYNn252QVYb4tETLkJG7BNvOLdm9978Sfo0MA',
      rating: 4.4,
      reviewsCount: 9,
      joinedYear: 2022,
      isVerified: true
    },
    pickup: {
      location: 'Central Library Piazza',
      availability: 'Available: Tue & Thu after 5PM',
      paymentMethods: ['Cash', 'CampusPay'],
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-A3z-OiD2t9o6VmQcTsF06LhQEtimkkLYVcHQGkIKnrbv8z8J6aw52Xv4tOPwhygtr8zh-WCyPhip92292zc2RMutxnQWKPN7GdQ-NDY1o45Xu0-F6s7moFZ2FTnMRHIb92Ovjp5JPZuk047kRDgmWRb5XMIRmCeVZf-AwROo2tcM053XeP8ifGDX53T50HnHqV0M6LYjBICUKt_JjBdRPPSx8geq7shTEryYusHJyNSfJ4IRYOBixlzdkj8wCzcSGXJgHFBJVA'
    },
    isVerifiedStudent: true,
    postedTime: 'Yesterday'
  }
];

export const INITIAL_PURCHASE_HISTORY: PurchaseRecord[] = [
  {
    id: 'pur-1',
    productId: 'prod-org-chem-essentials',
    title: 'Organic Chemistry Essentials',
    price: 85.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbzxakp1tvZ-07_JMbemNQYoDZeT_bXnSXRbmZVnuJ4X4zsnOggY0EQXBuiNJ68AJ_X4sLV6ct4-3bczNnSCZ1869VAqlT4vU4jpVM3lxzQM3Xt98oyYD3SCLxhjsVebFwfpI07SaaMGLm9t6s8CWkTIcWolSGilkWH__qRpBJMBy1qjUUkkEBcs_whneaxDrkdQm6tNcohjkAVRkRAfLE5pImwB7u9X277k6J7c8MVujYp7ECr90ePdBqPtDV5vVlCsuCWIrQWw',
    date: 'Sept 12, 2024',
    status: 'Completed'
  },
  {
    id: 'pur-2',
    productId: 'prod-mesh-chair',
    title: 'Ergonomic Mesh Desk Chair',
    price: 145.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4lUMxsQfQQ7zJkruppvj2b_w_c5yslcuX36e502I_AXthHxwsMhx1Fb40BG698p3_AOQfmWPLE2ZzP9GLohf3liWoznw6TTENMjUxY9605euwFmCEFgahBPcQxcfXhVtzhyUsC6eDwQkSzAtXc0EhQ82zVWxPEa-IO-jaCPHseG4QzbQTKcFzdWVUI19HgGavdmsfJYJararCOfoEUFWUf7b3FIx4zeqaKM9Cky6GRUK28ODZHzzMTp01ffakrVyaNDAtAViPqA',
    date: 'Sept 28, 2024',
    status: 'Processing'
  },
  {
    id: 'pur-3',
    productId: 'prod-sci-calc',
    title: 'Scientific Graphing Calculator',
    price: 99.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHEFQ_4Da96oevXYXIs2-1D4P0KSKsWa1y5PDRwYRrmTKKr7B_mQAWI9mv8--Wh976cdFaViCbagns5b2wv7TnyFvhEbKahlWkA4nJTSP7Z6pbS_8Hb41GftfbsyFE2PVAeKly4qcBw0BqmLvj6btlGoBg9V5V0gZFpIssALAVtTTtda4ENiSwDAYqYSwhXueKjCtPQuBVrKpcPCIFk3meS38aaUUQ3kAlqRVQqVTyDPZkm7u4WYk3-lkneBixLNRYUWv51lbXoQ',
    date: 'Aug 15, 2024',
    status: 'Cancelled'
  },
  {
    id: 'pur-4',
    productId: 'prod-bedding-set',
    title: 'Luxury Dorm Bedding Set',
    price: 62.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMLfo0sRv3yDwWe49UTFnE75VwXesuwMw_JyzZT7-IMWx7mp5I64a8-I8SUsxE6ifSHm6JzWGtfg3evHBJoRU0DYBzi-m3JjL4tznqOhiLbiru5KcGJF7n6okFmKnlEqGGhcQX4hVORxfNHXmNdC4lAeyIA0T8d6Ysnx62X0tLMInApPI-EP2c4Fp4b8sbtvVgyNGwX7gIxtymGJLLMnFjtGpmPkK9q4bxWh1qaUrbRDgGZVeH-LH_mnlw8fCc6MqGnbWkFCUG5Q',
    date: 'July 02, 2024',
    status: 'Completed'
  }
];

export const INITIAL_CHATS: ChatThread[] = [
  {
    productId: 'prod-eng-math',
    productTitle: 'Engineering Mathematics',
    productPrice: 45,
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALAMXXdJ-RESqchkl8FXU7DyGGYihM91O8sDdD476DdK_yOQ-dSC7yGaIH6aaRmyOLSh2V1b_A1AD-mYjhoRlmEalf3FkiIibnEUp2Uc9vMHOoAyeKBZAYvt8Iq3RLX0dBZ6IO4sYHf2cjvaGmwvL5YAZX0N1WQ1XdeN99AiUHZGUqqVhd_KBweTMdKA6Ha7P_u6wWa3oeQSthEI9hgqMP6JfvsWKro3xbHflNQV7yvsDOq3BWIWIfRfCTKznVvQNhOlvJMJF3NA',
    sellerName: 'Alex J.',
    sellerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs-k1buosZ14WMWs5ec7Y-Bsk52MJ3opHHC4iIXeFq-iz9LF_jJh3lPviUQ1dRGBT4zgZFT2nNVl04LmH6X8od4mXcrhpNR4NDpOdxvIBoGPw6TBuDEUe8kRrk43P4a8_r2FI1ZGKu5DBVINKOmLsPZIkW8yqryxMhoQUY89zSktWEnM6rUwLp2ASGc6Drn4Q6s9u8GF1Vu_drSedTcFo7fOgMq5mp0lDcCKvcFnIdH-tZaIBuiBXNngsbPPZVWSiXIbiwxsfB-g',
    lastMessageTime: '10:30 AM',
    unread: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'buyer',
        text: 'Hi Alex! Is the Engineering Mathematics textbook still available?',
        time: '10:15 AM'
      },
      {
        id: 'msg-2',
        sender: 'seller',
        text: "Hey! Yes, it is. It's in great condition, only used for one semester.",
        time: '10:17 AM'
      },
      {
        id: 'msg-3',
        sender: 'buyer',
        text: 'Awesome. Would you take $40 for it? I can meet up on campus today.',
        time: '10:20 AM'
      },
      {
        id: 'msg-4',
        sender: 'seller',
        text: "Sure, I can do $40 since you're nearby. How about meeting at The Main Library? I'll be there around 2 PM.",
        time: '10:25 AM'
      },
      {
        id: 'msg-5',
        sender: 'seller',
        text: 'Here is the condition of the pages:',
        time: '10:26 AM',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS1gwepnMmBwxHPXRICi8lRJBEqujFHNoEb3mPBznNTh79_8PN99tvhzjxSoCRp7WgV4db2V9WfOvsME1kONMBmxLfdeuwiqarweOBx92365jMh8uD7XwYaLwTIP2TdE_hm57sfO_1AaZjkQQ0yflWv5rqQ7MgHFJkXjwO38ouAvoFGqHeyHpVSPX9jPwd52coWTkOuM2bZFP4-sRrqfeNeeUCWwrfEeHfnV7tZigGn5TiXEx5X_OeBLQ0AjO1pkK8xYYNWvNIHA',
        imageCaption: "Here's a quick shot of the pages – no highlighting!"
      },
      {
        id: 'msg-6',
        sender: 'buyer',
        text: "Looks perfect! The Main Library at 2 PM works for me. I'll be near the front entrance wearing a blue cap.",
        time: '10:30 AM'
      }
    ]
  }
];

export const MOCK_USER = {
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  university: 'University of Tech',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCf8Sgl7bCh2pO487zW7qzlwcq9So5HdIit3IC_04GfLhstVXKLWHBqBolUnlP2NotOla7Q5NipTjUVJAOJ7-b9n6xI-aPfuKCbgG_nwqHsfkpVByN-dlvtQ0446lMq5uOL5MMfDJzq-j0Nk-ScjgE7kv21r0JRQiPpFuqE8ZXf4fyXapURany0TFUtL36AWXaZboieK6LRYGN3NovIcRfSL8B53AYRCYP1_jkb4Imaya03b2DBDaYDT3NjhnGXPu8nh-Gwub_2g',
  memberSince: 2022,
  reviewsCount: 24,
  rating: 4.9,
  isVerified: true
};
