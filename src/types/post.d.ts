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
    title: string;
    content: string;
    stockId: number;
    thumbnailImage?: string;
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


