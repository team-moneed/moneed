'use client';
import { useKakao } from '@/context/KakaoContext';
import Button from './Button';

export default function KakaoLoginButton() {
    const { Kakao } = useKakao();
    const handleKakaoLogin = () => {
        Kakao?.Auth.authorize({
            redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
            prompt: 'select_account',
            scope: 'openid',
        });
    };
    return (
        <Button
            type='submit'
            theme='primary'
            textcolor='primary'
            className='w-full flex items-center justify-center h-[5.6rem] gap-[1.8rem] text-[1.6rem] px-16 font-bold leading-[140%] rounded-[1.6rem] lg:w-auto'
            onClick={handleKakaoLogin}
        >
            <img src='/logo-kakao.svg' alt='' />
            카카오로 시작하기
        </Button>
    );
}
