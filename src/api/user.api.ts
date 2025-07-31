import { Comment, Post, User } from '@/generated/prisma';
import { http } from './client';

export async function fetchMyInfo() {
    const res = await http.get<User>(`/api/users/me`);
    return res.data;
}

export async function fetchUserPosts() {
    const res = await http.get<Post[]>('/api/users/me/posts');
    return res.data;
}

export async function fetchUserComments() {
    const res = await http.get<Comment[]>('/api/users/me/comments');
    return res.data;
}

export async function updateUserProfile({ nickname, profileImage }: { nickname: string; profileImage: string }) {
    const res = await http.put<User>('/api/users/me', { nickname, profileImage });
    return res.data;
}

export async function checkDuplicateNickname({ nickname }: { nickname: string }) {
    const res = await http.post<{ message: string; nickname: string }>('/api/users/nickname/check', { nickname });
    return res.data;
}
