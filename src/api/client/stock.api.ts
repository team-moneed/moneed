import { http } from '@/api/request';
import { Stock } from '@/generated/prisma';

export async function getStocks({ count = 30, cursor = 0 }: { count?: number; cursor?: number } = {}) {
    const res = await http.get<Stock[]>('/api/stocks', { params: { count, cursor } });
    return res.data;
}

export async function selectStock(stockIds: number[]) {
    const res = await http.post('/api/stocks/select', { stockIds });
    return res.data;
}

export async function getSelectedStock() {
    const res = await http.get<number[]>('/api/stocks/selected');
    return res.data;
}
