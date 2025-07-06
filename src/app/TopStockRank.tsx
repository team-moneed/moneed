'use client';

import { useRouter } from 'next/navigation';
import Chip from '@/components/Chip';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import PostThumbnailCard from '@/app/PostThumbnailCard';
import { useQuery } from '@tanstack/react-query';
import { getBoardRank } from '@/api/board.api';
import { getPostsWithUserByBoardId } from '@/api/post.api';
import { BoardRankResponse } from '@/types/board';

const TopStockRank = () => {
    const { data: boardList } = useQuery({
        queryKey: ['boardRank'],
        queryFn: () => getBoardRank({ limit: 3 }),
    });

    const [selectedStockId, setSelectedStockId] = useState<number | undefined>(boardList?.[0]?.stockId);

    const { data: postsWithUser } = useQuery({
        queryKey: ['posts', selectedStockId],
        queryFn: () => getPostsWithUserByBoardId(selectedStockId!, 3),
        enabled: !!selectedStockId,
    });

    const router = useRouter();
    const movecommunity = (stockId: number) => {
        router.push(`/community/${stockId}`);
    };

    useEffect(() => {
        if (boardList) {
            setSelectedStockId(boardList[0].stockId);
        }
    }, [boardList]);

    return (
        <>
            <StockRanks
                boardList={boardList ?? []}
                selectedStockId={selectedStockId}
                setSelectedStockId={setSelectedStockId}
            />
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]'>
                    {postsWithUser?.map(post => (
                        <PostThumbnailCard
                            key={post.id}
                            postId={post.id}
                            userName={post.user.nickname}
                            content={post.content}
                            title={post.title}
                            createdAt={new Date(post.createdAt)}
                        />
                    ))}
                </div>
                <div className='flex justify-center mt-[1.8rem] lg:justify-start lg:mt-[2.6rem]'>
                    <Button
                        theme='ghost'
                        textcolor='primary'
                        onClick={() => movecommunity(selectedStockId!)}
                        className='flex items-center gap-[.8rem] py-0 lg:pl-0'
                        disabled={!selectedStockId}
                    >
                        <span className='text-[1.4rem] text-moneed-gray-8 font-semibold leading-[135%]'>
                            해당 게시판 더보기
                        </span>
                        <img src='/icon/icon-arrow-right.svg' alt='' />
                    </Button>
                </div>
            </div>
        </>
    );
};

const rankMedal = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
};

function StockRanks({
    boardList,
    selectedStockId,
    setSelectedStockId,
}: {
    boardList: Pick<BoardRankResponse, 'stockId' | 'stockName'>[];
    selectedStockId: number | undefined;
    setSelectedStockId: (stockId: number) => void;
}) {
    return (
        <div className='flex gap-4'>
            {boardList.map((board, index) => {
                return (
                    <Chip
                        key={board.stockId}
                        label={rankMedal(index) + board.stockName}
                        onClick={() => setSelectedStockId(board.stockId)}
                        active={selectedStockId === board.stockId}
                    />
                );
            })}
        </div>
    );
}

export default TopStockRank;
