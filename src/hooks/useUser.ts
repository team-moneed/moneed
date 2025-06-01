import { decodeToken } from '@/lib/auth';

export const useUser = () => {
    const decodedInfo = decodeToken();

    if (!decodedInfo) {
        return null;
    }

    const { id, nickname, profileImage } = decodedInfo;

    return { id, nickname, profileImage };
};
