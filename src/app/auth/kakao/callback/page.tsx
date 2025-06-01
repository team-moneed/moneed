'use client';

import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { getKakaoToken } from '@/api/client/auth.api';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';
import { decodeJwt } from 'jose';
import { TokenPayload } from '@/types/auth';
import useUserStore from '@/store/useUserStore';
import { useSelectedStock } from '@/hooks/useSelectedStock';

export default function KakaoCallbackPage() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    const setAccessToken = useAuthStore(state => state.setAccessToken);
    const setUserInfo = useUserStore(state => state.setUserInfo);

    const { data: token } = useQuery({
        queryKey: ['kakao', code],
        queryFn: () =>
            getKakaoToken({ code: code!, state: state!, error: error!, error_description: errorDescription! }),
        enabled: !!code,
    });

    const { data: selectedStock } = useSelectedStock();

    useEffect(() => {
        if (token && selectedStock) {
            setAccessToken(token.accessToken);
            const userInfo = decodeJwt<TokenPayload>(token.accessToken);
            setUserInfo({
                id: userInfo.id,
                nickname: userInfo.nickname,
                profileImage: userInfo.profileImage,
            });
            if (selectedStock.length === 0) {
                redirect('/selectstocktype');
            } else {
                redirect('/');
            }
        }
    }, [token, selectedStock, setUserInfo, setAccessToken]);

    return <div>리다이렉트 중...</div>;
}
