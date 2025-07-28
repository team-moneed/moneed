'use client';
import Button from '@/components/Button';
import { BoardRankResponse } from '@/types/board';
import { useRouter } from 'next/navigation';

export default function MoveToCommunityButton({ selectedStock }: { selectedStock: BoardRankResponse }) {
    const router = useRouter();
    const movecommunity = (stockId: number) => {
        router.push(`/community/${stockId}`);
    };
    return (
        <div>
            <div className='flex justify-center mt-[1.8rem] sm:justify-start sm:mt-[2.6rem]'>
                <Button
                    theme='ghost'
                    textcolor='primary'
                    onClick={() => movecommunity(selectedStock.stockId!)}
                    className='flex items-center gap-[.8rem] py-0 sm:pl-0'
                >
                    <span className='text-[1.4rem] text-moneed-gray-8 font-semibold leading-[135%]'>
                        {selectedStock.stockName} 게시판 더보기
                    </span>
                    <img src='/icon/icon-arrow-right.svg' alt='게시판 더보기' />
                </Button>
            </div>
        </div>
    );
}
