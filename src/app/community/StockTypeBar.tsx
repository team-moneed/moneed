'use client';

import { useParams } from 'next/navigation';
import { ChipLink } from '@/components/Chip';
import Icon from '@/components/Icon';
import Link from 'next/link';
import { useSelectedStocks } from '@/queries/stock.query';
import StockTypeBarSkeleton from '@/components/Skeletons/community/StockTypeBarSkeleton';
import withSuspense from '@/components/HOC/withSuspense';

function StockTypeBar() {
    const params = useParams();
    const symbol = params ? params.symbol : undefined;
    const { data: stocks } = useSelectedStocks();

    return (
        <div className='relative'>
            <div className='flex gap-4 mb-6 overflow-x-auto whitespace-nowrap items-center'>
                <Link href='/selectstocktype' className='shrink-0'>
                    <Icon iconUrl='/icon/icon-addcircle.svg' width={30} height={30} />
                </Link>
                <ChipLink label='전체' active={symbol ? false : true} href='/community' />
                {stocks?.map(stock => (
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

export default withSuspense(StockTypeBar, <StockTypeBarSkeleton count={15} />);
