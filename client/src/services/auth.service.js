import api from '@/services/api';

export async function login({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  return data.data;
}

export async function getCurrentUser() {
  const { data } = await api.get('/auth/me');
  return data.data.user;
}
