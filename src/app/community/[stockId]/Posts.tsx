'use client';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import PostThumbnail from '@/app/community/[stockId]/PostThumbnail';
import { useInfinitePosts } from '@/queries/posts.query';

type PostsProps = {
    stockId: number;
};

const Posts = ({ stockId }: PostsProps) => {
    const { data: posts, hasNextPage, fetchNextPage } = useInfinitePosts({ stockId });

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
                <PostThumbnail key={post.id} post={post} />
            ))}
            <div ref={ref}></div>
        </>
    );
};

export default Posts;
