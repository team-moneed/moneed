import { getOverseasStockPrice } from '@/api/stock.api';
import { useQuery } from '@tanstack/react-query';

export const useOverseasStockPrice = ({ symbol }: { symbol: string }) => {
    return useQuery({
        queryKey: ['stock-price-overseas', symbol],
        queryFn: () => getOverseasStockPrice({ symbol }),
    });
};
