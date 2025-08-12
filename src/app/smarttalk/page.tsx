import FillHeartIcon from '@/components/Icons/FillHeartIcon';

const SmartTalkCardDatas = [
    {
        id: 1,
        title: '장이 끝나면 채팅도 안녕!',
        image: '',
        description:
            '개장과 동시에 오픈되어 장 마감 이후 오늘의 스맛톡은 전부 사라집니다. 어떤 정보도 하루뿐이니 놓치지마세요!',
    },
    {
        id: 2,
        title: '잠들 수 없는 새벽, 해외투자러 모여라!',
        image: '',
        description:
            "단 '6시간', 미국 증시 운영 시간에만 한정적으로 운영되어 실시간으로 집중적인 정보 공유와 토론이 가능합니다.",
    },
    {
        id: 3,
        title: '오늘의 주식 떡상 루트 공유 중',
        image: '',
        description:
            '주가 변동, 기업 공시, 시장 루머, 매매 전략 등 해당 섹터와 관련된 모든 정보와 의견이 실시간으로 공유됩니다.',
    },
];

function SmartTalkCard({ data }: { data: (typeof SmartTalkCardDatas)[number] }) {
    return (
        <div
            key={data.id}
            className='flex flex-col items-center gap-[1rem] shadow-[0_0_20px_#4549541A] rounded-[3.6rem] py-[4rem] px-[1.2rem]'
        >
            <div className='text-moneed-black text-h3'>{data.title}</div>
            <img src={data.image} alt={data.title} />
            <p className='text-lg text-moneed-black text-center'>{data.description}</p>
        </div>
    );
}

export default function SmartTalkPage() {
    return (
        <div className='flex flex-col gap-[4rem] w-full'>
            <div>
                <h1 className='text-[2.4rem] leading-[140%] font-bold text-center'>
                    스마트한 개미들의
                    <br /> 주식 대화, 스맛톡
                </h1>
                <img src='' alt='smarttalk-hero' />
                <div className='bg-moneed-black py-[1.6rem] px-[2rem] rounded-[3.6rem]'>
                    <div className='text-white text-center text-h2'>
                        마감 시간이 되면
                        <br /> 톡이 닫힌다! 👀
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-[4rem]'>
                {SmartTalkCardDatas.map(data => (
                    <SmartTalkCard key={data.id} data={data} />
                ))}
            </div>
            <div className='flex flex-col gap-[4rem] w-full'>
                <div className='text-center text-h4'>스맛톡이 기대된다면 하트를 눌러주세요!</div>
                <button className='flex items-center justify-center gap-[.8rem] text-white bg-moneed-gray-9 rounded-[1.6rem] py-[1.6rem] px-[1.2rem] w-full'>
                    <FillHeartIcon />
                    <span className='text-md'>I like that!</span>
                </button>
            </div>
        </div>
    );
}
