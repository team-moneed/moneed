import axios from 'axios';
import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshToken } from './client/auth.api';

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
            if (!config.headers) {
                return config;
            }

            const authToken = sessionStorage.getItem('accessToken');

            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }
            return config;
        },
        (error: AxiosError) => {
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
                const data = await refreshToken();
                if (data.accessToken) {
                    sessionStorage.setItem('accessToken', data.accessToken);
                } else {
                    return Promise.reject(error);
                }
            }
            console.log(error);
            return Promise.reject(error);
        },
    );

    return instance;
};

export const http = Instance();
