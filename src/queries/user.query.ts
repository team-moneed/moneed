import { fetchMyInfo, fetchUserPosts } from '@/api/user.api';
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
    return useSuspenseQuery({
        queryKey: ['user', 'me', 'posts'],
        queryFn: () => fetchUserPosts(),
    });
};
