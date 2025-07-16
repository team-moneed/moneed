import PostThumbnailCard from '@/components/PostThumbnailCard';
import { HotPostThumbnail as THotPostThumbnail } from '@/types/post';
import { EmblaOptionsType } from 'embla-carousel';
import { useRouter } from 'next/navigation';

export default function HotPostThumbnail({ post }: { post: THotPostThumbnail }) {
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
    const movetoDetail = ({ postId }: { postId: number }) => {
        router.push(`/posts/${postId}`);
    };

    return (
        <>
            <PostThumbnailCard onClick={() => movetoDetail({ postId: id })}>
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
}
