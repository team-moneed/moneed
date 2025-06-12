import PostCarousel from '@/components/Carousel/PostCarousel';

// TODO: API 추가
const topPosts = [
    {
        postId: 1,
        title: '1',
        content:
            '1 테슬라 주식 언제 사테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사  ',
        userName: '사용자1',
        createdAt: '2024-12-10T10:00:00Z',
        stocktype: '테슬라',
    },
    {
        postId: 2,
        title: '2',
        content:
            '2 주식으로 돈벌래돈벌꺼야!!테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사언제사야이득이야? 알려줘알려줘알려주라고!!',
        userName: '사용자5',
        createdAt: '2024-12-09T09:00:00Z',
        stocktype: '애플',
    },
    {
        postId: 3,
        title: '3',
        content: '3 카카오게시글! 카카오카카ㅗ오오',
        userName: '사용자6',
        createdAt: '2024-12-09T09:00:00Z',
        stocktype: '카카오',
    },
    {
        postId: 4,
        title: '4',
        content: '4 카카오게시글! 카카오카카ㅗ오오',
        userName: '사용자6',
        createdAt: '2024-12-09T09:00:00Z',
        stocktype: '카카오',
    },
];

const Top5 = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
    const title = 'Top 5';
    const standardDate = '12월';
    const POSTOPTIONS = {
        slidesToScroll: 1,
        loop: false,
        // align: 'start',
        draggable: true,
        // containScroll: "keepSnaps",
    };

    return (
        <section ref={ref} className='mt-[3.6rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-[1.6rem]'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-(--moneed-black) lg:text-[2.4rem] lg:leading-[140%]'>
                    {title}
                </h2>
                <span className='text-(--moneed-gray-7) text-[1.2rem] font-normal leading-[135%]'>
                    {standardDate} 기준
                </span>
            </div>
            <PostCarousel slides={topPosts} options={POSTOPTIONS} />
        </section>
    );
};

export default Top5;
