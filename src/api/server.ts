import axios from 'axios';
import 'server-only';
import { ProviderRepository } from '@/repositories/provider.repository';
import { KISTokenService } from '@/services/kis-token.service';
import { deleteSession } from '@/lib/session';
import { refreshKakaoToken } from './kakao.api';
import { AxiosError } from 'axios';

const providerRepository = new ProviderRepository();
const kisTokenService = new KISTokenService();

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
        try {
            // 토큰 서비스를 통해 유효한 토큰 가져오기
            const kisAccessToken = await kisTokenService.getValidToken();
            const { access_token, token_type } = kisAccessToken;
            config.headers.Authorization = `${token_type} ${access_token}`;
        } catch (error) {
            console.error('Failed to get KIS access token:', error);
            throw error;
        }

        return config;
    });

    instance.interceptors.response.use(
        async response => {
            return response;
        },
        async (error: AxiosError<{ msg_cd: string; rc_cd: string; msg1: string }>) => {
            console.error('KIS API Error:', error.response?.data);

            // msg_cd 가 EGW00201(초당 거래건수 초과) 이라면 1초 후 다시 요청
            if (error.config && error.response && error.response.data.msg_cd === 'EGW00201') {
                const config = error.config; // setTimeout 내부에서도 정상적으로 타입 추론이 되도록 로컬 변수로 추출
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(instance.request(config));
                    }, 1000);
                });
            }

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

const getYoutubeInstance = () => {
    const instance = axios.create({
        baseURL: process.env.YOUTUBE_BASE_URL,
    });

    instance.interceptors.request.use(config => {
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

export const kis = getKisInstance();
export const kakao = getKakaoInstance();
export const youtube = getYoutubeInstance();
