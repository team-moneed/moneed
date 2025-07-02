import axios from 'axios';
import { http } from './request';

type KakaoTokenParams = {
    code: string;
    state?: string;
};

type LoginResponse = {
    isExistingUser: boolean;
};

export const login = async ({ code, state }: KakaoTokenParams) => {
    const res = await axios.post<LoginResponse>('/api/auth/kakao/login', { code, state });
    return res.data;
};

export const refreshToken = async () => {
    const res = await axios.post<LoginResponse>('/api/auth/kakao/refresh');
    return res.data;
};

export const logout = async ({ provider }: { provider: 'kakao' }) => {
    const res = await http.post(`/api/auth/${provider}/logout`);
    return res;
};
