import axios from 'axios';
import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshToken } from './auth.api';

const Instance = (): AxiosInstance => {
    const instance: AxiosInstance = axios.create({
        withCredentials: true,
        baseURL: process.env.NEXT_PUBLIC_MONEED_BASE_URL,
        headers: {
            'Content-type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            return config;
        },
        (error: AxiosError) => {
            console.error(error.response?.data);
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error: AxiosError) => {
            if (error.response?.status === 401) {
                // access token 재발급
                const response = await refreshToken();
                if (response.status === 200) {
                    console.log('access token 재발급 성공');
                    return Promise.resolve(response);
                } else {
                    alert('세션이 만료되었습니다. 로그인을 다시 해주세요.');
                    window.location.href = '/onboarding';
                    console.error(error.response?.data);
                    return Promise.reject(error);
                }
            }
        },
    );

    return instance;
};

export const http = Instance();
