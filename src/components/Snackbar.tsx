'use client';

import useSnackbarStore, { generateId } from '@/store/useSnackbarStore';
import { cva } from 'class-variance-authority';
import { SnackbarConfig } from '@/types/snackbar';
import { cn } from '@/util/style';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

const SnackbarVariants = cva(
    'fixed z-150 flex h-16 py-[.8rem] w-[90%] max-w-292 rounded-2xl opacity-97 shadow-[0px_2px_8px_rgba(0,0,0,0.25)] items-center justify-center',
    {
        variants: {
            variant: {
                normal: 'bg-moneed-gray-7 text-moneed-white',
                action: 'bg-moneed-blue-light text-moneed-blue',
                caution: 'bg-moneed-red-light text-moneed-red',
            },
            position: {
                top: 'top-16',
                bottom: 'bottom-28',
            },
        },
    },
);

interface SnackbarItemProps {
    snackbar: SnackbarConfig;
}

function SnackbarItem({ snackbar }: SnackbarItemProps) {
    return (
        <div className={cn(SnackbarVariants({ variant: snackbar.variant, position: snackbar.position }))}>
            <div className='flex gap-[.8rem]'>
                {snackbar.icon && (
                    <div className='overflow-hidden aspect-square w-[1.8rem]'>
                        <img src={snackbar.icon} alt='' className='w-full h-full object-cover' />
                    </div>
                )}
                <p className={`text-[1.4rem] font-semibold`}>{snackbar.message}</p>
            </div>
        </div>
    );
}

export function SnackbarProvider() {
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
    const snackbars = useSnackbarStore(state => state.snackbars);

    useEffect(() => {
        setPortalRoot((document.querySelector('#root') as HTMLElement) || document.body);
    }, []);

    if (!portalRoot) return null;

    return ReactDOM.createPortal(
        <div className='flex items-center justify-center'>
            {snackbars.map(snackbar => (
                <SnackbarItem key={snackbar.id} snackbar={snackbar} />
            ))}
        </div>,
        portalRoot,
    );
}

const reasons: Record<string, SnackbarConfig> = {
    logged_in: { message: '이미 로그인 상태입니다.', variant: 'normal', position: 'top' },
    no_session: { message: '로그인이 필요합니다.', variant: 'caution', position: 'top' },
    expired_session: { message: '세션이 만료되었습니다. 다시 로그인해주세요.', variant: 'caution', position: 'top' },
    logout: { message: '로그아웃 되었습니다.', variant: 'action', position: 'top' },
    leave: { message: '탈퇴가 완료되었습니다.', variant: 'action', position: 'top' },
};

export function SnackbarTrigger({ reason }: { reason?: keyof typeof reasons }) {
    const showSnackbar = useSnackbarStore(state => state.showSnackbar);
    const hideSnackbar = useSnackbarStore(state => state.hideSnackbar);

    useEffect(() => {
        const id = generateId();
        if (reason) {
            showSnackbar({
                id,
                ...reasons[reason],
            });
        }
        return () => {
            hideSnackbar(id);
        };
    }, [reason, showSnackbar, hideSnackbar]);

    return null;
}
