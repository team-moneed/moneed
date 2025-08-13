import { fetchShorts } from '@/api/shorts.api';
import { getMsUntilMidnight } from '@/util/date';
import { useInfiniteQuery, useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

const untilMidnight = getMsUntilMidnight();

export const useShorts = ({ q, count }: { q: string; count: number }) => {
    return useQuery({
        queryKey: ['shorts', q, count],
        queryFn: () => fetchShorts({ q, count }),
        staleTime: untilMidnight,
        gcTime: untilMidnight,
    });
};

export const useSuspenseShorts = ({ q, count }: { q: string; count: number }) => {
    return useSuspenseQuery({
        queryKey: ['shorts', q, count],
        queryFn: () => fetchShorts({ q, count }),
        staleTime: untilMidnight,
        gcTime: untilMidnight,
    });
};

export const useInfiniteShorts = ({ q, count }: { q: string; count: number }) => {
    return useInfiniteQuery({
        queryKey: ['infinite-shorts', q, count],
        queryFn: ({ pageParam = '' }) => fetchShorts({ q, count, page: pageParam }),
        initialPageParam: '',
        getNextPageParam: lastPage => {
            const videos = lastPage.items;
            return videos && videos.length > 0 ? lastPage.nextPageToken : undefined;
        },
        select: data => {
            const videos = data.pages.flatMap(page => page.items);
            const uniqueVideos = videos.filter(
                (video, i) => videos.findIndex(v => v.id.videoId === video.id.videoId) === i,
            );
            return uniqueVideos;
        },
        staleTime: untilMidnight,
        gcTime: untilMidnight,
    });
};

export const useSuspenseInfiniteShorts = ({ q, count }: { q: string; count: number }) => {
    return useSuspenseInfiniteQuery({
        queryKey: ['infinite-shorts', q, count],
        queryFn: ({ pageParam = '' }) => fetchShorts({ q, count, page: pageParam }),
        initialPageParam: '',
        getNextPageParam: lastPage => {
            const videos = lastPage.items;
            return videos && videos.length > 0 ? lastPage.nextPageToken : undefined;
        },
        select: data => {
            const videos = data.pages.flatMap(page => page.items);
            const uniqueVideos = videos.filter(
                (video, i) => videos.findIndex(v => v.id.videoId === video.id.videoId) === i,
            );
            return uniqueVideos;
        },
        staleTime: untilMidnight,
        gcTime: untilMidnight,
    });
};
