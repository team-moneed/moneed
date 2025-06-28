import axios from 'axios';
import 'server-only';
import { ProviderRepository } from '@/repositories/provider.repository';
import { deleteSession } from '@/lib/session';
import { refreshKakaoToken } from './kakao.api';
import { AxiosError } from 'axios';
import { getAccessToken } from './kis.api';
import { KISAccessTokenResponse } from '@/types/kis';

const providerRepository = new ProviderRepository();
let kisAccessToken: KISAccessTokenResponse | null = null;

const getKisInstance = () => {
    const instance = axios.create({
        baseURL: process.env.KIS_BASE_URL,
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            appkey: process.env.KIS_APP_KEY,
            appsecret: process.env.KIS_APP_SECRET,
        },
    });

    instance.interceptors.request.use(async config => {
        if (!kisAccessToken || new Date(kisAccessToken.access_token_token_expired) < new Date()) {
            kisAccessToken = await getAccessToken();
            kisAccessToken.access_token_token_expired = new Date(
                Date.now() + kisAccessToken.expires_in * 1000,
            ).toISOString();
        }
        const { access_token, token_type } = kisAccessToken;
        config.headers.Authorization = `${token_type} ${access_token}`;
        return config;
    });

    instance.interceptors.response.use(
        async response => {
            return response;
        },
        async error => {
            console.error(error.response?.data);
            return Promise.reject(error);
        },
    );
    return instance;
};

const getKakaoInstance = () => {
    const instance = axios.create();

    instance.interceptors.request.use(async config => {
        try {
            if (config.headers.Authorization) {
                const token = (config.headers.Authorization as string).split(' ')[1];
                const providerData = await providerRepository.getTokenExpiration('kakao', token);
                if (providerData) {
                    const isAcessTokenExpired = providerData.accessTokenExpiresIn < new Date();
                    const isRefreshTokenExpired = providerData.refreshTokenExpiresIn < new Date();

                    if (!isAcessTokenExpired && !isRefreshTokenExpired) {
                        config.headers.Authorization = `Bearer ${providerData.accessToken}`;
                        return config;
                    } else if (isAcessTokenExpired) {
                        const newToken = await refreshKakaoToken(providerData.refreshToken);
                        config.headers.Authorization = `Bearer ${newToken.access_token}`;
                        await providerRepository.updateTokenData(
                            {
                                provider: 'kakao',
                                providerUserId: providerData.providerUserId,
                            },
                            {
                                accessToken: newToken.access_token,
                                refreshToken: newToken.refresh_token,
                                accessTokenExpiresIn: new Date(Date.now() + newToken.expires_in * 1000),
                                refreshTokenExpiresIn: newToken.refresh_token_expires_in
                                    ? new Date(Date.now() + newToken.refresh_token_expires_in * 1000)
                                    : undefined,
                            },
                        );
                        return config;
                    } else if (isRefreshTokenExpired) {
                        await providerRepository.delete('kakao', providerData.providerUserId);
                        await deleteSession();
                        return Promise.reject(new AxiosError('Token expired'));
                    }
                }
                return config;
            }
            return Promise.reject(new AxiosError('Authorization header is required'));
        } catch (error) {
            console.error('Failed to get Kakao token expiration:', (error as AxiosError).response?.data);
            return Promise.reject(error);
        }
    });

    instance.interceptors.response.use(response => {
        try {
            return response;
        } catch (error) {
            console.error('Failed to get Kakao token expiration:', (error as AxiosError).response?.data);
            return Promise.reject(error);
        }
    });

    return instance;
};

export const kis = getKisInstance();
export const kakao = getKakaoInstance();
