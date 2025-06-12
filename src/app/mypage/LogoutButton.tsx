'use client';

import { logout } from '@/api/auth.api';
import useSnackBarStore from '@/store/useSnackBarStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();
    const showSnackBar = useSnackBarStore(state => state.showSnackBar);
    const { mutate: mutateLogout } = useMutation({
        mutationFn: ({ provider }: { provider: 'kakao' }) => logout({ provider }),
        onSuccess: () => {
            router.push('/onboarding?reason=logout');
        },
        onError: () => {
            showSnackBar('로그아웃 실패', 'caution', 'top');
        },
    });

    const handleLogout = async () => {
        const isLogout = window.confirm('로그아웃 하시겠습니까?');
        if (isLogout) {
            mutateLogout({ provider: 'kakao' });
        }
    };

    return (
        <button className='text-[1.4rem] font-normal leading-[145%] text-moneed-gray-7' onClick={handleLogout}>
            로그아웃
        </button>
    );
}
