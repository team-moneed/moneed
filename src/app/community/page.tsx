'use client';

import TopCategory from '@/app/community/TopCategory';
import { useEffect, useState } from 'react';
import Top5 from './Top5';
import HotPosts from './HotPosts';
import Vote from './Vote';
import { cn } from '@/util/style';

const hashObj = {
    top5: 'top5',
    category: 'category',
    vote: 'vote',
    hotPosts: 'hotPosts',
};

export default function CommunityPage() {
    const [hash, setHash] = useState('');
    const handleHashChange = () => {
        const hash = window.location.hash;
        setHash(hash);
    };

    useEffect(() => {
        window.addEventListener('hashchange', handleHashChange);

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    return (
        <div>
            <div className='flex gap-4 pt-8 items-start border-b-2 border-moneed-gray-5'>
                <a
                    href={`#${hashObj.top5}`}
                    className={cn(
                        'text-moneed-gray-7 mr-[1.2rem] sm:text-lg sm:leading-[140%] cursor-pointer pb-[.3rem]',
                        hash === hashObj.top5 && 'text-moneed-black border-b-[3px] border-b-moneed-brand',
                    )}
                >
                    Top 5
                </a>
                <a
                    href={`#${hashObj.category}`}
                    className={cn(
                        'text-moneed-gray-7 mr-[1.2rem] sm:text-lg sm:leading-[140%] cursor-pointer pb-[.3rem]',
                        hash === hashObj.category && 'text-moneed-black border-b-[3px] border-b-moneed-brand',
                    )}
                >
                    지금 뜨는 종목
                </a>
                <a
                    href={`#${hashObj.vote}`}
                    className={cn(
                        'text-moneed-gray-7 mr-[1.2rem] sm:text-lg sm:leading-[140%] cursor-pointer pb-[.3rem]',
                        hash === hashObj.vote && 'text-moneed-black border-b-[3px] border-b-moneed-brand',
                    )}
                >
                    지금 핫한 투표
                </a>
                <a
                    href={`#${hashObj.hotPosts}`}
                    className={cn(
                        'text-moneed-gray-7 mr-[1.2rem] sm:text-lg sm:leading-[140%] cursor-pointer pb-[.3rem]',
                        hash === hashObj.hotPosts && 'text-moneed-black border-b-[3px] border-b-moneed-brand',
                    )}
                >
                    인기 급상승 게시글
                </a>
            </div>
            <Top5 />
            <TopCategory />
            <Vote />
            <HotPosts />
        </div>
    );
}
