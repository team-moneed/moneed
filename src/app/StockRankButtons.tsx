import { ChipButton } from '@/components/Chip';
import StockRankButtonSkeleton from '@/components/Skeletons/StockRankButtonSkeleton';
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
                        <StockRankButtonSkeleton key={index} />
                    ))}
                </div>
            }
        >
            <StockRankButtons stockList={stockList} selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
        </Suspense>
    );
}
