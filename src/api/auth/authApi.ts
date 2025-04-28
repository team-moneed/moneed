import { http } from '../request';

type KakaoAuthPropsType = {
    authorizationCode: string;
};

export const kakaoAuth = async (data: KakaoAuthPropsType) => {
    const response = await http.post(`/api/accounts/kakao/login`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
};
