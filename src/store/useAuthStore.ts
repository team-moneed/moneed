import { STORAGE_KEY } from '@/constants/token';
import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
}

interface AuthActions {
    setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthState & AuthActions>()(set => ({
    // TODO: UserInfo 저장 필요 (로그인 시 저장, 로그아웃 시 삭제) (UserStore와 연동이 가능한가?)
    accessToken: null,
    setAccessToken: (accessToken: string) => {
        sessionStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
        set({ accessToken });
    },
}));

export default useAuthStore;
