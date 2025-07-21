export default function EditPostSkeleton() {
    return (
        <div className='px-8 max-w-512 mx-auto'>
            <div className='flex items-center justify-between gap-[.6rem] mt-4'>
                <div className='bg-moneed-shade-bg py-[1.2rem] px-[1.6rem] rounded-[.8rem] w-48 h-12 animate-pulse'></div>
            </div>
            <div className='mt-4'>
                <div className='border-b border-moneed-gray-5 w-full py-[1.6rem] h-12 animate-pulse bg-moneed-gray-6'></div>
                <div className='w-full h-120 py-[1.6rem] mt-4 animate-pulse bg-moneed-gray-6'></div>
            </div>
            <div className='fixed left-0 right-0 z-20 h-[5.2rem] px-8 bg-white flex items-center justify-between transition-all duration-300 bottom-0'>
                <div className='flex gap-2'>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className='w-[6rem] h-[6rem] bg-moneed-gray-6 animate-pulse rounded'></div>
                    ))}
                </div>
                <div className='text-right text-[1.4rem] text-moneed-gray-7 w-full mx-4'>
                    <div className='w-16 h-4 bg-moneed-gray-6 animate-pulse'></div>
                </div>
                <div className='rounded-full w-[3.6rem] h-[3.6rem] bg-moneed-gray-6 animate-pulse'></div>
            </div>
        </div>
    );
}
