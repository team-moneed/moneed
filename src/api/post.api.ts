import { TopBoardPostThumbnail, PostThumbnail, TopPostThumbnail, HotPostThumbnail } from '@/types/post';
import axios from 'axios';

export const getTopBoardPosts = async ({ boardId, limit }: { boardId: number; limit?: number }) => {
    const res = await axios.get<TopBoardPostThumbnail[]>(`/api/posts/top/${boardId}`, {
        params: {
            limit,
        },
    });
    return res.data;
};

export const getTopPosts = async ({ limit = 5 }: { limit?: number } = {}) => {
    const res = await axios.get<TopPostThumbnail[]>(`${process.env.NEXT_PUBLIC_MONEED_BASE_URL}/api/posts/top`, {
        params: {
            limit,
        },
    });
    return res.data;
};

export const getHotPosts = async ({ limit = 15, cursor = 0 }: { limit?: number; cursor?: number } = {}) => {
    const res = await axios.get<HotPostThumbnail[]>(`${process.env.NEXT_PUBLIC_MONEED_BASE_URL}/api/posts/hot`, {
        params: {
            limit,
            cursor,
        },
    });
    return res.data;
};

export const getPosts = async ({
    stockId,
    cursor = new Date(),
    limit = 15,
}: {
    stockId: number;
    cursor?: Date;
    limit?: number;
}) => {
    const res = await axios.get<PostThumbnail[]>(`${process.env.NEXT_PUBLIC_MONEED_BASE_URL}/api/posts`, {
        params: {
            stockId,
            cursor,
            limit,
        },
    });
    return res.data;
};
