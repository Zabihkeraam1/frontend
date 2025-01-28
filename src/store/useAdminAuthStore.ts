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
  permission: string | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  setUser: (user: User, token: string, isAdmin: boolean, type: string, permission: string) => void;
  clearUser: () => void;
};

export const useAdminAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      type: null,
      permission: null,
      isAdmin: false,
      isLoggedIn: false,
      setUser: (user, token, isAdmin, type, permission) => set({ user, token, isAdmin, isLoggedIn: true, type, permission }),
      clearUser: () => set({ user: null, token: null, isAdmin: false, isLoggedIn: false, type: null, permission: null }),
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({ token: state.token, isAdmin: state.isAdmin, type: state.type, permission: state.permission }),
    }
  )
);
