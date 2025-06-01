'use client';
import { PropsWithChildren, useEffect } from 'react';
import { redirect } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

const Protected = ({ children }: PropsWithChildren) => {
    const accessToken = useAuthStore(state => state.accessToken);

    useEffect(() => {
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            redirect('/onboarding');
        }
    }, [accessToken]);
    return children;
};

export default Protected;
