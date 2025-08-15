'use client';

import { useParams } from 'next/navigation';
import { ChipLink } from '@/components/Chip';
import Icon from '@/components/Icon';
import Link from 'next/link';
import { useSelectedStocks } from '@/queries/stock.query';
import StockTypeBarSkeleton from '@/components/Skeletons/community/StockTypeBarSkeleton';
import { AxiosError } from 'axios';

function StockTypeBar() {
    const params = useParams();
    const symbol = params ? params.symbol : undefined;
    const { data: stocks, isError, error, isLoading } = useSelectedStocks();

    const is401Error = isError && error instanceof AxiosError && error.response?.status === 401;

    if (isLoading) {
        return <StockTypeBarSkeleton count={15} />;
    }

    return (
        <div className='relative'>
            <div className='flex gap-4 mb-6 overflow-x-auto whitespace-nowrap items-center'>
                <Link href='/selectstocktype' className='shrink-0'>
                    <Icon iconUrl='/icon/icon-addcircle.svg' width={30} height={30} />
                </Link>
                <ChipLink label='전체' active={symbol ? false : true} href='/community' />
                {!is401Error &&
                    stocks?.map(stock => (
                        <ChipLink
                            key={stock.symbol}
                            label={stock.name}
                            active={symbol ? symbol === stock.symbol : false}
                            href={`/community/${stock.symbol}`}
                        />
                    ))}
            </div>
        </div>
    );
}

export default StockTypeBar;
