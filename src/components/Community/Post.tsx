'use client';

import { EmblaOptionsType } from 'embla-carousel';
import { useRouter } from 'next/navigation';
import { PostThumbnail } from '@/types/post';
import PostThumbnailCard from '../PostThumbnailCard';

const Post = ({ post }: { post: PostThumbnail }) => {
    const { user, content, isLiked, id, stocktype, thumbnailImage, likeCount, createdAt, title, commentCount } = post;
    const postImages = thumbnailImage ? [thumbnailImage] : [];

    const OPTIONS: EmblaOptionsType = {
        slidesToScroll: 1,
        loop: true,
        align: 'center',
        // draggable: true,
        containScroll: 'trimSnaps',
    };

    const router = useRouter();
    const movetoDetail = (stocktype: string, postId: number) => {
        router.push(
            `/posts/${stocktype}/${postId}?userName=${user.nickname}&content=${content}&isLiked=${isLiked}&postId=${id}&stocktype=${stocktype}&postImages=${postImages}&createdAt=${createdAt}&title=${title}&likes=${likeCount}`,
        );
    };

    const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log('좋아요!');
    };

    const handleCopyClipBoard = () => {};

    return (
        <>
            <PostThumbnailCard onClick={() => movetoDetail(stocktype, id)}>
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

export const PostSkeleton = () => {
    return (
        <div className='relative border border-solid border-moneed-gray-5 rounded-[1.8rem] mb-[1.6rem] animate-pulse h-[20rem] bg-moneed-gray-5'></div>
    );
};

export default Post;
