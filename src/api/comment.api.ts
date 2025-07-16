import { http } from './client';

export const createComment = async ({ postId, content }: { postId: number; content: string }) => {
    const response = await http.post('/api/comments', { postId, content });
    return response.data;
};

export const deleteComment = async ({ commentId }: { commentId: number }) => {
    const response = await http.delete(`/api/comments/${commentId}`);
    return response.data;
};

export const updateComment = async ({ commentId, content }: { commentId: number; content: string }) => {
    const response = await http.put(`/api/comments/${commentId}`, { content });
    return response.data;
};
