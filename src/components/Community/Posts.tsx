'use client';
import Post, { PostSkeleton } from './Post';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/post.api';
import { PostThumbnail } from '@/types/post';
import { Suspense } from 'react';

type PostsProps = {
    stockId: number;
};

const Posts = ({ stockId }: PostsProps) => {
    const { data: posts } = useSuspenseInfiniteQuery({
        queryKey: ['posts', stockId],
        queryFn: ({ pageParam = 0 }) => getPosts({ stockId, cursor: pageParam }),
        getNextPageParam: lastPage => (lastPage.length > 0 ? lastPage[lastPage.length - 1].id : undefined),
        initialPageParam: 0,
        select: data => data.pages.flatMap(page => page),
    });

    return (
        <>
            {posts.map((post: PostThumbnail) => (
                <Post
                    key={post.id}
                    userName={post.user.nickname}
                    content={post.content}
                    isliked={post.isLiked}
                    postId={post.id}
                    stocktype={post.stocktype}
                    postImages={post.thumbnailImage ? [post.thumbnailImage] : []}
                    likes={post.likeCount}
                    createdAt={post.createdAt}
                    title={post.title}
                />
            ))}
        </>
    );
};

export const PostsWithSuspense = ({ stockId }: PostsProps) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-[.6rem] gap-x-[1.2rem] mt-4 md:gap-y-[1.6rem] mb-[.6rem]'>
            <Suspense
                fallback={Array.from({ length: 15 }).map((_, index) => (
                    <PostSkeleton key={index} />
                ))}
            >
                <Posts stockId={stockId} />
            </Suspense>
        </div>
    );
};

export default Posts;
