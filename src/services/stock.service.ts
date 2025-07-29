import { getOverseasStockPrice } from '@/api/kis.api';
import { StockRepository } from '@/repositories/stock.repository';

export class StockService {
    private stockRepository: StockRepository;

    constructor() {
        this.stockRepository = new StockRepository();
    }

    async getSelectedStock(userId: string) {
        const selectedStocks = await this.stockRepository.getSelectedStock(userId);
        return selectedStocks.flatMap(stock => stock.stock);
    }

    async selectStock(userId: string, stockIds: number[]) {
        await this.stockRepository.selectStock(userId, stockIds);
    }

    async getStock(stockId: number) {
        const stock = await this.stockRepository.getStock(stockId);
        if (!stock) {
            throw new Error('Stock not found');
        }
        return stock;
    }

    async getStocks(count: number, cursor: number) {
        const stocks = await this.stockRepository.getStocks(count, cursor);
        return stocks;
    }

    async getOverseasStockPrice(symbol: string) {
        return await getOverseasStockPrice({ symbol });
    }
}
