import { getHotPosts, getPost, getPosts, getTopBoardPosts, getTopPosts } from '@/api/post.api';
import { fetchMyPosts } from '@/api/user.api';
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useMyPosts = () => {
    return useSuspenseQuery({
        queryKey: ['user', 'me', 'posts'],
        queryFn: () => fetchMyPosts(),
    });
};

export const useTop3Posts = ({ boardId, staleTime = 0 }: { boardId: number; staleTime?: number }) => {
    return useSuspenseQuery({
        queryKey: ['posts', 'top3', boardId],
        queryFn: () => getTopBoardPosts({ boardId, limit: 3 }),
        staleTime,
    });
};

export const useInfinitePosts = ({ stockId }: { stockId: number }) => {
    return useSuspenseInfiniteQuery({
        queryKey: ['posts', stockId],
        queryFn: ({ pageParam }) => getPosts({ stockId, cursor: pageParam }),
        getNextPageParam: lastPage =>
            lastPage?.length > 0 ? new Date(lastPage[lastPage.length - 1].createdAt) : undefined,
        initialPageParam: new Date(),
        select: data => data.pages.flatMap(page => page),
    });
};

export const useHotPosts = () => {
    return useSuspenseInfiniteQuery({
        queryKey: ['hot-posts'],
        queryFn: ({ pageParam = 0 }) => getHotPosts({ limit: 15, cursor: pageParam }),
        getNextPageParam: lastPage => (lastPage.length > 0 ? lastPage[lastPage.length - 1].score : undefined),
        initialPageParam: 0,
        select: data => data.pages.flat(),
    });
};

export const useTopPosts = ({ limit = 5 }: { limit: number }) => {
    return useSuspenseQuery({
        queryKey: ['top-posts'],
        queryFn: () => getTopPosts({ limit }),
    });
};

export const usePost = ({ postId }: { postId: number }) => {
    return useSuspenseQuery({
        queryKey: ['post', Number(postId)],
        queryFn: () => getPost({ postId: Number(postId) }),
        staleTime: 0,
        gcTime: 0,
    });
};
