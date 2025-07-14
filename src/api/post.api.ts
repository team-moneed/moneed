import {
    TopBoardPostThumbnail,
    PostThumbnail,
    TopPostThumbnail,
    HotPostThumbnail,
    CreatePostRequest,
    CreatePostResponse,
    DeletePostResponse,

} from '@/types/post';
import { http } from './client';

export const getTopBoardPosts = async ({ boardId, limit }: { boardId: number; limit?: number }) => {
    const res = await http.get<TopBoardPostThumbnail[]>(`/api/posts/top/${boardId}`, {
        params: {
            limit,
        },
    });
    return res.data;
};

export const getTopPosts = async ({ limit = 5 }: { limit?: number } = {}) => {
    const res = await http.get<TopPostThumbnail[]>(`/api/posts/top`, {
        params: {
            limit,
        },
    });
    return res.data;
};

export const getHotPosts = async ({ limit = 15, cursor = 0 }: { limit?: number; cursor?: number } = {}) => {
    const res = await http.get<HotPostThumbnail[]>(`/api/posts/hot`, {
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
    const res = await http.get<PostThumbnail[]>(`/api/posts`, {
        params: {
            stockId,
            cursor,
            limit,
        },
    });
    return res.data;
};

export const createPost = async ({ title, content, stockId, thumbnailImage }: CreatePostRequest) => {
    return await http.post<CreatePostResponse>(`/api/posts`, {
        title,
        content,
        stockId,
        thumbnailImage,
    });
};

export const deletePost = async ({ postId }: { postId: number }) => {
    return await http.delete<DeletePostResponse>(`/api/posts/${postId}`);
};


