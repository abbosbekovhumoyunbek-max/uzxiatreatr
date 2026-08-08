import { api } from './api.js';
import { quizQuestionsData } from '../data/quizQuestions.js';

export const quizService = {
  async getQuizzes(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);

      const queryString = params.toString();
      const url = `/quizzes${queryString ? `?${queryString}` : ''}`;
      return await api.get(url);
    } catch (e) {
      console.warn('[quizService.getQuizzes] Using offline fallback data:', e.message);
      return quizQuestionsData;
    }
  },

  async submitAttempt(quizId, attemptData) {
    try {
      return await api.post(`/quizzes/${quizId}/attempt`, attemptData);
    } catch (e) {
      console.warn('[quizService.submitAttempt] Using offline fallback action:', e.message);
      return { success: true, isMock: true };
    }
  },
};
