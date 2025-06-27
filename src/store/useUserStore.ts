import { refreshToken } from '@/api/auth.api';
import { decodeToken, isTokenExpired } from '@/lib/auth';
import { UserInfo } from '@/types/user';
import { create } from 'zustand';

interface UserState {
    userInfo: UserInfo | null;
}

interface UserAction {
    setUserInfo: (userInfo: UserInfo) => void;
    getUserInfo: () => UserInfo | null;
    refreshUserInfo: () => Promise<null | undefined>;
    clearUserInfo: () => void;
}

export const useUserStore = create<UserState & UserAction>((set, get) => ({
    userInfo: null,
    setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
    getUserInfo: () => {
        const { userInfo } = get();

        if (!isTokenExpired()) {
            return userInfo;
        }

        set({ userInfo: null });
        return null;
    },
    refreshUserInfo: async () => {
        const data = await refreshToken();

        const decodedInfo = decodeToken(data.accessToken);

        if (!decodedInfo) {
            set({ userInfo: null });
            return null;
        }

        const { id, nickname, profileImage } = decodedInfo;

        set({ userInfo: { id, nickname, profileImage } });
    },
    clearUserInfo: () => {
        set({ userInfo: null });
    },
}));

export default useUserStore;
