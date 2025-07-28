'use client';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/post.api';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import PostThumbnail from '@/app/community/[stockId]/PostThumbnail';

type PostsProps = {
    stockId: number;
};

const Posts = ({ stockId }: PostsProps) => {
    const {
        data: posts,
        fetchNextPage,
        hasNextPage,
    } = useSuspenseInfiniteQuery({
        queryKey: ['posts', stockId],
        queryFn: ({ pageParam = new Date() }) => getPosts({ stockId, cursor: pageParam }),
        getNextPageParam: lastPage =>
            lastPage?.length > 0 ? new Date(lastPage[lastPage.length - 1].createdAt) : undefined,
        initialPageParam: new Date(),
        select: data => data.pages.flatMap(page => page),
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
                <PostThumbnail key={post.id} post={post} />
            ))}
            <div ref={ref}></div>
        </>
    );
};

export default Posts;
