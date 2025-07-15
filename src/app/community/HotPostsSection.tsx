import { Suspense } from 'react';
import HotPosts from './HotPosts';
import PostThumbnailSkeleton from '@/components/Skeletons/PostThumbnailSkeleton';

export default function HotPostsSection({ id }: { id: string }) {
    const title = '인기 급상승 게시글';

    return (
        <section id={id} className='mt-[2.8rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-[1.8rem]'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-moneed-black lg:text-[2.4rem] lg:leading-[140%]'>
                    {title}
                </h2>
            </div>
            <HotPostsWithSuspense />
        </section>
    );
}

function HotPostsWithSuspense() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]'>
            <Suspense
                fallback={Array.from({ length: 15 }).map((_, index) => (
                    <PostThumbnailSkeleton key={index} />
                ))}
            >
                <HotPosts />
            </Suspense>
        </div>
    );
}
