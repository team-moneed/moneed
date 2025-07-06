export interface PostWithUser {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    user: {
        id: number;
        nickname: string;
        profileImage: string;
    };
}
