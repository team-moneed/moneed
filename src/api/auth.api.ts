import axios from 'axios';

type KakaoTokenParams = {
    code: string;
    state?: string;
};

type LoginResponse = {
    isExistingUser: boolean;
};

export const loginWithKakao = async ({ code, state }: KakaoTokenParams) => {
    const res = await axios.post<LoginResponse>('/api/auth/kakao/login', { code, state });
    return res.data;
};

export const refreshToken = async () => {
    const res = await axios.post<LoginResponse>('/api/auth/kakao/refresh');
    return res.data;
};
