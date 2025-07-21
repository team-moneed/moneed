'use client';

import PostThumbnailCard from '@/components/PostThumbnailCard';
import { PostUser } from '@/types/post';
import { useRouter } from 'next/navigation';

type Top5ThumbnailProps = {
    user: PostUser;
    content: string;
    title: string;
    createdAt: string;
    postId: number;
};

const Top5Thumbnail = ({ user, content, title, createdAt, postId }: Top5ThumbnailProps) => {
    const router = useRouter();
    const movetoDetail = (postId: number) => {
        router.push(`/posts/${postId}`);
    };
    return (
        <PostThumbnailCard onClick={() => movetoDetail(postId)}>
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
