import { TopBoardPostThumbnail, PostThumbnail } from '@/types/post';
import axios from 'axios';

export const getTopPosts = async ({ boardId, limit }: { boardId: number; limit?: number }) => {
    const res = await axios.get<TopBoardPostThumbnail[]>('/api/posts/top', {
        params: {
            stockId: boardId,
            limit,
        },
    });
    return res.data;
};

export const getPosts = async ({
    stockId,
    cursor = 0,
    limit = 15,
}: {
    stockId: number;
    cursor?: number;
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
