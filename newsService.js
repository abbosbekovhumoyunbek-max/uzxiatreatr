import { api } from './api.js';
import { newsData } from '../data/news.js';

export const newsService = {
  async getNews(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);

      const queryString = params.toString();
      const url = `/news${queryString ? `?${queryString}` : ''}`;
      return await api.get(url);
    } catch (e) {
      console.warn('[newsService.getNews] Using offline fallback data:', e.message);
      return newsData;
    }
  },

  async getNewsById(id) {
    try {
      return await api.get(`/news/${id}`);
    } catch (e) {
      console.warn('[newsService.getNewsById] Using offline fallback data:', e.message);
      return newsData.find(n => n.id === id) || newsData[0];
    }
  },
};
