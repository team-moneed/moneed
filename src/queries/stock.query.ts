import { getHotStock, getOverseasStockPrice, getSelectedStocks, getStocks, getStockBySymbol } from '@/api/stock.api';
import { MarketCode } from '@/types/kis';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useStocks = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['stocks'],
        queryFn: () => getStocks(),
    });

    return { data, isLoading, error };
};

export const useSelectedStocks = () => {
    return useSuspenseQuery({
        queryKey: ['selectedStocks'],
        queryFn: () => getSelectedStocks(),
    });
};

export const useOverseasStockPrice = ({ symbol }: { symbol: string }) => {
    return useQuery({
        queryKey: ['stock-price-overseas', symbol],
        queryFn: () => getOverseasStockPrice({ symbol }),
    });
};

export const useSuspenseOverseasStockPrice = ({ symbol }: { symbol: string }) => {
    return useSuspenseQuery({
        queryKey: ['stock-price-overseas', symbol],
        queryFn: () => getOverseasStockPrice({ symbol }),
        refetchInterval: 1000 * 60, // 1분마다 리패칭
    });
};

export const useHotStocks = ({ market }: { market: MarketCode }) => {
    return useSuspenseQuery({
        queryKey: ['hot-stocks', market],
        queryFn: () => getHotStock({ market }),
    });
};

export const useStockBySymbol = ({ symbol }: { symbol: string }) => {
    return useQuery({
        queryKey: ['stock-by-symbol', symbol],
        queryFn: () => getStockBySymbol({ symbol }),
        enabled: !!symbol,
    });
};
