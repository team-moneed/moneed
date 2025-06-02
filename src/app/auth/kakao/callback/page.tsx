'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginWithKakao } from '@/api/auth.api';
import { useQuery } from '@tanstack/react-query';

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

    const { data: token } = useQuery({
        queryKey: ['kakao', code, state],
        queryFn: () => loginWithKakao({ code: code!, state: state }),
        enabled: !!code,
    });

    useEffect(() => {
        if (token) {
            router.push('/selectstocktype');
        }
    }, [token, router]);

    return <div>리다이렉트 중...</div>;
}
