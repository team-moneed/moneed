export default function StockBoxSkeleton() {
    return (
        <div className='flex justify-between p-[.8rem] rounded-[.8rem] hover:bg-moneed-white cursor-pointer transition-colors`'>
            <div className='flex items-center gap-[.6rem]'>
                <div className='rounded-full size-7 bg-moneed-gray-5 animate-pulse' />
                <div className='h-[1.6rem] w-[3.2rem] rounded-[.8rem] bg-moneed-gray-5 animate-pulse' />
                <div className='h-[1.4rem] w-[5.6rem] rounded-[.8rem] bg-moneed-gray-5 animate-pulse' />
            </div>
            <div className='flex items-center gap-[.6rem]'>
                <div className='h-[1.4rem] w-[5.6rem] rounded-[.8rem] bg-moneed-gray-5 animate-pulse' />
                <div className='h-[1.4rem] w-[5.6rem] rounded-[.8rem] bg-moneed-gray-5 animate-pulse' />
            </div>
        </div>
    );
}
