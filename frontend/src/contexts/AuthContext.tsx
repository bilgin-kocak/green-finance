import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProfile } from '../services/auth';

interface AuthContextType {
  user: any;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const response = await getProfile(token);
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
          setToken(null);
        }
      };
      fetchProfile();
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
