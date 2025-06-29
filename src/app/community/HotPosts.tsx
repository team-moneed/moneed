'use client';

import { getHotPosts } from '@/api/post.api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Post, { PostSkeleton } from '@/components/Community/Post';
import { Suspense } from 'react';

function HotPosts({ id }: { id: string }) {
    const title = '인기 급상승 게시글';

    const { data: posts } = useSuspenseInfiniteQuery({
        queryKey: ['hot-posts'],
        queryFn: ({ pageParam = 0 }) => getHotPosts({ limit: 5, cursor: pageParam }),
        getNextPageParam: lastPage => (lastPage.length > 0 ? lastPage[lastPage.length - 1].score : undefined),
        initialPageParam: 0,
        select: data => data.pages.flat(),
    });

    return (
        <section id={id} className='mt-[2.8rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-[1.8rem]'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-moneed-black lg:text-[2.4rem] lg:leading-[140%]'>
                    {title}
                </h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]'>
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}

export default function HotPostsWithSuspense({ id }: { id: string }) {
    return (
        <Suspense
            fallback={Array.from({ length: 15 }).map((_, index) => (
                <PostSkeleton key={index} />
            ))}
        >
            <HotPosts id={id} />
        </Suspense>
    );
}
