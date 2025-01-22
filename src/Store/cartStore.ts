import { create } from "zustand";

interface CartState {
  cartCount: number; // تعداد کتاب‌های موجود در کارت
  setCartCount: (count: number) => void; // تابع برای به‌روزرسانی تعداد
  incrementCartCount: () => void; // افزایش تعداد
  decrementCartCount: () => void; // کاهش تعداد
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  incrementCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  decrementCartCount: () => set((state) => ({ cartCount: state.cartCount - 1 })),
}));
