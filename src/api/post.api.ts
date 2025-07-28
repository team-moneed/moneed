import {
    TopBoardPostThumbnail,
    PostThumbnail,
    TopPostThumbnail,
    HotPostThumbnail,
    CreatePostRequest,
    CreatePostResponse,
    DeletePostResponse,
    UpdatePostResponse,
    PostDetail,
    UpdatePostRequest,
    LikePostResponse,
    UnlikePostResponse,
} from '@/types/post';
import { http } from './client';
import { isFile } from '@/util/typeChecker';

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

export const getPost = async ({ postId }: { postId: number }) => {
    const res = await http.get<PostDetail>(`/api/posts/${postId}`);
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

export const createPost = async ({ stockId, title, content, thumbnailImage }: CreatePostRequest) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('stockId', stockId.toString());
    if (thumbnailImage) {
        formData.append('thumbnailImage', thumbnailImage, thumbnailImage.name);
    }

    return await http.post<CreatePostResponse>(`/api/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const deletePost = async ({ postId }: { postId: number }) => {
    return await http.delete<DeletePostResponse>(`/api/posts/${postId}`);
};
export const updatePost = async ({
    postId,
    title,
    content,
    thumbnailImage,
    prevThumbnailImageUrl,
}: UpdatePostRequest) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (isFile(thumbnailImage)) {
        formData.append('thumbnailImage', thumbnailImage, thumbnailImage.name);
    } else if (thumbnailImage === null) {
        // 썸네일 이미지 삭제한 경우
        formData.append('thumbnailImage', '');
    }
    if (prevThumbnailImageUrl) {
        formData.append('prevThumbnailImageUrl', prevThumbnailImageUrl);
    }
    return await http.put<UpdatePostResponse>(`/api/posts/${postId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const likePost = async ({ postId }: { postId: number }) => {
    return await http.post<LikePostResponse>(`/api/posts/${postId}/like`);
};

export const unlikePost = async ({ postId }: { postId: number }) => {
    return await http.delete<UnlikePostResponse>(`/api/posts/${postId}/like`);
};
