'use client';

import { useRouter } from 'next/navigation';
import Button from '../Button';
import Link from 'next/link';

const Header = () => {
    const router = useRouter();

    const movetowritepost = () => {
        router.push('/writepost');
    };

    return (
        <>
            <div className='sticky top-0 z-[10] bg-white flex items-center justify-between shrink-0 self-stretch px-[1.8rem] pb-[1.2rem] pt-[2rem]'>
                <Link href='/'>
                    <div className='flex'>
                        <div className='w-[2.8rem] h-[2.8rem] bg-[var(--moneed-black)] rounded-full flex items-center justify-center'>
                            <img className='w-[1.4rem] h-[1.2rem]' src='/icon/icon-logo.svg' alt='' />
                        </div>
                        <span className='font-[600] leading-[140%] text-[1.8rem] ml-[.8rem]'>moneed</span>
                    </div>
                </Link>
                <Link href='/shortform'>
                    <span className='hidden lg:block lg:text-[1.4rem] font-semibold ml-[2.6rem]'>숏폼</span>
                </Link>
                <Link href='/community'>
                    <span className='hidden lg:block lg:text-[1.4rem] font-semibold w-[8.4rem] ml-[2.4rem]'>
                        커뮤니티
                    </span>
                </Link>
                <div className='flex items-center gap-[2.4rem] ml-auto'>
                    <Link href='/mypage'>
                        <div className='hidden lg:block'>
                            <img className='w-[2.4rem] h-[2.4rem]' src='/icon/icon-profile-circle.svg' alt='' />
                        </div>
                    </Link>
                    <img className='w-[2.4rem] h-[2.4rem]' src='/icon/icon-alarm.svg' alt='' />
                    <Button
                        onClick={movetowritepost}
                        className='hidden lg:flex gap-[1rem] px-[2.4rem] py-[.8rem] items-center'
                        theme='brand'
                        textcolor='brand'
                    >
                        <img className='w-[1.8rem] h-[1.8rem]' src='/icon/icon-edit.svg' alt='' />
                        <span className='font-[600] leading-[135%] text-[1.4rem]'>포스팅</span>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Header;
