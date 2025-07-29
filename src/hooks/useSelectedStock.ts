import { getSelectedStock } from '@/api/stock.api';
import { useQuery } from '@tanstack/react-query';

export const useSelectedStock = () => {
    return useQuery({
        queryKey: ['selectedStock'],
        queryFn: () => getSelectedStock(),
    });
};
