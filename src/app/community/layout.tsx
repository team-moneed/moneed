'use client';
import dynamic from 'next/dynamic';
const StockTypeBar = dynamic(() => import('./StockTypeBar'), { ssr: false });

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='px-8 max-w-512 mx-auto'>
            <StockTypeBar />
            {children}
        </div>
    );
}
