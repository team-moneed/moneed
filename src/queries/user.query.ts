import { fetchMyInfo, fetchUserComments } from '@/api/user.api';
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

export const useUserComments = () => {
    return useSuspenseQuery({
        queryKey: ['user', 'me', 'comments'],
        queryFn: () => fetchUserComments(),
    });
};
