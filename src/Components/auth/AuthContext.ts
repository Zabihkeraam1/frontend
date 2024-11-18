import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// تایپ‌ها برای داده‌های کاربر و تابع‌های کانتکست
interface User {
  name: string;
  email: string;
  // سایر فیلد‌های کاربر را می‌توانید اینجا اضافه کنید
}

interface AuthContextType {
  authToken: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// ایجاد Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [user, setUser] = useState<User | null>(null);

  // تابع ورود کاربر و ذخیره توکن
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string }>('http://localhost:8000/api/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      await fetchProfile();
    } catch (error) {
      console.error('Login error', error);
    }
  };

  // تابع خروج کاربر و حذف توکن
  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      localStorage.removeItem('authToken');
      setAuthToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error', error);
    }
  };


  // تابع دریافت پروفایل کاربر
  const fetchProfile = async () => {
    if (authToken) {
      try {
        const response = await axios.get<User>('http://localhost:8000/api/users/profile', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Fetch profile error', error);
      }
    }
  };

  // فراخوانی تابع دریافت پروفایل در زمان تغییر توکن
  useEffect(() => {
    if (authToken) {
      fetchProfile();
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken , user, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
