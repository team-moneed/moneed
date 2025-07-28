import { getOverseasStockByCondition } from '@/api/kis.api';
import CategoryRankBox from '@/components/Community/CategoryRankBox';
import { MarketCode, OverseasStockConditionSearchResponse } from '@/types/kis';
import { HotStock } from '@/types/stock';

export default async function HotStocks({ id }: { id: string }) {
    const hotStocks = await getHotStock({ market: 'NAS' });

    return (
        <>
            <div id={id} className='mt-[2.8rem]'>
                <div className='flex items-baseline gap-[.8rem] mb-[1.8rem]'>
                    <h2 className='text-[2.2rem] leading-[145%] font-bold text-moneed-black lg:text-[2.4rem] lg:leading-[140%]'>
                        지금 뜨는 종목
                    </h2>
                    <span className='text-moneed-gray-7 text-[1.2rem] font-normal leading-[135%]'>
                        12월 17일 8시 기준 | 전일종가
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[1.2rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]'>
                {hotStocks.map(stock => {
                    return <CategoryRankBox stock={stock} key={stock.symbol}></CategoryRankBox>;
                })}
            </div>
        </>
    );
}

function formatHotStocks(stocks: OverseasStockConditionSearchResponse['output2']): HotStock[] {
    return stocks.map(stock => ({
        symbol: stock.symb,
        name: stock.name,
        price: Number(stock.last),
        change: Number(stock.diff),
        changeRate: stock.rate,
        market: stock.excd as MarketCode,
        sign: stock.sign as '1' | '2' | '3',
        rank: Number(stock.rank),
    }));
}

async function getHotStock({ market }: { market: MarketCode }) {
    const data = await getOverseasStockByCondition({ market });
    const top3Stocks = data.output2.slice(0, 3);
    const hotStocks = formatHotStocks(top3Stocks);
    return hotStocks;
}
