'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBoardRank } from '@/api/board.api';
import { BoardRankResponse } from '@/types/board';
import Top3PostsWithSuspense from './Top3Posts';
import StockRankButtonsWithSuspense from './StockRankButtons';

// TODO: 1시간마다 업데이트 해야함
const Top3 = () => {
    const anHour = 1000 * 60 * 60;
    const { data: stockList } = useSuspenseQuery({
        queryKey: ['board-rank-top3'],
        queryFn: () => getBoardRank({ limit: 3 }),
        staleTime: anHour,
    });

    const [selectedStock, setSelectedStock] = useState<BoardRankResponse>(stockList[0]);

    useEffect(() => {
        if (stockList && stockList.length > 0) {
            setSelectedStock(stockList[0]);
        }
    }, [stockList]);

    return (
        <>
            <StockRankButtonsWithSuspense
                stockList={stockList ?? []}
                selectedStock={selectedStock}
                setSelectedStock={setSelectedStock}
            />
            <Top3PostsWithSuspense selectedStock={selectedStock} />
            <MoveToCommunityButton selectedStock={selectedStock} />
        </>
    );
};

function MoveToCommunityButton({ selectedStock }: { selectedStock: BoardRankResponse }) {
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

export default Top3;
