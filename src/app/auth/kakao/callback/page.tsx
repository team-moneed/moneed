'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/apis/auth.api';
import { useQuery } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';

export const dynamic = 'force-dynamic';

export default function KakaoCallback() {
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
        queryFn: () => login({ code: code!, state: state, provider: 'kakao' }),
        enabled: !!code,
    });

    useEffect(() => {
        if (token) {
            const { isExistingUser } = token;
            if (isExistingUser) {
                router.push('/');
            } else {
                router.push(`/selectstocktype?url=${encodeURIComponent('/welcome')}`);
            }
        }
    }, [token, router]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className='text-center'>
                <BeatLoader loading={true} color='#C0FF00' size={15} />
                <p className='text-white mt-4 text-lg'>로그인 처리 중...</p>
            </div>
        </div>
    );
}
