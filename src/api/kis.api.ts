import 'server-only';
import { kis } from './server';

// 한국 투자증권 API

type MarketCode = 'NYS' | 'NAS' | 'AMS' | 'TSE' | 'HKS' | 'SHS' | 'SZS' | 'HSX' | 'HNX';

const accessTokenUrl = '/oauth2/tokenP';
const searchByConditionUrl = '/uapi/overseas-price/v1/quotations/inquire-search';

export const getAccessToken = async () => {
    const response = await kis.post(accessTokenUrl, {
        grant_type: 'client_credentials',
        appkey: process.env.KIS_APP_KEY,
        appsecret: process.env.KIS_APP_SECRET,
    });
    return response.data;
};

export const getHotStock = async ({ market }: { market: MarketCode }) => {
    const response = await kis.get(searchByConditionUrl, {
        params: {
            AUTH: '',
            EXCD: market,
            CO_YN_RATE: 'Y',
        },
        headers: {
            Tr_id: 'HHDFS76410000',
        },
    });
    return response.data;
};
