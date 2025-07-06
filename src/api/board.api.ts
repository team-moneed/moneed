import axios from 'axios';
import { BoardRankResponse } from '@/types/board';

export const getBoardRank = async ({ limit }: { limit: number }) => {
    const response = await axios.get<Pick<BoardRankResponse, 'stockId' | 'stockName'>[]>('/api/board/rank', {
        params: {
            limit,
        },
    });
    return response.data;
};
