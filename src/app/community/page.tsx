'use client';

import useMoveScroll from '@/hooks/useMoveScroll';
import TopCategory from '@/app/community/TopCategory';
import { useRef } from 'react';
import Top5 from './Top5';
import HotPosts from './HotPosts';
import Vote from './Vote';

export default function CommunityPage() {
    const top5Ref = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const hotPostsRef = useRef<HTMLDivElement>(null);
    const voteRef = useRef<HTMLDivElement>(null);

    const { onMoveToElement: moveToTop5 } = useMoveScroll(top5Ref);
    const { onMoveToElement: moveToCategory } = useMoveScroll(categoryRef);
    const { onMoveToElement: moveToHotPosts } = useMoveScroll(hotPostsRef);
    const { onMoveToElement: moveToVote } = useMoveScroll(voteRef);

    return (
        <div>
            <div className='flex gap-4 pt-8 items-start'>
                <button
                    onClick={moveToTop5}
                    className='text-[1.4rem] leading-[140%] font-normal text-(--moneed-gray-7) mr-[1.2rem]'
                >
                    Top 5
                </button>
                <button
                    onClick={moveToCategory}
                    className='text-[1.4rem] leading-[140%] font-normal text-(--moneed-gray-7) mr-[1.2rem]'
                >
                    지금 뜨는 종목
                </button>
                <button
                    onClick={moveToVote}
                    className='text-[1.4rem] leading-[140%] font-normal text-(--moneed-gray-7) mr-[1.2rem]'
                >
                    지금 핫한 투표
                </button>
                <button
                    onClick={moveToHotPosts}
                    className='text-[1.4rem] leading-[140%] font-normal text-(--moneed-gray-7)'
                >
                    인기 급상승 게시글
                </button>
            </div>
            <Top5 ref={top5Ref} />
            <TopCategory ref={categoryRef} />
            <Vote ref={voteRef} />
            <HotPosts ref={hotPostsRef} />
        </div>
    );
}
