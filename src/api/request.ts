import axios from 'axios';
import { AxiosInstance } from 'axios';

const Instance = (): AxiosInstance => {
    const instance: AxiosInstance = axios.create({
        withCredentials: true,
        baseURL: process.env.NEXT_PUBLIC_MONEED_BASE_URL,
        headers: {
            'Content-type': 'application/json',
        },
    });

    return instance;
};

export const http = Instance();
