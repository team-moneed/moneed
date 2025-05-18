'use client';

import { STOCKTYPES } from '@/config/StockTypesetting';
import Chip from '@/components/Chip';
import { useRouter } from 'next/navigation';

type StockTypeBarProps = {
    selectedStockType: string;
};

const StockTypeBar = ({ selectedStockType }: StockTypeBarProps) => {
    //선택한 카테고리만 보이게

    const router = useRouter();
    const movetoSelectStockType = () => {
        router.push('/selectStockType');
    };

    const movetoStockType = (stocktype: string) => {
        router.push(`/community/${stocktype}`);
    };

    return (
        <div className='relative'>
            <div className='flex gap-4 mb-6 overflow-x-auto whitespace-nowrap'>
                <Chip label='+' onClick={movetoSelectStockType} />
                {STOCKTYPES.map(({ stocktype, StockTypeId }) => (
                    <Chip
                        key={StockTypeId}
                        label={stocktype}
                        active={selectedStockType === stocktype}
                        className='py-[12px] px-[24px]'
                        onClick={() => movetoStockType(stocktype)}
                    />
                ))}
            </div>
        </div>
    );
};

export default StockTypeBar;
