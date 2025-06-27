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

const stringToHash = (str: string) => {
    return `#${str}`;
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
                    href={stringToHash(hashObj.top5)}
                    className={cn(
                        'text-moneed-gray-7 mr-[1.2rem] sm:text-lg sm:leading-[140%] cursor-pointer pb-[.3rem]',
                        hash === stringToHash(hashObj.top5) && 'text-moneed-black border-b-[3px] border-b-moneed-brand',
                    )}
                >
                    Top 5
                </a>
                <a
                    href={stringToHash(hashObj.category)}
                    className={cn(
                        'text-moneed-gray-7 mr-[1.2rem] sm:text-lg sm:leading-[140%] cursor-pointer pb-[.3rem]',
                        hash === stringToHash(hashObj.category) &&
                            'text-moneed-black border-b-[3px] border-b-moneed-brand',
                    )}
                >
                    지금 뜨는 종목
                </a>
                <a
                    href={stringToHash(hashObj.vote)}
                    className={cn(
                        'text-moneed-gray-7 mr-[1.2rem] sm:text-lg sm:leading-[140%] cursor-pointer pb-[.3rem]',
                        hash === stringToHash(hashObj.vote) && 'text-moneed-black border-b-[3px] border-b-moneed-brand',
                    )}
                >
                    지금 핫한 투표
                </a>
                <a
                    href={stringToHash(hashObj.hotPosts)}
                    className={cn(
                        'text-moneed-gray-7 mr-[1.2rem] sm:text-lg sm:leading-[140%] cursor-pointer pb-[.3rem]',
                        hash === stringToHash(hashObj.hotPosts) &&
                            'text-moneed-black border-b-[3px] border-b-moneed-brand',
                    )}
                >
                    인기 급상승 게시글
                </a>
            </div>
            <Top5 id={hashObj.top5} />
            <TopCategory id={hashObj.category} />
            <Vote id={hashObj.vote} />
            <HotPosts id={hashObj.hotPosts} />
        </div>
    );
}
