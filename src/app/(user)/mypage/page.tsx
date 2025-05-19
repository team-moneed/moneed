'use client';

import { Stock } from '@/types/stock';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import MypageBox from '@/components/Mypage/MypageBox';
import MyStockBox from '@/components/Mypage/MyStockBox';

export default function Mypage() {
    const { data: stockData } = useQuery<Stock[]>({
        queryKey: ['stockData'],
        queryFn: () => fetch('/api/stocks').then(res => res.json()),
    });

    const router = useRouter();

    const movetoMyProfile = () => {
        router.push(`/myprofile`);
    };

    const movetoMyPost = () => {
        router.push(`/mypost`);
    };

    const movetoMyComment = () => {
        router.push(`/mycomment`);
    };

    const movetocommunity = (stockname: string) => {
        router.push(`/community/${stockname}`);
    };

    return (
        <>
            <div className='px-[2rem] max-w-[128rem] mx-auto'>
                <div className='lg:flex lg:gap-[2.4rem] lg:mt-[1.6rem]'>
                    <div className='space-y-[1.6rem] lg:w-[40%]'>
                        <div className='p-[1.6rem] justify-center items-center rounded-[1.6rem] border border-solid border-[var(--moneed-gray-5)]'>
                            <div className='flex justify-center'>
                                <div className='rounded-full overflow-hidden aspect-[1/1] w-[5.6rem]'>
                                    <img src='/temp/sample3.png' alt='' className='w-full h-full object-cover' />
                                </div>
                            </div>
                            <div className='flex gap-[1rem] justify-center items-center'>
                                <div className='text-[2rem] my-[.8rem] font-[700] leading-[145%] text-[var(--moneed-brand-color)]'>
                                    내가본나의 피드
                                </div>
                                <div className='aspect-[1/1] w-[2.4rem] cursor-pointer' onClick={movetoMyProfile}>
                                    <img src='/icon/icon-setting.svg' alt='' className='w-full h-full' />
                                </div>
                            </div>
                            <div className='text-center text-[1.4rem] font-[400] leading-[145%] text-[var(--moneed-gray-7)]'>
                                연동된 계정: 카카오
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-x-[1.6rem] pb-[1.6rem]'>
                            <MypageBox menu='내가 작성한 게시글' count={5} onClick={movetoMyPost}></MypageBox>
                            <MypageBox menu='내가 작성한 댓글' count={7} onClick={movetoMyComment}></MypageBox>
                        </div>
                    </div>
                    <div className='p-[1.6rem] justify-center items-center rounded-[1.6rem] border border-solid bg-[var(--moneed-black-3)] border-[var(--moneed-gray-5)] lg:w-[60%]'>
                        <div className='flex mb-[1.6rem] justify-between'>
                            <div className='text-[2rem] font-[600] leading-[140%]'>내가 선택한 종목</div>
                            <div className='aspect-[1/1] w-[2.4rem]'>
                                <img src='/icon/icon-addcircle.svg' alt='' className='w-full h-full' />
                            </div>
                        </div>
                        <div className='space-y-[.8rem]'>
                            {stockData?.map((stock, index) => (
                                <MyStockBox
                                    key={index}
                                    infoBoxImgages={stock.infoBoxImgages}
                                    name={stock.name}
                                    priceUSD={stock.priceUSD}
                                    rate={stock.rate}
                                    englishName={stock.englishName}
                                    onClick={() => movetocommunity(stock.name)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
