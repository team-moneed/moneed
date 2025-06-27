import axios from 'axios';

type KakaoTokenParams = {
    code: string;
    state: string;
    error: string;
    error_description: string;
};

type KakaoTokenResponse = {
    accessToken: string;
};

export const getKakaoToken = async ({ code, state, error, error_description }: KakaoTokenParams) => {
    const res = await axios.post<KakaoTokenResponse>('/api/auth/kakao', { code, state, error, error_description });
    return res.data;
};

export const refreshToken = async () => {
    const res = await axios.post<KakaoTokenResponse>('/api/auth/kakao/refresh');
    return res.data;
};
