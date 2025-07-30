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
            <div className='flex justify-center sm:inline-block border-moneed-gray-5 border-[.1rem] py-[2.1rem] px-[4.1rem] rounded-[1.6rem] '>
                <Button
                    variant='ghost'
                    onClick={() => movecommunity(selectedStock.stockId!)}
                    className='flex items-center gap-[.8rem] py-0 sm:pl-0'
                >
                    <span className='text-[1.4rem] text-moneed-gray-8 font-semibold leading-[135%]'>
                        {selectedStock.stockName} 게시판 더보기
                    </span>
                </Button>
            </div>
        </div>
    );
}
