import StockTypeBar from '@/components/StockTypeBar';

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='px-[2rem] max-w-[128rem] mx-auto'>
            <StockTypeBar />
            <div>{children}</div>
        </div>
    );
}
