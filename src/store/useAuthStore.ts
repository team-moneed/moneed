import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  userId: number | null;
  isLoggedIn: boolean;
}

interface AuthActions {
  setUserId: (userId: number) => void;
  setLoginState: (isLoggedIn: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      userId: null,
      isLoggedIn: false,
      setUserId: (userId: number) => set({ userId }),
      setLoginState: (isLoggedIn: boolean) => set({ isLoggedIn }),
      logout: () => {
        set({ userId: null, isLoggedIn: false });
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_refresh_token');
      },
    }),
    {
      name: 'auth-storage', 
    }
  )
);

export default useAuthStore;