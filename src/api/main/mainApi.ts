import { http } from '../request';

export const main = {
    main1: async () => {
        const response = await http.get<string>(``);
        return response.data;
    },
};
