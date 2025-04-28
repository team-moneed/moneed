import axios from 'axios';
import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_PATH = '';

const Instance = (): AxiosInstance => {
    const instance: AxiosInstance = axios.create({
        baseURL: BASE_PATH,
        headers: {
            'Content-type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            if (!config.headers) {
                return config;
            }

            const authToken = localStorage.getItem('token');

            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }
            return config;
        },
        (error: AxiosError) => {
            console.log(error);
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error: AxiosError) => {
            // if () {

            // }
            return Promise.reject(error);
        },
    );

    return instance;
};

export const http = Instance();
