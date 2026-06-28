/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Robust utility for simulated or actual mobile haptic feedback using Web Vibrate API.
 * Safely falls back if the browser/device does not support it (e.g. iOS Safari, desktop).
 */
export const triggerHaptic = (pattern: number | number[]) => {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }
};

export const hapticPatterns = {
  // Light tap for typing, minor selections, toggling wishlist
  light: 45,
  
  // Medium tap for sending messages, posting listings
  medium: 80,
  
  // Confirmed success state: like confirming a purchase or success notifications
  success: [100, 50, 100],
  
  // Distinct pulse for warning, reports, errors
  warning: [200, 80, 200],
  
  // Price drops alert trigger
  alert: [120, 40, 120]
};
