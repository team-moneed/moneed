'use client';

import { getHotPosts } from '@/api/post.api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import HotPostThumbnail from './HotPostThumbnail';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function HotPosts() {
    const {
        data: posts,
        fetchNextPage,
        hasNextPage,
    } = useSuspenseInfiniteQuery({
        queryKey: ['hot-posts'],
        queryFn: ({ pageParam = 0 }) => getHotPosts({ limit: 15, cursor: pageParam }),
        getNextPageParam: lastPage => (lastPage.length > 0 ? lastPage[lastPage.length - 1].score : undefined),
        initialPageParam: 0,
        select: data => data.pages.flat(),
    });

    const ref = useIntersectionObserver({
        onIntersect: () => {
            if (hasNextPage) {
                fetchNextPage();
            }
        },
    });

    return (
        <>
            {posts.map(post => (
                <HotPostThumbnail key={post.id} post={post} />
            ))}
            <div ref={ref}></div>
        </>
    );
}
