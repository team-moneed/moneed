'use client';
import CategoryRankBox from '@/components/Community/CategoryRankBox';
import { useHotStocks } from '@/queries/stock.query';
import { Suspense } from 'react';

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

export function HotStocksWithSuspense() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HotStocks />
        </Suspense>
    );
}
