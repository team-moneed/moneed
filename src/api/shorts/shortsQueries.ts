import { fetchShorts } from './shortsApi';

export const shorts = {
    getYoutubeshorts: () => ({
        queryKey: ['shorts'],
        queryFn: fetchShorts,
    }),
};
