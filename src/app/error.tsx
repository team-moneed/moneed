'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const router = useRouter();
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className='px-[2rem] max-w-[128rem] mx-auto'>
            <div className='flex justify-center items-center mt-[6.3rem]'>
                <img src='/errorcta.svg' alt='' className='w-[29rem]' />
            </div>
            <div className='text-[2.4rem] text-[var(--moneed-black)] font-[700] text-center mt-[2rem] leading-[140%]'>
                {error.name}
            </div>
            <div className='text-[var(--moneed-black)] text-center mt-[1.2rem] font-[600] leading-[140%]'>
                {error.message}
            </div>
            <div className='flex flex-col justify-center items-center my-[4rem] gap-[1.2rem]'>
                <Button
                    onClick={() => reset()}
                    theme='primary'
                    textcolor='primary'
                    className='text-[1.6rem] font-[700] leading-[140%] px-[14.5rem] py-[1.8rem] w-2xl'
                >
                    다시 시도
                </Button>
                <Button
                    onClick={() => router.push('/')}
                    theme='primary'
                    textcolor='primary'
                    className='text-[1.6rem] font-[700] leading-[140%] px-[14.5rem] py-[1.8rem] w-2xl'
                >
                    홈으로 돌아가기
                </Button>
            </div>
            <div className='text-[var(--moneed-gray-7)] font-[400] text-center text-[1.4rem] leading-[140%]'>
                오류상황 메일신고: help@moneed.kr
            </div>
        </div>
    );
}
