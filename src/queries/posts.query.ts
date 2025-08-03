import { getPosts, getTopBoardPosts } from '@/api/post.api';
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
