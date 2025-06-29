import { SelectedStock as SelectedStockType } from '@/generated/prisma';

export type Stock = {
    infoBoxImgages: string;
    name: string;
    priceUSD: string;
    rate: string;
    englishName: string;
};

export type StockType = {
    stocktype: string;
    StockTypeId: number;
};

export type SelectedStock = SelectedStockType & { name: string };
