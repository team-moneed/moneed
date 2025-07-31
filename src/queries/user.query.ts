import { fetchMyInfo, fetchUserComments, fetchUserPosts } from '@/api/user.api';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useUser = () => {
    return useQuery({
        queryKey: ['user', 'me'],
        queryFn: () => fetchMyInfo(),
    });
};

export const useSuspenseUser = () => {
    return useSuspenseQuery({
        queryKey: ['user', 'me'],
        queryFn: () => fetchMyInfo(),
    });
};

export const useUserPosts = () => {
    return useQuery({
        queryKey: ['user', 'me', 'posts'],
        queryFn: () => fetchUserPosts(),
    });
};

export const useUserComments = () => {
    return useQuery({
        queryKey: ['user', 'me', 'comments'],
        queryFn: () => fetchUserComments(),
    });
};
