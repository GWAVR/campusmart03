/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * API Client Layer
 * 
 * Replaces direct Firestore SDK calls with fetch() calls to the Express backend.
 * All functions maintain the same signatures as the original Firebase module
 * so the rest of the application doesn't need to change.
 */

import { Product, PurchaseRecord, ChatMessage } from '../types';
import { ProductReport } from '../components/ProfileScreen';

// In production, set VITE_API_URL to your Render backend URL (e.g. https://campusmart-api.onrender.com/api)
// In development, defaults to '/api' which is proxied by Vite to localhost:5000
const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Generic fetch wrapper with error handling.
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `API error: ${response.status}`);
  }

  return data;
}

// ─── Products ────────────────────────────────────────────────────────

/**
 * Fetch all products from the API.
 * If the API returns an empty list, seeds are handled server-side.
 */
export async function getProductsFromFirebase(initialProducts: Product[]): Promise<Product[]> {
  try {
    const response = await apiFetch<{ success: boolean; data: Product[] }>('/products');
    if (response.data && response.data.length > 0) {
      return response.data;
    }
    // If empty, seed via API
    for (const product of initialProducts) {
      await saveProductToFirebase(product);
    }
    return initialProducts;
  } catch (error) {
    console.error('Failed to fetch products from API:', error);
    return initialProducts;
  }
}

/**
 * Add or update a product via the API.
 */
export async function saveProductToFirebase(product: Product): Promise<void> {
  try {
    await apiFetch('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  } catch (error) {
    console.error('Failed to save product:', error);
  }
}

/**
 * Remove a product via the API.
 */
export async function removeProductFromFirebase(productId: string): Promise<void> {
  try {
    await apiFetch(`/products/${productId}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Failed to remove product:', error);
  }
}

// ─── Users (Saved Items) ────────────────────────────────────────────

/**
 * Fetch saved product IDs for a specific user email.
 */
export async function getSavedIdsFromFirebase(email: string, defaultIds: string[]): Promise<string[]> {
  if (!email) return defaultIds;
  try {
    const response = await apiFetch<{ success: boolean; data: string[] }>(
      `/users/${encodeURIComponent(email)}/saved`
    );
    if (response.data && response.data.length > 0) {
      return response.data;
    }
    // Initialize with defaults if empty
    await saveSavedIdsToFirebase(email, defaultIds);
    return defaultIds;
  } catch (error) {
    console.error('Failed to fetch saved IDs:', error);
    return defaultIds;
  }
}

/**
 * Update saved product IDs for a specific user email.
 */
export async function saveSavedIdsToFirebase(email: string, savedIds: string[]): Promise<void> {
  if (!email) return;
  try {
    await apiFetch(`/users/${encodeURIComponent(email)}/saved`, {
      method: 'PUT',
      body: JSON.stringify({ savedProductIds: savedIds }),
    });
  } catch (error) {
    console.error('Failed to save saved IDs:', error);
  }
}

// ─── Purchases ───────────────────────────────────────────────────────

/**
 * Fetch purchase history from the API.
 */
export async function getPurchasesFromFirebase(initialHistory: PurchaseRecord[]): Promise<PurchaseRecord[]> {
  try {
    const response = await apiFetch<{ success: boolean; data: PurchaseRecord[] }>('/purchases');
    if (response.data && response.data.length > 0) {
      return response.data;
    }
    // Seed initial purchases if empty
    for (const record of initialHistory) {
      await addPurchaseToFirebase(record);
    }
    return initialHistory;
  } catch (error) {
    console.error('Failed to fetch purchases:', error);
    return initialHistory;
  }
}

/**
 * Save a single purchase record via the API.
 */
export async function addPurchaseToFirebase(record: PurchaseRecord): Promise<void> {
  try {
    await apiFetch('/purchases', {
      method: 'POST',
      body: JSON.stringify(record),
    });
  } catch (error) {
    console.error('Failed to add purchase:', error);
  }
}

// ─── Reports ─────────────────────────────────────────────────────────

/**
 * Fetch product reports from the API.
 */
export async function getReportsFromFirebase(initialReports: ProductReport[]): Promise<ProductReport[]> {
  try {
    const response = await apiFetch<{ success: boolean; data: ProductReport[] }>('/reports');
    if (response.data && response.data.length > 0) {
      return response.data;
    }
    // Seed initial reports if empty
    for (const report of initialReports) {
      await addReportToFirebase(report);
    }
    return initialReports;
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return initialReports;
  }
}

/**
 * Save a product report via the API.
 */
export async function addReportToFirebase(report: ProductReport): Promise<void> {
  try {
    await apiFetch('/reports', {
      method: 'POST',
      body: JSON.stringify(report),
    });
  } catch (error) {
    console.error('Failed to add report:', error);
  }
}

/**
 * Delete a product report via the API.
 */
export async function removeReportFromFirebase(productId: string): Promise<void> {
  try {
    await apiFetch(`/reports/${productId}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Failed to remove report:', error);
  }
}

// ─── Chats ───────────────────────────────────────────────────────────

/**
 * Fetch chat messages for a specific product context.
 */
export async function getChatMessagesFromFirebase(productId: string, initialMessages: ChatMessage[]): Promise<ChatMessage[]> {
  try {
    const response = await apiFetch<{ success: boolean; data: ChatMessage[] }>(
      `/chats/${productId}`
    );
    if (response.data && response.data.length > 0) {
      return response.data;
    }
    // Seed initial chat messages if empty
    await saveChatMessagesToFirebase(productId, initialMessages);
    return initialMessages;
  } catch (error) {
    console.error('Failed to fetch chat messages:', error);
    return initialMessages;
  }
}

/**
 * Save chat messages for a specific product context.
 */
export async function saveChatMessagesToFirebase(productId: string, messages: ChatMessage[]): Promise<void> {
  try {
    await apiFetch(`/chats/${productId}`, {
      method: 'POST',
      body: JSON.stringify({ messages }),
    });
  } catch (error) {
    console.error('Failed to save chat messages:', error);
  }
}
