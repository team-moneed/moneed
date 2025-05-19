import { NextResponse } from 'next/server';

export async function GET() {
    const STOCKTYPES = [
        { stocktype: '전체', value: 'all', StockTypeId: 1 },
        { stocktype: '테슬라', value: 'tesla', StockTypeId: 2 },
        { stocktype: '애플', value: 'appke', StockTypeId: 3 },
        { stocktype: '카카오', value: 'kakao', StockTypeId: 6 },
        { stocktype: '마이크로소프트', value: 'microsoft', StockTypeId: 5 },
        { stocktype: '오라클', value: 'oracle', StockTypeId: 7 },
        { stocktype: '월마트', value: 'walmart', StockTypeId: 8 },
        { stocktype: 'jp 모건 체이스', value: 'jp chas', StockTypeId: 9 },
        { stocktype: '메타 플랫폼스(페이스', value: 'bub', StockTypeId: 10 },
        { stocktype: '마스타카드d', value: 'bub', StockTypeId: 11 },
        { stocktype: '넷플릭스', value: 'bub', StockTypeId: 12 },
        { stocktype: '존슨앤드존슨', value: 'bub', StockTypeId: 13 },
        { stocktype: '노보노디스ㅡ크(adf)', value: 'bub', StockTypeId: 14 },
        { stocktype: '아마존닷컴', value: 'bub', StockTypeId: 15 },
        { stocktype: 'ㅂ로드컴', value: 'bub', StockTypeId: 16 },
        { stocktype: '알파벳c', value: 'bub', StockTypeId: 17 },
        { stocktype: '엑슨모빌', value: 'bub', StockTypeId: 18 },
        { stocktype: '제이피모간 체이스', value: 'bub', StockTypeId: 19 },
        { stocktype: '코스트코 홀세일ㅇㄹㅇㄹㅇ', value: 'bub', StockTypeId: 20 },
        { stocktype: '코스트코 홀세일ㅁ', value: 'bub', StockTypeId: 21 },
        { stocktype: '코스트코 홀세일ㅇㅇㅇ', value: 'bub', StockTypeId: 22 },
        { stocktype: '마스타카드', value: 'bub', StockTypeId: 23 },
        { stocktype: '엔비디아', value: 'bub', StockTypeId: 24 },
        { stocktype: '비자', value: 'bub', StockTypeId: 25 },
        { stocktype: '유나이티드헬스', value: 'bub', StockTypeId: 26 },
        { stocktype: '프론터앤드갬블', value: 'bub', StockTypeId: 27 },
        { stocktype: '홈 디포', value: 'bub', StockTypeId: 28 },
        { stocktype: '뱅크오브아메리카', value: 'bub', StockTypeId: 29 },
        { stocktype: '코스트코 홀세일ㅋ', value: 'bub', StockTypeId: 30 },
    ];
    /*
      [종목 리스트]
    1. 애플
    2. 마이크로소프트
    3. 엔비디아
    4. 아마존닷컴
    5. 알파벳 C
    6. 알파벳 A
    7. 메타 플랫폼스(페이스북)
    8. 테슬라
    9. 브로드컴
    10. TSMC(ADR)
    11. 버크셔 헤서웨이 B
    12. 월마트
    13. 일라이 릴리
    14. 제이피모간 체이스
    15. 비자
    16. 마스타카드
    17. 오라클
    18. 엑슨 모빌
    19. 유나이티드헬스 그룹
    20. 코스트코 홀세일
    21. 프록터 앤드 갬블
    22. 넷플릭스
    23. 홈 디포
    24. 존슨 앤드 존슨
    25. 노보노디스크(ADR)
    26. 뱅크오브아메리카
    27. 세일스포스
    28. 애브비
    39. SAP(ADR)
    30. ASML 홀딩(ADR)
    */
    return NextResponse.json(STOCKTYPES);
}
