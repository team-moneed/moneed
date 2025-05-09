import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    userId: number | null;
    isLoggedIn: boolean;
}

interface AuthActions {
    setUserId: (userId: number) => void;
    setLoginState: (isLoggedIn: boolean) => void;
    login: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        set => ({
            userId: null,
            isLoggedIn: false,
            setUserId: (userId: number) => set({ userId }),
            setLoginState: (isLoggedIn: boolean) => set({ isLoggedIn }),
            login: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
                set({ isLoggedIn: true });
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
            },
            logout: () => {
                set({ userId: null, isLoggedIn: false });
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            },
        }),
        {
            name: 'auth-storage',
        },
    ),
);

export default useAuthStore;
