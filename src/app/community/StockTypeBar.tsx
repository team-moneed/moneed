'use client';

import { useParams } from 'next/navigation';
import { ChipLink } from '@/components/Chip';
import Icon from '@/components/Icon';
import Link from 'next/link';
import { useStocks } from '@/hooks/useStocks';
import ChipSkeleton from '@/components/Skeletons/ChipSkeleton';

export default function StockTypeBar() {
    const params = useParams();
    const stockId = params ? Number(params.stockId) : undefined;
    const { data: stocks, isLoading } = useStocks();

    if (isLoading) {
        return (
            <div className='relative'>
                <div className='flex gap-4 mb-6 overflow-x-auto whitespace-nowrap items-center'>
                    <Link href='/selectstocktype' className='shrink-0'>
                        <Icon iconUrl='/icon/icon-addcircle.svg' width={30} height={30} />
                    </Link>
                    {Array.from({ length: 15 }, (_, i) => (
                        <ChipSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='relative'>
            <div className='flex gap-4 mb-6 overflow-x-auto whitespace-nowrap items-center'>
                <Link href='/selectstocktype' className='shrink-0'>
                    <Icon iconUrl='/icon/icon-addcircle.svg' width={30} height={30} />
                </Link>
                <ChipLink label='전체' active={stockId ? false : true} href='/community' />
                {stocks?.map(({ id, name }) => (
                    <ChipLink
                        key={id}
                        label={name}
                        active={stockId ? stockId === id : false}
                        href={`/community/${id}`}
                    />
                ))}
            </div>
        </div>
    );
}
