import api from './api';

export const register = (userData: { username: string; email: string; password: string; walletAddress: string }) => 
  api.post('/auth/register', userData);

export const login = (userData: { email: string; password: string }) => 
  api.post('/auth/login', userData);

export const getProfile = (token: string) => 
  api.get('/auth/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });