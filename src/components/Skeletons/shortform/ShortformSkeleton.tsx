export default function ShortformSkeleton({ count }: { count: number }) {
    return (
        <div className='mt-4 flex gap-[.8rem] w-full overflow-hidden mask-right'>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    className='w-[calc(30%-1.6rem)] lg:w-[calc(20%-1.6rem)] shrink-0 cursor-pointer bg-moneed-gray-5 animate-pulse aspect-[9/16] rounded-[.8rem]'
                    key={index}
                ></div>
            ))}
        </div>
    );
}
