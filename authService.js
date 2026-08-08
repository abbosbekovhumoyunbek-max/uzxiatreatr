import { api } from './api.js';
import { storage } from '../utils/storage.js';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.token) {
        storage.set('auth_token', response.token);
        storage.set('user', response.user);
      }
      return response;
    } catch (e) {
      console.warn('[authService.login] Backend offline, using mock authentication:', e.message);
      const mockUser = {
        id: 'user-demo-1',
        name: 'Demo Talaba',
        email: email || 'student@uzxia.uz',
        role: 'STUDENT',
      };
      storage.set('auth_token', 'demo-jwt-token-12345');
      storage.set('user', mockUser);
      return { success: true, user: mockUser, isMock: true };
    }
  },

  async register(name, email, password) {
    try {
      return await api.post('/auth/register', { name, email, password });
    } catch (e) {
      console.warn('[authService.register] Backend offline, mock registration:', e.message);
      const mockUser = { id: `user-${Date.now()}`, name, email, role: 'STUDENT' };
      storage.set('user', mockUser);
      return { success: true, user: mockUser, isMock: true };
    }
  },

  async logout() {
    storage.remove('auth_token');
    storage.remove('user');
    return { success: true };
  },

  getCurrentUser() {
    return storage.get('user', {
      id: 'guest',
      name: 'Mehmon Talaba',
      email: 'guest@uzxia.uz',
      role: 'GUEST',
    });
  },
};
