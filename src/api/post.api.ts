import { PostWithUser } from '@/types/post';
import { http } from './request';

// TODO: cursor pagination 적용
export const getPostsWithUserByBoardId = async (boardId: number, limit?: number) => {
    const res = await http.get<PostWithUser[]>('/api/posts', {
        params: {
            boardId,
            limit,
        },
    });
    return res.data;
};
