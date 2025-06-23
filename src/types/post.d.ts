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
    stocktype: string;
    thumbnailImage?: string;
    user: PostUser;
}

export type TopBoardPostThumbnail = Omit<
    PostThumbnail,
    'stocktype' | 'postImages' | 'isLiked' | 'likeCount' | 'commentCount'
>;
