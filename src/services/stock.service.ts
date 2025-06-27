import { StockRepository } from '@/repositories/stock.repository';

export class StockService {
    private stockRepository: StockRepository;

    constructor() {
        this.stockRepository = new StockRepository();
    }

    async selectStock(userId: string, stockIds: number[]) {
        await this.stockRepository.selectStock(userId, stockIds);
    }
}
