'use client';

import HotPostThumbnail from './HotPostThumbnail';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useHotPosts } from '@/queries/posts.query';

export default function HotPosts() {
    const { data: posts, fetchNextPage, hasNextPage } = useHotPosts();

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
