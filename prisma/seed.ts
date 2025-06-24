import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// Stock 데이터
const stockData = [
    { name: '애플', thumbnailImage: '' },
    { name: '마이크로소프트', thumbnailImage: '' },
    { name: '엔비디아', thumbnailImage: '' },
    { name: '아마존닷컴', thumbnailImage: '' },
    { name: '알파벳 C', thumbnailImage: '' },
    { name: '알파벳 A', thumbnailImage: '' },
    { name: '메타 플랫폼스(페이스북)', thumbnailImage: '' },
    { name: '테슬라', thumbnailImage: '' },
    { name: '브로드컴', thumbnailImage: '' },
    { name: 'TSMC(ADR)', thumbnailImage: '' },
    { name: '버크셔 헤서웨이 B', thumbnailImage: '' },
    { name: '월마트', thumbnailImage: '' },
    { name: '일라이 릴리', thumbnailImage: '' },
    { name: '제이피모간 체이스', thumbnailImage: '' },
    { name: '비자', thumbnailImage: '' },
    { name: '마스타카드', thumbnailImage: '' },
    { name: '오라클', thumbnailImage: '' },
    { name: '엑슨 모빌', thumbnailImage: '' },
    { name: '유나이티드헬스 그룹', thumbnailImage: '' },
    { name: '코스트코 홀세일', thumbnailImage: '' },
    { name: '프록터 앤드 갬블', thumbnailImage: '' },
    { name: '넷플릭스', thumbnailImage: '' },
    { name: '홈 디포', thumbnailImage: '' },
    { name: '존슨 앤드 존슨', thumbnailImage: '' },
    { name: '노보노디스크(ADR)', thumbnailImage: '' },
    { name: '뱅크오브아메리카', thumbnailImage: '' },
    { name: '세일스포스', thumbnailImage: '' },
    { name: '애브비', thumbnailImage: '' },
    { name: 'SAP(ADR)', thumbnailImage: '' },
    { name: 'ASML 홀딩(ADR)', thumbnailImage: '' },
];

// Posts 데이터
const postTitles = [
    '애플 주가 전망 어떻게 보시나요?',
    '테슬라 실적 발표 후 급등! 이제 매수 타이밍일까요?',
    '엔비디아 AI 붐, 언제까지 갈까요?',
    '마이크로소프트 클라우드 사업 성장률 분석',
    '아마존 물류 네트워크 확장 소식',
    '알파벳 광고 수익 감소 우려',
    '메타 메타버스 투자 과연 성공할까?',
    '넷플릭스 구독자 수 증가세 지속',
    '월마트 오프라인 매장 디지털 전환',
    '비자 결제 시스템 혁신 동향',
    '마스터카드 암호화폐 결제 도입',
    '제이피모건 디지털 뱅킹 확장',
    '오라클 클라우드 인프라 성장',
    '세일스포스 CRM 시장 점유율',
    '홈디포 주택 개선 시장 호황',
    '코스트코 회원제 모델의 강점',
    '존슨앤드존슨 의료기기 부문 분석',
    '일라이릴리 당뇨병 치료제 성과',
    '애브비 면역치료제 시장 전망',
    '브로드컴 반도체 업계 동향',
    'TSMC 파운드리 시장 독점 현황',
    '버크셔 헤서웨이 포트폴리오 분석',
    '노보노디스크 비만치료제 전망',
    'SAP 클라우드 전환 성과',
    'ASML 극자외선 장비 수요 증가',
];

const postContents = [
    '최근 실적을 보면 매출이 꾸준히 증가하고 있어서 긍정적으로 보고 있습니다. 특히 서비스 부문의 성장이 인상적이네요.',
    '기술적 분석 관점에서 보면 지지선을 잘 지키고 있고, 거래량도 증가하고 있어서 상승 모멘텀이 있어 보입니다.',
    '펀더멘털 분석을 해보니 PER이 업계 평균보다 낮아서 저평가된 것 같습니다. 장기 투자 관점에서 매력적이에요.',
    '최근 발표된 신제품이 시장에서 좋은 반응을 얻고 있어서 향후 매출 증가가 기대됩니다.',
    '경쟁사 대비 기술력이 우수하고 특허도 많이 보유하고 있어서 경쟁 우위가 있다고 봅니다.',
    '글로벌 시장 확장 계획이 구체적이고 실현 가능성이 높아 보여서 성장 가능성이 크다고 생각합니다.',
    '최근 주가 조정이 있었지만 오히려 좋은 매수 기회라고 봅니다. 단기적 변동보다는 장기적 성장에 주목하고 있어요.',
    '배당 수익률도 안정적이고 배당 성장률도 꾸준해서 배당 투자자에게도 매력적인 종목이라고 생각합니다.',
    'ESG 경영에도 적극적이어서 장기적으로 지속가능한 성장이 가능할 것 같습니다.',
    '업계 전체적으로 성장하고 있는 분야이고, 이 회사가 시장 점유율 1위를 유지하고 있어서 안정적입니다.',
    '최근 발표된 분기 실적이 예상을 상회했고, 가이던스도 상향 조정되어서 긍정적입니다.',
    '주요 경쟁사들과 비교해도 마진율이 높고 효율성이 좋아서 투자 매력도가 높다고 봅니다.',
    '신규 시장 진출 계획이 잘 수립되어 있고, 이미 테스트 마케팅에서 좋은 결과를 보이고 있어요.',
    '기관투자자들의 매수세가 꾸준히 유입되고 있어서 주가 상승 동력이 있다고 생각합니다.',
    '최근 인수합병 소식이 있었는데, 시너지 효과가 클 것으로 예상되어 기대하고 있습니다.',
    '차세대 기술 개발에 대한 투자가 활발하고, 연구개발비 비중도 적정 수준이라고 봅니다.',
    '글로벌 공급망 다각화가 잘 이루어져 있어서 리스크 관리 측면에서도 우수합니다.',
    '정부 정책의 수혜를 받을 수 있는 업종이라서 추가적인 성장 모멘텀이 있을 것 같아요.',
    '주주친화적 정책을 지속적으로 추진하고 있어서 주주 가치 제고에 노력하고 있습니다.',
    '최근 업계 트렌드를 선도하고 있고, 혁신적인 비즈니스 모델로 차별화되어 있어서 긍정적으로 봅니다.',
];

async function seedStocks() {
    console.log('🚀 Stock 데이터 생성 시작...');

    let stocksCreated = 0;
    for (const stock of stockData) {
        const existingStock = await prisma.stock.findFirst({
            where: { name: stock.name },
        });

        if (existingStock) {
            console.log(`⚠️  '${stock.name}'은(는) 이미 존재합니다.`);
            continue;
        }

        await prisma.stock.create({ data: stock });
        console.log(`✅ '${stock.name}' 생성 완료`);
        stocksCreated++;
    }

    console.log(`📊 Stock 생성 완료: ${stocksCreated}개 추가됨\n`);
}

async function seedPosts() {
    console.log('📝 Posts 더미 데이터 생성 시작...');

    // User와 Stock 데이터 확인
    const users = await prisma.user.findMany({
        select: { id: true, nickname: true },
    });

    const stocks = await prisma.stock.findMany({
        select: { id: true, name: true },
    });

    if (users.length === 0) {
        console.log('❌ User 데이터가 없습니다. Posts 생성을 건너뜁니다.');
        return;
    }

    if (stocks.length === 0) {
        console.log('❌ Stock 데이터가 없습니다. Posts 생성을 건너뜁니다.');
        return;
    }

    console.log(`✅ Users: ${users.length}개, Stocks: ${stocks.length}개 발견`);

    const existingPostsCount = await prisma.post.count();
    console.log(`현재 Posts: ${existingPostsCount}개`);

    // 50개의 더미 포스트 생성
    const postsToCreate = 50;
    let postsCreated = 0;

    for (let i = 0; i < postsToCreate; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomStock = stocks[Math.floor(Math.random() * stocks.length)];
        const randomTitle = postTitles[Math.floor(Math.random() * postTitles.length)];
        const randomContent = postContents[Math.floor(Math.random() * postContents.length)];
        const randomViews = Math.floor(Math.random() * 1000);
        const randomLikes = Math.floor(Math.random() * 100);

        const randomDate = new Date();
        randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));

        try {
            await prisma.post.create({
                data: {
                    title: `${randomTitle} - ${randomStock.name}`,
                    content: randomContent,
                    views: randomViews,
                    likes: randomLikes,
                    userId: randomUser.id,
                    stockId: randomStock.id,
                    createdAt: randomDate,
                    updatedAt: randomDate,
                    thumbnailImage: null,
                },
            });

            postsCreated++;
            if (postsCreated % 10 === 0) {
                console.log(`✅ ${postsCreated}/${postsToCreate} Posts 생성 중...`);
            }
        } catch (error) {
            console.error(`❌ Post ${i + 1} 생성 실패:`, error);
        }
    }

    console.log(`📊 Posts 생성 완료: ${postsCreated}개 추가됨`);
}

async function main() {
    console.log('🌱 전체 시드 데이터 생성을 시작합니다...\n');

    // 1단계: Stock 데이터 생성
    await seedStocks();

    // 2단계: Posts 데이터 생성
    await seedPosts();

    console.log('\n🎉 모든 시드 데이터 생성이 완료되었습니다!');
}

main()
    .catch(e => {
        console.error('❌ 에러 발생:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
