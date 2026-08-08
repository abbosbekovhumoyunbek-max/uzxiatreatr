import { api } from './api.js';
import { coursesData } from '../data/courses.js';

export const courseService = {
  async getCourses(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.level) params.append('level', filters.level);
      if (filters.search) params.append('search', filters.search);

      const queryString = params.toString();
      const url = `/courses${queryString ? `?${queryString}` : ''}`;
      return await api.get(url);
    } catch (e) {
      console.warn('[courseService.getCourses] Using offline fallback data:', e.message);
      return coursesData;
    }
  },

  async getCourseById(id) {
    try {
      return await api.get(`/courses/${id}`);
    } catch (e) {
      console.warn('[courseService.getCourseById] Using offline fallback data:', e.message);
      return coursesData.find(c => c.id === id) || coursesData[0];
    }
  },
};
