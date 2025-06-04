import axios from 'axios';

type KakaoTokenParams = {
    code: string;
    state?: string;
};

type KakaoTokenResponse = {
    isExistingUser: boolean;
};

export const loginWithKakao = async ({ code, state }: KakaoTokenParams) => {
    const res = await axios.post<KakaoTokenResponse>('/api/auth/kakao', { code, state });
    return res.data;
};

export const refreshToken = async () => {
    const res = await axios.post<KakaoTokenResponse>('/api/auth/kakao/refresh');
    return res;
};
