import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  email: string;
  status: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  type: string | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  setUser: (user: User, token: string, isAdmin: boolean, type: string) => void;
  clearUser: () => void;
};

export const useAdminAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      type: null,
      isAdmin: false,
      isLoggedIn: false,
      setUser: (user, token, isAdmin, type) => set({ user, token, isAdmin, isLoggedIn: true, type }),
      clearUser: () => set({ user: null, token: null, isAdmin: false, isLoggedIn: false, type: null }),
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({ token: state.token, isAdmin: state.isAdmin, type: state.type}),
    }
  )
);
