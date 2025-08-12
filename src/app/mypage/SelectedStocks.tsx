import MyStockBox from '@/components/Mypage/MyStockBox';
import StockBoxSkeleton from '@/components/Skeletons/mypage/StockBoxSkeleton';
import { useSelectedStocks } from '@/queries/stock.query';
import withSuspense from '@/components/HOC/withSuspense';

function SelectedStocks() {
    const { data: selectedStocks } = useSelectedStocks();

    return (
        <section className='space-y-[.8rem]'>
            {selectedStocks.map(stock => (
                <MyStockBox key={stock.id} stock={stock} href={`/community/${stock.symbol}`} />
            ))}
        </section>
    );
}

export default withSuspense(
    SelectedStocks,
    <div className='space-y-[.8rem]'>
        {Array.from({ length: 5 }).map((_, index) => (
            <StockBoxSkeleton key={index} />
        ))}
    </div>,
);
