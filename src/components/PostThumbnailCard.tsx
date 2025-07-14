import { cn } from '@/util/style';
import { useEffect, useRef } from 'react';
import { PrimaryDropdown, PrimaryDropdownProps } from './Dropdown';
import DateFormatter from '@/util/Dateformatter';
import Icon from './Icon';
import ImageCarousel from './Carousel/ImageCarousel';
import { EmblaOptionsType } from 'embla-carousel';

export const PostTitle = ({ title }: { title: string }) => {
    return <h3 className='text-[2rem] font-bold leading-[140%] text-moneed-black line-clamp-1 mb-[.6rem]'>{title}</h3>;
};

export const PostContent = ({ content }: { content: string }) => {
    return <p className='font-normal text-lg leading-[140%] text-moneed-gray-9 line-clamp-3'>{content}</p>;
};

export const PostImages = ({ postImages, options }: { postImages: string[]; options: EmblaOptionsType }) => {
    if (postImages.length === 0) return null;

    return (
        <div>
            <ImageCarousel slides={postImages} options={options} />
        </div>
    );
};

export const PostActions = ({
    isLiked,
    likeCount,
    commentCount,
    toggleLike,
    handleCopyClipBoard,
}: {
    isLiked: boolean;
    likeCount: number;
    commentCount: number;
    toggleLike: () => void;
    handleCopyClipBoard: () => void;
}) => {
    return (
        <div className='flex pl-[1.6rem] pb-[1.6rem] pr-[1.2rem] pt-[.4rem]'>
            <div className='relative z-2'>
                <button type='button' onClick={toggleLike}>
                    <Icon iconUrl={isLiked ? '/redHeartIcon.svg' : '/heartIcon.svg'} width={18} height={18}></Icon>
                </button>
            </div>
            <span className='relative z-2 mr-4 text-[1.4rem] font-normal leading-[140%] text-moneed-gray-8'>
                {likeCount}
            </span>
            <div className=' relative z-2'>
                <Icon iconUrl='/commentIcon.svg' width={20} height={20} />
            </div>
            <span className='relative z-2 mr-4 text-[1.4rem] font-normal leading-[140%] text-moneed-gray-8'>
                {commentCount}
            </span>
            <div className=' relative z-2'>
                <Icon onClick={() => handleCopyClipBoard()} iconUrl='/sharingIcon.svg' width={20} height={20} />
            </div>
        </div>
    );
};

export const PostAuthorWithDate = ({
    user,
    createdAt,
}: {
    user: { profileImage: string; nickname: string };
    createdAt: Date;
}) => {
    return (
        <div className='flex items-center gap-[.6rem] flex-1'>
            <div className='rounded-full overflow-hidden aspect-square sm:w-[2.8rem] w-[2.4rem]'>
                <img src={user.profileImage} alt={user.nickname} className='w-full h-full object-cover' />
            </div>
            <span className='text-[1.4rem] font-normal leading-[140%] text-moneed-black'>{user.nickname}</span>
            <i className='w-[.2rem] h-[.2rem] rounded-full bg-moneed-gray-5'></i>
            <DateFormatter createdAt={new Date(createdAt)} />
        </div>
    );
};

export const PostDropdown = ({
    dropdownMenus,
    isDropdownOpen,
    setIsDropdownOpen,
}: {
    dropdownMenus: PrimaryDropdownProps['dropdownMenus'];
    isDropdownOpen: boolean;
    setIsDropdownOpen: (isDropdownOpen: boolean) => void;
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOpenDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsDropdownOpen(true);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsDropdownOpen]);

    return (
        <div className='relative ml-auto shrink-0 z-2'>
            <button
                className='cursor-pointer rounded-full overflow-hidden aspect-square w-[2.4rem]'
                onClick={handleOpenDropdown}
            >
                <img src='/icon/icon-more.svg' alt='' className='w-full h-full object-cover' />
            </button>
            {isDropdownOpen && (
                <div ref={dropdownRef}>
                    <PrimaryDropdown dropdownMenus={dropdownMenus} closeDropdown={closeDropdown} />
                </div>
            )}
        </div>
    );
};

export const PostHeader = ({ children }: { children: React.ReactNode }) => {
    return <div className='flex items-center justify-between mb-[1.6rem]'>{children}</div>;
};

export const PostBody = ({ children }: { children: React.ReactNode }) => {
    return <div className='mb-[1.2rem] sm:mb-[1.6rem]'>{children}</div>;
};

export const PostFooter = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export const PostThumbnailCard = ({
    children,
    onClick,
    isDropdownOpen = false,
}: {
    children: React.ReactNode;
    onClick: () => void;
    isDropdownOpen?: boolean;
}) => {
    return (
        <div
            className={cn(
                'flex flex-col justify-between relative border border-solid border-moneed-gray-5 rounded-[1.8rem] mb-[1.6rem] cursor-pointer py-[2.4rem] px-[3.2rem]',
                isDropdownOpen && 'pointer-events-none',
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

const Post = Object.assign(PostThumbnailCard, {
    Title: PostTitle,
    Content: PostContent,
    Images: PostImages,
    Actions: PostActions,
    AuthorWithDate: PostAuthorWithDate,
    Dropdown: PostDropdown,
    Header: PostHeader,
    Body: PostBody,
    Footer: PostFooter,
});

export default Post;
