/**
 * UZXIAtreatr LocalStorage Utility
 * Safe localStorage wrapper handling JSON parsing and browser restrictions.
 */

export const storage = {
  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(`uzxia_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn(`[storage.get] Error reading key "${key}":`, e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(`uzxia_${key}`, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`[storage.set] Error writing key "${key}":`, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(`uzxia_${key}`);
      return true;
    } catch (e) {
      console.warn(`[storage.remove] Error removing key "${key}":`, e);
      return false;
    }
  },
};
