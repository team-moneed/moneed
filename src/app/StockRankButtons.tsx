import { ChipButton } from '@/components/Chip';
import { BoardRankResponse } from '@/types/board';
import { Suspense } from 'react';

const rankMedal = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
};

function StockRankButtons({
    stockList,
    selectedStock,
    setSelectedStock,
}: {
    stockList: BoardRankResponse[];
    selectedStock: BoardRankResponse | undefined;
    setSelectedStock: (stock: BoardRankResponse) => void;
}) {
    return (
        <div className='flex gap-4'>
            {stockList.map((stock, index) => {
                return (
                    <ChipButton
                        key={stock.stockId}
                        label={rankMedal(index) + stock.stockName}
                        onClick={() => setSelectedStock(stock)}
                        active={selectedStock?.stockId === stock.stockId}
                    />
                );
            })}
        </div>
    );
}

function StockRankSkeleton() {
    return (
        <div
            className={`rounded-[1.2rem] px-[1.6rem] py-[.7rem] flex items-center text-[1.4rem] font-semibold bg-moneed-gray-4 animate-pulse`}
        />
    );
}

export default function StockRankButtonsWithSuspense({
    stockList,
    selectedStock,
    setSelectedStock,
}: {
    stockList: BoardRankResponse[];
    selectedStock: BoardRankResponse | undefined;
    setSelectedStock: (stock: BoardRankResponse) => void;
}) {
    return (
        <Suspense
            fallback={
                <div className='flex gap-4'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <StockRankSkeleton key={index} />
                    ))}
                </div>
            }
        >
            <StockRankButtons stockList={stockList} selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
        </Suspense>
    );
}
