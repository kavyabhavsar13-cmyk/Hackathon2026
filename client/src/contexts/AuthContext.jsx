import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '@/services/auth.service';

const AuthContext = createContext(null);

// Dev-only: set VITE_SKIP_AUTH=true in client/.env to preview the app without a
// running backend. Never enable this in a real deployment.
const SKIP_AUTH = import.meta.env.VITE_SKIP_AUTH === 'true';
const MOCK_USER = { fullName: 'Jane Doe', email: 'jane@example.com', role: 'Fleet Manager' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(SKIP_AUTH ? MOCK_USER : null);
  const [isLoading, setIsLoading] = useState(!SKIP_AUTH);

  useEffect(() => {
    if (SKIP_AUTH) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    authService
      .getCurrentUser()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function login(credentials) {
    const { user: loggedInUser, token } = await authService.login(credentials);
    localStorage.setItem('token', token);
    setUser(loggedInUser);
    return loggedInUser;
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
