'use client';

import { useRouter } from 'next/navigation';
import { ChipButton } from '@/components/Chip';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import PostThumbnailCard from '@/components/PostThumbnailCard';
import { useQuery } from '@tanstack/react-query';
import { getBoardRank } from '@/api/board.api';
import { getTopBoardPosts } from '@/api/post.api';
import { BoardRankResponse } from '@/types/board';

// TODO: 1시간마다 업데이트 해야함
const Top3 = () => {
    const anHour = 1000 * 60 * 60;
    const { data: boardList } = useQuery({
        queryKey: ['board-rank-top3'],
        queryFn: () => getBoardRank({ limit: 3 }),
        staleTime: anHour,
    });

    const [selectedStockId, setSelectedStockId] = useState<number | undefined>(boardList?.[0]?.stockId);

    const { data: postsWithUser, isLoading: isPostsLoading } = useQuery({
        queryKey: ['posts', selectedStockId],
        queryFn: () => getTopBoardPosts({ boardId: selectedStockId!, limit: 3 }),
        enabled: !!selectedStockId && boardList && boardList.length > 0,
        staleTime: anHour,
    });

    const router = useRouter();

    const moveToDetail = (stockId: number) => {
        router.push(`/posts/${stockId}`);
    };

    const movecommunity = (stockId: number) => {
        router.push(`/community/${stockId}`);
    };

    useEffect(() => {
        if (boardList && boardList.length > 0) {
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
                {!isPostsLoading && (postsWithUser === undefined || postsWithUser.length === 0) ? (
                    <div className='text-[2.4rem] text-moneed-gray-6 leading-[140%] text-center'>
                        24시간 내에 올라온 게시물이 없습니다.
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]'>
                        {postsWithUser?.map(post => (
                            <PostThumbnailCard key={post.id} onClick={() => moveToDetail(post.id)}>
                                <PostThumbnailCard.Body>
                                    <PostThumbnailCard.Title title={post.title} />
                                    <PostThumbnailCard.Content content={post.content} />
                                </PostThumbnailCard.Body>
                                <PostThumbnailCard.Footer>
                                    <PostThumbnailCard.AuthorWithDate
                                        user={post.user}
                                        createdAt={new Date(post.createdAt)}
                                    />
                                </PostThumbnailCard.Footer>
                            </PostThumbnailCard>
                        ))}
                    </div>
                )}
                <div className='flex justify-center mt-[1.8rem] sm:justify-start sm:mt-[2.6rem]'>
                    <Button
                        theme='ghost'
                        textcolor='primary'
                        onClick={() => movecommunity(selectedStockId!)}
                        className='flex items-center gap-[.8rem] py-0 sm:pl-0'
                        disabled={!selectedStockId}
                    >
                        <span className='text-[1.4rem] text-moneed-gray-8 font-semibold leading-[135%]'>
                            해당 게시판 더보기
                        </span>
                        <img src='/icon/icon-arrow-right.svg' alt='게시판 더보기' />
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
                    <ChipButton
                        key={board.stockId}
                        label={rankMedal(index) + board.stockName}
                        active={selectedStockId === board.stockId}
                        onClick={() => setSelectedStockId(board.stockId)}
                    />
                );
            })}
        </div>
    );
}

export default Top3;
