import Top5WithSuspense from './Top5';

export default function Top5Section({ id }: { id: string }) {
    const title = 'Top 5';
    const standardDate = new Date().toLocaleDateString('ko-KR', { month: 'long' });

    return (
        <section id={id} className='mt-[3.6rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-[1.6rem]'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-moneed-black sm:text-2xl sm:leading-[140%]'>
                    {title}
                </h2>
                <span className='text-moneed-gray-7 text-[1.2rem] font-normal leading-[135%]'>{standardDate} 기준</span>
            </div>
            <Top5WithSuspense />
        </section>
    );
}
