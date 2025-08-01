import { getSelectedStocks } from '@/api/stock.api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSelectedStock = () => {
    return useSuspenseQuery({
        queryKey: ['selectedStock'],
        queryFn: () => getSelectedStocks(),
    });
};
