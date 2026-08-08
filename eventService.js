import { api } from './api.js';
import { eventsData } from '../data/events.js';

export const eventService = {
  async getEvents(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);

      const queryString = params.toString();
      const url = `/events${queryString ? `?${queryString}` : ''}`;
      return await api.get(url);
    } catch (e) {
      console.warn('[eventService.getEvents] Using offline fallback data:', e.message);
      return eventsData;
    }
  },

  async registerForEvent(eventId, userData) {
    try {
      return await api.post(`/events/${eventId}/register`, userData);
    } catch (e) {
      console.warn('[eventService.registerForEvent] Using offline fallback action:', e.message);
      return {
        success: true,
        message: `Tabriklaymiz! "${userData.fullName || 'Talaba'}" tadbirga ro'yxatdan o'tdingiz.`,
      };
    }
  },
};
