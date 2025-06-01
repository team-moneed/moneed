import { KakaoUserInfo } from '@/services/auth.service';
import { KakaoToken } from '@/types/kakao';
import axios from 'axios';

const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';

export const getKakaoToken = async (code: string) => {
    const data = {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    const res = await axios.post<KakaoToken>(kakaoTokenUrl, data, {
        headers,
    });
    return res.data;
};

export const getKakaoUserInfo = async (accessToken: string) => {
    const res = await axios.get<KakaoUserInfo>(kakaoUserInfoUrl, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};
