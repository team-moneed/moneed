import { TopBoardPostThumbnail, PostThumbnail } from '@/types/post';
import axios from 'axios';

export const getTopBoardPosts = async ({ boardId, limit }: { boardId: number; limit?: number }) => {
    const res = await axios.get<TopBoardPostThumbnail[]>(`/api/posts/top/${boardId}`, {
        params: {
            limit,
        },
    });
    return res.data;
};

export const getTopPosts = async ({ limit }: { limit?: number } = {}) => {
    const res = await axios.get<PostThumbnail[]>('/api/posts/top', {
        params: {
            limit,
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
    const res = await axios.get<PostThumbnail[]>('/api/posts', {
        params: {
            stockId,
            cursor,
            limit,
        },
    });
    return res.data;
};
