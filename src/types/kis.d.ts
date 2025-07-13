export type MarketCode = 'NYS' | 'NAS' | 'AMS' | 'TSE' | 'HKS' | 'SHS' | 'SZS' | 'HSX' | 'HNX';

export type KISAccessTokenResponse = {
    access_token: string;
    access_token_token_expired: string;
    token_type: string;
    expires_in: number;
};

export type OverseasStockConditionSearchResponse = {
    rt_cd: string; // 성공 실패 여부
    msg_cd: string; // 응답코드
    msg1: string; // 응답메세지
    output1: {
        zdiv: string; // 소수점 자리수
        stat: string; // 거래상태정보
        crec: string; // 현재조회종목수
        trec: string; // 전체조회종목수
        nrec: string; // Record Count
    };
    output2: {
        rsym: string; // 실시간조회심볼
        excd: string; // 거래소코드
        name: string; // 종목명
        symb: string; // 종목코드
        last: string; // 현재가
        shar: string; // 발행주식
        valx: string; // 시가총액
        plow: string; // 저가
        phigh: string; // 고가
        popen: string; // 시가
        tvol: string; // 거래량
        rate: string; // 등락율
        diff: string; // 대비
        sign: '1' | '2' | '3'; // 기호 (1: 하락, 2: 상승, 3:보합)
        avol: string; // 거래대금
        eps: string; // EPS
        per: string; // PER
        rank: string; // 순위
        ename: string; // 영문종목명
        e_ordyn: string; // 매매가능
    }[];
};

export type OverseasStockPriceResponse = {
    rt_cd: string; // 성공 실패 여부 (0: 성공, 0이외의 값: 실패)
    msg_cd: string; // 응답코드
    msg1: string; // 응답메세지
    output: {
        rsym: string; // 종목코드 D + 시장구분(3자리) + 종목코드 (예: DNASAAPL)
        zdiv: string; // 소수점 자리수
        base: string; // 전일종가
        pvol: string; // 전일거래량
        last: string; // 현재가
        sign: '1' | '2' | '3' | '4' | '5'; // 대비기호 (1: 상한, 2: 상승, 3:보합, 4:하한, 5:하락)
        diff: string; // 대비
        rate: string; // 등락율
        tvol: string; // 거래량
        tamt: string; // 거래대금
        ordy: string; // 매수가능여부
    };
};
