import PostThumbnailSkeleton from '@/components/Skeletons/PostThumbnailSkeleton';
import { Suspense } from 'react';
import Posts from './Posts';

export default function PostSection({ stockId }: { stockId: number }) {
    return (
        <section className='mt-[2.8rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-4'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-moneed-black lg:text-[2.4rem] lg:leading-[140%]'>
                    게시글
                </h2>
            </div>
            <PostsWithSuspense stockId={stockId} />
        </section>
    );
}

function PostsWithSuspense({ stockId }: { stockId: number }) {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-[.6rem] gap-x-[1.2rem] mt-4 md:gap-y-[1.6rem] mb-[.6rem]'>
            <Suspense
                fallback={Array.from({ length: 15 }).map((_, index) => (
                    <PostThumbnailSkeleton key={index} />
                ))}
            >
                <Posts stockId={stockId} />
            </Suspense>
        </div>
    );
}
