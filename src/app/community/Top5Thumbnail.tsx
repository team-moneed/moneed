'use client';

import PostThumbnailCard from '@/components/PostThumbnailCard';
import { PostUser } from '@/types/post';
import { useRouter } from 'next/navigation';

type Top5ThumbnailProps = {
    user: PostUser;
    content: string;
    title: string;
    createdAt: string;
    stockId: number;
    postId: number;
};

const Top5Thumbnail = ({ user, content, title, createdAt, stockId, postId }: Top5ThumbnailProps) => {
    const router = useRouter();
    const movetoDetail = (stockId: number, postId: number) => {
        router.push(`/posts/${stockId}/${postId}`);
    };
    return (
        <PostThumbnailCard onClick={() => movetoDetail(stockId, postId)}>
            <PostThumbnailCard.Body>
                <PostThumbnailCard.Title title={title} />
                <PostThumbnailCard.Content content={content} />
            </PostThumbnailCard.Body>
            <PostThumbnailCard.Footer>
                <PostThumbnailCard.AuthorWithDate user={user} createdAt={new Date(createdAt)} />
            </PostThumbnailCard.Footer>
        </PostThumbnailCard>
    );
};

export default Top5Thumbnail;
