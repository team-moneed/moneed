import CompanyInfoBox from '@/components/Community/CompanyInfoBox';
import StockInfoBox from '@/components/Community/StockInfoBox';
import Vote from './Vote';
import PostSection from './PostsSection';
import { StockService } from '@/services/stock.service';

export default async function CommunityPage({ params }: { params: Promise<{ stockId: string }> }) {
    const { stockId } = await params;
    const stockService = new StockService();
    const stock = await stockService.getStock(Number(stockId));

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem] mb-[.6rem]'>
                <StockInfoBox stock={stock} />
                <CompanyInfoBox stock={stock} />
            </div>
            <Vote />
            <PostSection stockId={Number(stockId)} />
        </div>
    );
}
