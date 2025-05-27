import axios from 'axios';

const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
const kakaoAuthCodeUrl = 'https://kauth.kakao.com/oauth/authorize';

interface KakaoTokenResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
}

export const getKakaoAuthCode = async (): Promise<string> => {
    const res = await axios.get(kakaoAuthCodeUrl, {
        params: {
            client_id: process.env.KAKAO_CLIENT_ID,
            redirect_uri: process.env.KAKAO_REDIRECT_URI,
            response_type: 'code',
            scope: 'openid',
        },
    });
    return res.data;
};

export const getKakaoToken = async (code: string): Promise<KakaoTokenResponse> => {
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

    const res = await axios.post<KakaoTokenResponse>(kakaoTokenUrl, data, {
        headers,
    });
    return res.data;
};
