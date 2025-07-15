'use client';

import { EmblaOptionsType } from 'embla-carousel';
import { useRouter } from 'next/navigation';
import { PostThumbnail as TPostThumbnail } from '@/types/post';
import PostThumbnailCard from '@/components/PostThumbnailCard';

const PostThumbnail = ({ post }: { post: TPostThumbnail }) => {
    const { user, content, isLiked, id, thumbnailImage, likeCount, createdAt, title, commentCount } = post;
    const postImages = thumbnailImage ? [thumbnailImage] : [];

    const OPTIONS: EmblaOptionsType = {
        slidesToScroll: 1,
        loop: true,
        align: 'center',
        // draggable: true,
        containScroll: 'trimSnaps',
    };

    const router = useRouter();
    const movetoDetail = (postId: number) => {
        router.push(`/posts/${postId}`);
    };

    return (
        <>
            <PostThumbnailCard onClick={() => movetoDetail(id)}>
                <PostThumbnailCard.Header>
                    <PostThumbnailCard.AuthorWithDate user={user} createdAt={new Date(createdAt)} />
                    <PostThumbnailCard.Dropdown post={post} />
                </PostThumbnailCard.Header>
                <PostThumbnailCard.Body>
                    <PostThumbnailCard.Title title={title} />
                    <PostThumbnailCard.Content content={content} />
                    <PostThumbnailCard.Images postImages={postImages} options={OPTIONS} />
                </PostThumbnailCard.Body>
                <PostThumbnailCard.Footer>
                    <PostThumbnailCard.Actions isLiked={isLiked} likeCount={likeCount} commentCount={commentCount} />
                </PostThumbnailCard.Footer>
            </PostThumbnailCard>
        </>
    );
};

export default PostThumbnail;
