import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEY } from '@/constants/token';

interface AuthState {
    accessToken: string | null;
}

interface AuthActions {
    setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        set => ({
            // TODO: UserInfo 저장 필요 (로그인 시 저장, 로그아웃 시 삭제) (UserStore와 연동이 가능한가?)
            accessToken: null,
            setAccessToken: (accessToken: string) => set({ accessToken }),
        }),
        {
            name: STORAGE_KEY.ACCESS_TOKEN,
        },
    ),
);

export default useAuthStore;
