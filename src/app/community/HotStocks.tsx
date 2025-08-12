'use client';
import CategoryRankBox from '@/components/Community/CategoryRankBox';
import { useHotStocks } from '@/queries/stock.query';
import withSuspense from '@/components/HOC/withSuspense';

export default function HotStocks() {
    const { data: hotStocks } = useHotStocks({ market: 'NAS' });
    return (
        <>
            {hotStocks.map(stock => (
                <CategoryRankBox stock={stock} key={stock.symbol} />
            ))}
        </>
    );
}

export const HotStocksWithSuspense = withSuspense(HotStocks, <div>Loading...</div>);
