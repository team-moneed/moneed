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

    const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log('좋아요!');
    };

    const handleCopyClipBoard = () => {};

    return (
        <>
            <PostThumbnailCard onClick={() => movetoDetail(id)}>
                <PostThumbnailCard.Header>
                    <PostThumbnailCard.AuthorWithDate user={user} createdAt={new Date(createdAt)} />
                    {/* TODO: 드롭다운 토글시 닫혔다 열림 현상 고치기*/}
                    <PostThumbnailCard.Dropdown post={post} />
                </PostThumbnailCard.Header>
                <PostThumbnailCard.Body>
                    <PostThumbnailCard.Title title={title} />
                    <PostThumbnailCard.Content content={content} />
                    <PostThumbnailCard.Images postImages={postImages} options={OPTIONS} />
                </PostThumbnailCard.Body>
                <PostThumbnailCard.Footer>
                    <PostThumbnailCard.Actions
                        isLiked={isLiked}
                        likeCount={likeCount}
                        commentCount={commentCount}
                        toggleLike={toggleLike}
                        handleCopyClipBoard={handleCopyClipBoard}
                    />
                </PostThumbnailCard.Footer>
            </PostThumbnailCard>
        </>
    );
};

export default PostThumbnail;
