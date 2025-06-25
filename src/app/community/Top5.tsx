'use client';

import { getTopPosts } from '@/api/post.api';
import PostCarousel from '@/components/Carousel/PostCarousel';
import { useSuspenseQuery } from '@tanstack/react-query';

const Top5 = ({ id }: { id: string }) => {
    const title = 'Top 5';
    const standardDate = new Date().toLocaleDateString('ko-KR', { month: 'long' });
    const POSTOPTIONS = {
        slidesToScroll: 1,
        loop: false,
        // align: 'start',
        draggable: true,
        // containScroll: "keepSnaps",
    };

    const { data: topPosts } = useSuspenseQuery({
        queryKey: ['top-posts'],
        queryFn: () => getTopPosts({ limit: 5 }),
    });

    return (
        <section id={id} className='mt-[3.6rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-[1.6rem]'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-moneed-black sm:text-2xl sm:leading-[140%]'>
                    {title}
                </h2>
                <span className='text-moneed-gray-7 text-[1.2rem] font-normal leading-[135%]'>{standardDate} 기준</span>
            </div>
            <PostCarousel posts={topPosts} options={POSTOPTIONS} />
        </section>
    );
};

export default Top5;
