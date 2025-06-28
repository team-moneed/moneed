import 'server-only';
import { kis } from './server';
import { KISAccessTokenResponse, OverseasStockConditionSearchResponse, MarketCode } from '@/types/kis';
import axios from 'axios';

// 한국 투자증권 API

type MarketCode = 'NYS' | 'NAS' | 'AMS' | 'TSE' | 'HKS' | 'SHS' | 'SZS' | 'HSX' | 'HNX';

const accessTokenUrl = '/oauth2/tokenP';
const searchByConditionUrl = '/uapi/overseas-price/v1/quotations/inquire-search';

/**
 * 접근토큰발급(P)[인증-001]
 * {@link https://apiportal.koreainvestment.com/apiservice-apiservice?/oauth2/tokenP API DOCS}
 */
export const getAccessToken = async () => {
    const response = await axios.post<KISAccessTokenResponse>(`${process.env.KIS_BASE_URL}${accessTokenUrl}`, {
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
