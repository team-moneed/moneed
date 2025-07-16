import { http } from './client';

export const createComment = async ({ postId, content }: { postId: number; content: string }) => {
    const response = await http.post('/api/comments', { postId, content });
    return response.data;
};
