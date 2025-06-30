'use client';

import { getHotPosts } from '@/api/post.api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Post, { PostSkeleton } from '@/components/Community/Post';
import { Suspense } from 'react';

export default function HotPostsWithSuspense() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]'>
            <Suspense
                fallback={Array.from({ length: 15 }).map((_, index) => (
                    <PostSkeleton key={index} />
                ))}
            >
                <HotPosts />
            </Suspense>
        </div>
    );
}

function HotPosts() {
    const { data: posts } = useSuspenseInfiniteQuery({
        queryKey: ['hot-posts'],
        queryFn: ({ pageParam = 0 }) => getHotPosts({ limit: 15, cursor: pageParam }),
        getNextPageParam: lastPage => (lastPage.length > 0 ? lastPage[lastPage.length - 1].score : undefined),
        initialPageParam: 0,
        select: data => data.pages.flat(),
    });

    return (
        <>
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
}
