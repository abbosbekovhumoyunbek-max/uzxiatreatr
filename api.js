/**
 * UZXIAtreatr Production API Client Abstraction
 * Supports dynamic VITE_API_URL, Bearer token authorization, timeout handling, and fallback safety.
 */

import { storage } from '../utils/storage.js';

const getBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return 'http://localhost:5000/api';
};

export async function request(endpoint, options = {}) {
  const {
    method = 'GET',
    body = null,
    headers = {},
    timeout = 8000,
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const token = storage.get('auth_token', null);

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    signal: controller.signal,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Server so\'roviga javob kutish vaqti tugadi (Timeout).');
    }
    throw error;
  }
}

export const api = {
  get: (url, options) => request(url, { ...options, method: 'GET' }),
  post: (url, body, options) => request(url, { ...options, method: 'POST', body }),
  put: (url, body, options) => request(url, { ...options, method: 'PUT', body }),
  delete: (url, options) => request(url, { ...options, method: 'DELETE' }),
};
