'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useModal } from '@/context/ModalContext';
import DateFormatter from '@/components/Dateformatter';
import { PrimaryDropdown, PrimaryDropdownProps } from '@/components/Dropdown';
import Comment from '@/components/Comment/Comment';
import { SnackbarTrigger } from '@/components/Snackbar';
import { deletePost, getPost } from '@/api/post.api';
import { useSuspenseQuery } from '@tanstack/react-query';
import PostDetailSkeleton from '@/components/Skeletons/PostDetailSkeleton';
import { REASON_CODES } from '@/constants/snackbar';
import Image from 'next/image';
import PostLikeButton from '@/components/Post/PostLikeButton';
import PostCommentButton from '@/components/Post/PostCommentButton';
import PostClipBoardButton from '@/components/Post/PostClipBoardButton';
import CommentForm from '@/components/Comment/CommentForm';

function PostDetail() {
    const searchParams = useSearchParams();
    const { postId } = useParams<{ postId: string }>();
    const reason = searchParams.get('reason') ?? undefined;
    const { data: post } = useSuspenseQuery({
        queryKey: ['post', Number(postId)],
        queryFn: () => getPost({ postId: Number(postId) }),
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editContent, setEditContent] = useState('');

    const { user, stock, comments, title, content, createdAt, isLiked, likeCount } = post;

    const { confirm } = useModal();

    const router = useRouter();

    const handleOpendropdown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsDropdownOpen(true);
    };

    //게시글 삭제할건지 묻는 모달
    const openPostDeletemodal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const result = confirm(
            <span>
                삭제된 내용은 복구되지 않아요.
                <br />
                정말 삭제하실건가요?
            </span>,
        );
        result.then(confirmed => {
            if (confirmed) {
                handleDeletePost(e);
            }
        });
        setIsDropdownOpen(prev => !prev);
    };

    //게시글 삭제 api 연동
    const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await deletePost({ postId: Number(postId) });
        router.push(`/community/${stock.id}?reason=${REASON_CODES.POST_DELETED}`);
        e.stopPropagation();
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const onEditPost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push(`/editpost/${postId}`);
    };

    const handleEditComment = (content: string) => {
        setIsEdit(true);
        setEditContent(content);
    };

    const onEditComment = (content: string) => {
        handleEditComment(content);
    };

    const dropdownMenus: PrimaryDropdownProps['dropdownMenus'] = [
        {
            icon: '/icon/icon-scissors.svg',
            text: '게시글 수정',
            onClick: onEditPost,
        },
        {
            icon: '/icon/icon-trashcan.svg',
            text: '게시글 삭제',
            onClick: openPostDeletemodal,
        },
    ];

    return (
        <>
            <div className='px-8 max-w-512 mx-auto'>
                <div className='hidden lg:block font-semibold leading-[140%] text-[1.6rem] ml-[.4rem] text-moneed-gray-9 mb-4'>
                    {stock.name} 커뮤니티
                </div>
                <div className='lg:flex gap-12'>
                    <div className='lg:w-[60%] lg:border lg:border-moneed-gray-4 rounded-[1.2rem] lg:p-8'>
                        <div className='pb-[1.3rem] pt-[1.4rem]'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-[.6rem] lg:gap-[.8rem]'>
                                    <Image
                                        src={user.profileImage}
                                        alt='profile'
                                        className='rounded-full size-[2.4rem] lg:size-[3.2rem]'
                                        width={32}
                                        height={32}
                                    />
                                    <div className='flex items-center gap-[.4rem]'>
                                        <span className='text-[1.4rem] font-normal leading-[140%] text-moneed-black'>
                                            {user.nickname}
                                        </span>
                                        <i className='size-[.4rem] rounded-full bg-moneed-gray-5'></i>
                                        <DateFormatter createdAt={new Date(createdAt)} />
                                    </div>
                                </div>
                                <div className='relative ml-auto shrink-0 z-2'>
                                    <div
                                        className='cursor-pointer rounded-full overflow-hidden aspect-square w-[2.4rem]'
                                        onClick={handleOpendropdown}
                                    >
                                        <Image
                                            src='/icon/icon-more.svg'
                                            alt=''
                                            className='w-full h-full object-cover'
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    {isDropdownOpen && (
                                        <PrimaryDropdown dropdownMenus={dropdownMenus} closeDropdown={closeDropdown} />
                                    )}
                                </div>
                            </div>
                            <p className='mt-[2.4rem] text-[1.6rem] font-semibold leading-[140%] text-moneed-black'>
                                {title}
                            </p>
                            <p className='mt-[2.4rem] mb-[.8rem] text-[1.6rem] font-normal leading-[145%] text-moneed-gray-9'>
                                {content}
                            </p>
                        </div>
                        <div className='flex pb-[1.6rem] pt-[.4rem]'>
                            <PostLikeButton isLiked={isLiked} likeCount={likeCount} />
                            <PostCommentButton commentCount={comments.length} />
                            <PostClipBoardButton />
                        </div>
                    </div>
                    <div className='lg:w-[40%] lg:ml-auto flex flex-col'>
                        <div className='order-1 lg:order-2 flex gap-4 py-[1.8rem]'>
                            <div className='text-[1.8rem] font-semibold leading-[140%] text-moneed-black'>댓글</div>
                            <div className='text-[1.8rem] font-semibold leading-[140%] text-moneed-black'>8</div>
                        </div>
                        <div className='order-2 lg:order-3 flex flex-col gap-[3.6rem]'>
                            {comments.length == 0 ? (
                                <div>
                                    <div className='flex justify-center items-center mt-8'>
                                        <img src='/cta-2.svg' alt='' className='w-116' />
                                    </div>
                                </div>
                            ) : (
                                comments.map(comment => (
                                    <Comment
                                        key={comment.id}
                                        comment={comment}
                                        onEditComment={() => onEditComment(comment.content)}
                                    ></Comment>
                                ))
                            )}
                        </div>
                        {/* 모바일 UI 수정: 댓글 입력창이 가장 아래에 붙도록*/}
                        <div className='order-3 lg:order-1 mt-16 lg:mt-4 relative flex items-center bg-moneed-gray-4 rounded-[1.2rem]'>
                            <CommentForm
                                isEdit={isEdit}
                                setIsEdit={setIsEdit}
                                editContent={editContent}
                                setEditContent={setEditContent}
                                postId={Number(postId)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SnackbarTrigger reason={reason} />
        </>
    );
}

function PostDetailWithSuspense() {
    return (
        <Suspense fallback={<PostDetailSkeleton />}>
            <PostDetail />
        </Suspense>
    );
}

export default PostDetailWithSuspense;
