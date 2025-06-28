import { MarketCode } from '@/api/kis.api';
import { SelectedStock } from '@/generated/prisma';

export type SelectedStock = SelectedStock & { name: string };

export type HotStock = {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changeRate: string;
    market: MarketCode;
    sign: '1' | '2' | '3';
    rank: number;
};
