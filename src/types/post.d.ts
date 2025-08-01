import { Comment as PrismaComment } from '@/generated/prisma';

export interface PostUser {
    id: string;
    nickname: string;
    profileImage: string;
}

export interface PostThumbnail {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    isLiked: boolean;
    likeCount: number;
    commentCount: number;
    stock: {
        id: number;
        name: string;
    };
    thumbnailImage?: string;
    user: PostUser;
}

export interface Comment extends PrismaComment {
    user: PostUser;
}

export interface PostDetail {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    isLiked: boolean;
    comments: Comment[];
    likeCount: number;
    stock: {
        id: number;
        name: string;
    };
    user: PostUser;
    thumbnailImage?: string;
}

export type HotPostThumbnail = PostThumbnail & {
    score: number;
};

export type TopBoardPostThumbnail = Omit<
    PostThumbnail,
    'stocktype' | 'postImages' | 'isLiked' | 'likeCount' | 'commentCount'
>;

export type TopPostThumbnail = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    user: PostUser;
    score: number;
    stock: {
        id: number;
        name: string;
    };
};

export type CreatePostRequest = {
    stockId: number;
    title: string;
    content: string;
    thumbnailImage?: File | null;
};

export type CreatePostResponse = {
    message: string;
    stockId: number;
    postId: number;
};

export type DeletePostRequest = {
    postId: number;
};

export type DeletePostResponse = {
    message: string;
    stockId: number;
    postId: number;
};

export type UpdatePostRequest = {
    postId: number;
    title: string;
    content: string;
    thumbnailImage: File | string | null;
    prevThumbnailImageUrl: string | null;
};

export type UpdatePostResponse = {
    message: string;
    stockId: number;
    postId: number;
};

export type LikePostResponse = {
    message: string;
};

export type UnlikePostResponse = {
    message: string;
};
