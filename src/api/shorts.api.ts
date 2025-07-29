import { YouTubeSearchResponse } from '@/types/youtube';
import { http } from './client';

export const fetchShorts = async ({ q, count, page }: { q: string; count: number; page?: string }) => {
    const res = await http.get<YouTubeSearchResponse>('/api/videos', {
        params: {
            q,
            count,
            page,
        },
    });

    return res.data;
};
