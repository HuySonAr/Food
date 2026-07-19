import { useEffect, useState } from 'react';
import {
  getMeService,
  loginService,
  logoutService,
  refreshTokenService,
} from '../services/auth.service';
import { setAccessToken } from '../lib/axios';
import { AuthContext } from '../context/AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const result = await getMeService()
    setUser(result.data.data)
  }

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const newToken = await refreshTokenService();
        setAccessToken(newToken);
        await fetchUser()
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (email, password) => {
    const res = await loginService(email, password);
    const { accessToken, ...admin } = res.data.data;

    setAccessToken(accessToken);
    setUser(admin);
    return res.data;
  };

  const logout = async () => {
    try {
      await logoutService();
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
