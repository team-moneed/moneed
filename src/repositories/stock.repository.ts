import prisma from '@/lib/prisma';

export class StockRepository {
    private prisma = prisma;

    async getSelectedStock(userId: string) {
        return this.prisma.selectedStock.findMany({
            where: {
                userId,
            },
            include: {
                stock: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }
}
