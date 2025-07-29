import { fetchMyInfo } from '@/api/user.api';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
    return useQuery({
        queryKey: ['user', 'me'],
        queryFn: () => fetchMyInfo(),
    });
};
