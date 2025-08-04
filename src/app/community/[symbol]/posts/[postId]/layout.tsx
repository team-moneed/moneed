'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import NavLink from '@/components/NavLink';
import { useCommentStore } from '@/store/useCommentStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const MobileHeader = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const { isEditingComment } = useCommentStore(
        useShallow(state => ({
            isEditingComment: state.isEditingComment,
        })),
    );

    const handleModalConfirm = () => {
        setShowModal(false);
        router.back(); // 모달에서 나가기를 클릭 시 뒤로가기
    };

    const handleModalCancel = () => {
        setShowModal(false); // 모달에서 이어서 하기 클릭 시 모달 닫기
    };

    const ExitButton = () => {
        return (
            <img
                className='w-[2.4rem] h-[2.4rem] cursor-pointer'
                onClick={() => setShowModal(true)}
                src='/icon/icon-exit.svg'
                alt='exit'
            />
        );
    };

    const BackButton = () => {
        return (
            <img
                className='cursor-pointer w-[2.4rem] h-[2.4rem]'
                onClick={() => setShowModal(true)}
                src='/icon/icon-arrow-back.svg'
                alt='back'
            />
        );
    };

    return (
        <header className='sticky top-0 z-10 bg-white flex items-center justify-between px-[4rem] pb-[1.8rem] pt-[3rem] lg:hidden'>
            <BackButton />
            <h1 className='text-[1.6rem] font-semibold text-moneed-gray-9'>{isEditingComment ? '댓글 수정' : ''}</h1>
            <ExitButton />
            {showModal && (
                <Modal
                    leftButtontext='이어서 하기'
                    rightButtontext='나가기'
                    leftButtonevent={handleModalCancel}
                    rightButtonevent={handleModalConfirm}
                    onClose={handleModalCancel}
                >
                    <span>
                        수정하던 내용은 저장되지않아요.
                        <br />
                        다음에 수정할까요?
                    </span>
                </Modal>
            )}
        </header>
    );
};

export const DesktopHeader = () => {
    const router = useRouter();

    const movetowritepost = () => {
        router.push('/writepost');
    };

    return (
        <header className='sticky top-0 z-10 bg-white hidden lg:flex items-center justify-between px-[4rem] pb-[1.8rem] pt-[3rem]'>
            <Link href='/'>
                <div className='flex'>
                    <div className='w-[2.8rem] h-[2.8rem] bg-moneed-black rounded-full flex items-center justify-center'>
                        <img className='w-[1.4rem] h-[1.2rem]' src='/icon/icon-logo.svg' alt='logo' />
                    </div>
                    <span className='font-semibold leading-[140%] text-[1.8rem] ml-[.8rem]'>moneed</span>
                </div>
            </Link>
            <NavLink href='/shortform'>
                <span className='hidden lg:block lg:text-[1.4rem] font-semibold ml-[2.6rem]'>숏폼</span>
            </NavLink>
            <NavLink href='/community'>
                <span className='hidden lg:block lg:text-[1.4rem] font-semibold w-[8.4rem] ml-[2.4rem]'>커뮤니티</span>
            </NavLink>
            <div className='flex items-center gap-[2.4rem] ml-auto'>
                <NavLink
                    href='/mypage'
                    icon='/icon/icon-profile-circle.svg'
                    activeIcon='/icon/icon-profile-circle.svg'
                />
                <img className='w-[2.4rem] h-[2.4rem]' src='/icon/icon-alarm.svg' alt='notification' />
                <Button
                    onClick={movetowritepost}
                    className='flex gap-4 px-[2.4rem] py-[.8rem] items-center'
                    variant='brand'
                >
                    <img className='w-[1.8rem] h-[1.8rem]' src='/icon/icon-edit.svg' alt='write-post' />
                    <span className='font-semibold leading-[135%] text-[1.4rem]'>포스팅</span>
                </Button>
            </div>
        </header>
    );
};

export default function PostDetailLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MobileHeader />
            <DesktopHeader />
            {children}
        </>
    );
}
