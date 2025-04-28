import { main as mainApi } from '../main/mainApi';

export const main = {
    main1: () => ({
        queryKey: ['main1'],
        queryFn: () => mainApi.main1(),
    }),
};
