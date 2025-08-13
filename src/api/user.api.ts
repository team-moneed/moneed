import { User } from '@/generated/prisma';
import { http } from './client';
import { isFile } from '@/utils/typeChecker';
import { UpdateUserProfileRequest } from '@/types/user';
import { CommentWithUser } from '@/types/comment';
import { PostThumbnail } from '@/types/post';

export async function fetchMyInfo() {
    const res = await http.get<User>(`/api/users/me`);
    return res.data;
}

export async function fetchMyPosts() {
    const res = await http.get<PostThumbnail[]>('/api/users/me/posts');
    return res.data;
}

export async function fetchMyComments() {
    const res = await http.get<CommentWithUser[]>('/api/users/me/comments');
    return res.data;
}

export async function updateUserProfile({ nickname, profileImage, prevProfileImageUrl }: UpdateUserProfileRequest) {
    const formData = new FormData();
    formData.append('nickname', nickname);
    if (isFile(profileImage)) {
        formData.append('profileImage', profileImage, profileImage.name);
    } else if (typeof profileImage === 'string') {
        formData.append('profileImage', profileImage);
    }
    formData.append('prevProfileImageUrl', prevProfileImageUrl);
    const res = await http.put<User>('/api/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
}

export async function checkDuplicateNickname({ nickname }: { nickname: string }) {
    const res = await http.post<{ message: string; nickname: string }>('/api/users/nickname/check', { nickname });
    return res.data;
}
