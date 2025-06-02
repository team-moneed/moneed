'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginWithKakao } from '@/api/client/auth.api';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';
import { decodeJwt } from 'jose';
import { TokenPayload } from '@/types/auth';
import useUserStore from '@/store/useUserStore';

export default function KakaoCallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    const state = searchParams.get('state') ?? undefined;
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error || errorDescription) {
        alert(`${error}: ${errorDescription}`);
        router.push(`/auth/error?error=${error}&description=${errorDescription}`);
    }

    const setAccessToken = useAuthStore(state => state.setAccessToken);
    const setUserInfo = useUserStore(state => state.setUserInfo);

    const { data: token } = useQuery({
        queryKey: ['kakao', code, state],
        queryFn: () => loginWithKakao({ code: code!, state: state }),
        enabled: !!code,
    });

    useEffect(() => {
        if (token) {
            setAccessToken(token.accessToken);
            const userInfo = decodeJwt<TokenPayload>(token.accessToken);
            setUserInfo({
                id: userInfo.id,
                nickname: userInfo.nickname,
                profileImage: userInfo.profileImage,
            });
            router.push('/selectstocktype');
        }
    }, [token, setUserInfo, setAccessToken, router]);

    return <div>리다이렉트 중...</div>;
}
