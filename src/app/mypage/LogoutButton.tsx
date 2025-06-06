'use client';

import { logout } from '@/api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();
    const { mutate: mutateLogout } = useMutation({
        mutationFn: ({ provider }: { provider: 'kakao' }) => logout({ provider }),
        onSuccess: () => {
            window.alert('로그아웃 되었습니다.');
            router.push('/onboarding');
        },
        onError: () => {
            window.alert('로그아웃 실패');
        },
    });

    const handleLogout = async () => {
        const isLogout = window.confirm('로그아웃 하시겠습니까?');
        if (isLogout) {
            mutateLogout({ provider: 'kakao' });
        }
    };

    return (
        <button className='text-[1.4rem] font-normal leading-[145%] text-(--moneed-gray-7)' onClick={handleLogout}>
            로그아웃
        </button>
    );
}
