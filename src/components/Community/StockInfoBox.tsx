import { Stock } from '@/generated/prisma';
import { ReactNode } from 'react';

type StockInfoProps = {
    infoBoxImgages?: string[] | string;
    stock: Stock;
    priceKRW?: string;
    priceUSD?: string;
    rate?: string;
    children?: ReactNode;
    className?: string;
    englishName?: string;
};

const StockInfoBox = ({ stock, children }: StockInfoProps) => {
    return (
        <>
            <div className='flex justify-between px-[1.2rem] py-[1.8rem] border border-solid border-moneed-gray-5 rounded-[1.6rem]'>
                <div className='flex items-center gap-[.6rem]'>
                    <div className='rounded-full overflow-hidden aspect-square w-[3.6rem]'>
                        <img src={stock.logoUrl} alt='stock logo' className='w-full h-full object-contain' />
                    </div>
                    <div>
                        <h3 className='text-[1.4rem] font-semibold leading-[140%] text-moneed-black'>{stock.name}</h3>
                        <span className='text-[1.2rem] font-normal leading-[135%] text-moneed-gray-8'>
                            {stock.symbol}|{stock.sector}
                        </span>
                    </div>
                </div>
                <div className='flex items-center gap-[.6rem]'>
                    <div className='text-[1.4rem] font-semibold leading-[140%] text-moneed-black'>$504.99</div>
                    <div className='text-[1.4rem] font-semibold leading-[140%] text-moneed-green rounded-[.8rem] bg-moneed-green-light p-[.4rem]'>
                        16.3%
                    </div>
                </div>
            </div>
            {children}
        </>
    );
};

export default StockInfoBox;
