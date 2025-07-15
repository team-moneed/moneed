'use client';

import PostThumbnailCard from '@/components/PostThumbnailCard';
import { getTopBoardPosts } from '@/api/post.api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BoardRankResponse } from '@/types/board';
import { useRouter } from 'next/navigation';

export default function Top3Posts({ selectedStock }: { selectedStock: BoardRankResponse }) {
    const router = useRouter();
    const anHour = 1000 * 60 * 60;

    const { data: postsWithUser } = useSuspenseQuery({
        queryKey: ['posts', selectedStock.stockId],
        queryFn: () => getTopBoardPosts({ boardId: selectedStock.stockId, limit: 3 }),
        staleTime: anHour,
    });

    const moveToDetail = (stockId: number) => {
        router.push(`/posts/${stockId}`);
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]'>
            {postsWithUser.map(post => (
                <PostThumbnailCard key={post.id} onClick={() => moveToDetail(post.id)}>
                    <PostThumbnailCard.Body>
                        <PostThumbnailCard.Title title={post.title} />
                        <PostThumbnailCard.Content content={post.content} />
                    </PostThumbnailCard.Body>
                    <PostThumbnailCard.Footer>
                        <PostThumbnailCard.AuthorWithDate user={post.user} createdAt={new Date(post.createdAt)} />
                    </PostThumbnailCard.Footer>
                </PostThumbnailCard>
            ))}
        </div>
    );
}
