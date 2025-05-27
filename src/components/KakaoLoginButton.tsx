'use client';
import Button from './Button';
import Link from 'next/link';

export default function KakaoLoginButton() {
    const REST_API_KEY = process.env.KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=openid`;
    return (
        <Button
            type='submit'
            theme='primary'
            textcolor='primary'
            className='w-full flex items-center justify-center h-[5.6rem] gap-[1.8rem] text-[1.6rem] px-16 font-bold leading-[140%] rounded-[1.6rem] lg:w-auto'
        >
            <img src='/logo-kakao.svg' alt='' />
            <Link href={url}>카카오로 시작하기</Link>
        </Button>
    );
}
