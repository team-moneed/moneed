import Icon from '../Icon';

export default function PostLikeButton({ isLiked, likeCount }: { isLiked: boolean; likeCount: number }) {
    // TODO: 좋아요 API 연동
    const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log('좋아요!');
    };

    return (
        <button className='flex items-center gap-[.4rem]' type='button' onClick={toggleLike}>
            <Icon iconUrl={isLiked ? '/redHeartIcon.svg' : '/heartIcon.svg'} width={18} height={18}></Icon>
            <span className='mr-4 text-[1.4rem] font-normal leading-[140%] text-moneed-gray-8'>{likeCount}</span>
        </button>
    );
}
