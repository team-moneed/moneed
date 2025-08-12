import { fetchShorts } from '@/api/shorts.api';
import { useInfiniteQuery, useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useShorts = ({ q, count }: { q: string; count: number }) => {
    return useQuery({
        queryKey: ['shorts', q, count],
        queryFn: () => fetchShorts({ q, count }),
    });
};

export const useSuspenseShorts = ({ q, count }: { q: string; count: number }) => {
    return useSuspenseQuery({
        queryKey: ['shorts', q, count],
        queryFn: () => fetchShorts({ q, count }),
    });
};

export const useInfiniteShorts = ({ q, count }: { q: string; count: number }) => {
    return useInfiniteQuery({
        queryKey: ['shorts'],
        queryFn: ({ pageParam = '' }) => fetchShorts({ q, count, page: pageParam }),
        initialPageParam: '',
        getNextPageParam: lastPage => {
            const videos = lastPage.items;
            return videos && videos.length > 0 ? lastPage.nextPageToken : undefined;
        },
        select: data => data.pages.flatMap(page => page.items),
    });
};
