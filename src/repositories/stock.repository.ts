import prisma from '@/lib/prisma';

export class StockRepository {
    private prisma = prisma;

    async selectStock(userId: string, stockIds: number[]) {
        return this.prisma.selectedStock.createMany({
            data: stockIds.map(stockId => ({
                userId,
                stockId,
            })),
            skipDuplicates: true,
        });
    }
}
