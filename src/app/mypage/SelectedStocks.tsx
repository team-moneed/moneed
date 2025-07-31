import MyStockBox from '@/components/Mypage/MyStockBox';
import StockBoxSkeleton from '@/components/Skeletons/mypage/StockBoxSkeleton';
import { useSelectedStock } from '@/hooks/useSelectedStock';
import { Suspense } from 'react';

function SelectedStocks() {
    const { data: selectedStocks } = useSelectedStock();

    return (
        <section className='space-y-[.8rem]'>
            {selectedStocks.map(stock => (
                <MyStockBox key={stock.id} stock={stock} href={`/community/${stock.name}`} />
            ))}
        </section>
    );
}

export default function SelectedStocksWithSuspense() {
    return (
        <Suspense
            fallback={
                <div className='space-y-[.8rem]'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <StockBoxSkeleton key={index} />
                    ))}
                </div>
            }
        >
            <SelectedStocks />
        </Suspense>
    );
}
