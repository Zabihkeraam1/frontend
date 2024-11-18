
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  //id: string;
  //username: string;
  email: string;
  status: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setUser: (user: User, token: string, isLoggedIn: boolean) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      setUser: (user, token, isLoggedIn) => set({ user, token, isLoggedIn }),
      clearUser: () => set({ user: null, token: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, isLoggedIn: state.isLoggedIn }),
    }
  )
);
