'use client';

import { useState } from 'react';
import { PrimaryDropdown, PrimaryDropdownProps } from '@/components/Dropdown';
import { useModal } from '@/context/ModalContext';
import useSnackbarStore from '@/store/useSnackbarStore';
import Image from 'next/image';
import { Comment as TComment } from '@/types/post';
import DateFormatter from '../Dateformatter';
import { useMutation } from '@tanstack/react-query';
import { deleteComment } from '@/api/comment.api';
import { queryClient } from '../QueryClientProvider';

type CommentType = {
    comment: TComment;
    setEditContent: (content: string) => void;
    setIsEdit: (isEdit: boolean) => void;
    setEditCommentId: (commentId: number) => void;
};

const Comment = ({ comment, setEditContent, setIsEdit, setEditCommentId }: CommentType) => {
    const { content, createdAt, user } = comment;
    const [isDropdownOpen, setIsdropdownOpen] = useState(false);
    const isEdited = comment.updatedAt !== comment.createdAt;

    const showSnackbar = useSnackbarStore(state => state.showSnackbar);
    const { confirm } = useModal();
    const { mutate: deleteCommentMutation } = useMutation({
        mutationFn: deleteComment,
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['post', Number(comment.postId)] });
            showSnackbar({
                message: data.message,
                variant: 'action',
                position: 'bottom',
                icon: '',
            });
        },
    });

    const handleEditComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsEdit(true);
        setEditContent(comment.content);
        setEditCommentId(comment.id);
        setIsdropdownOpen(prev => !prev);
    };

    //댓글 수정/삭제 드롭다운
    const handleOpenDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsdropdownOpen(prev => !prev);
    };

    //댓글 삭제할건지 묻는 모달
    const openCommentDeletemodal = (e: React.MouseEvent<HTMLButtonElement>) => {
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
                handleDeleteComment(e);
            }
        });
        setIsdropdownOpen(prev => !prev);
    };

    //댓글 삭제 api 연동
    const handleDeleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        deleteCommentMutation({ commentId: comment.id });
    };

    const closeDropdown = () => {
        setIsdropdownOpen(false);
    };

    const dropdownMenus: PrimaryDropdownProps['dropdownMenus'] = [
        {
            icon: '/icon/icon-scissors.svg',
            text: '댓글 수정',
            onClick: handleEditComment,
        },
        {
            icon: '/icon/icon-trashcan.svg',
            text: '댓글 삭제',
            onClick: openCommentDeletemodal,
        },
    ];

    return (
        <>
            <div className='relative flex items-start gap-[.6rem] w-full'>
                <i className='absolute block w-[.1rem] top-0 bottom-0 left-[1.2rem] lg:left-[1.6rem] bg-moneed-gray-5'></i>
                <Image
                    src={user.profileImage}
                    alt='profile'
                    className='relative rounded-full size-[2.4rem] lg:size-[3.2rem] shrink-0'
                    width={32}
                    height={32}
                />
                <div className='flex-1'>
                    <span className='text-[1.4rem] font-bold leading-[140%] text-moneed-black'>{user.nickname}</span>
                    <i className='w-[.2rem] h-[.2rem] mx-[.8rem] mb-[.2rem] rounded-full bg-moneed-gray-5 inline-block '></i>
                    <span className='text-[1.4rem] font-normal leading-[142%] text-moneed-gray-7'>
                        <DateFormatter createdAt={new Date(createdAt)} />
                        {isEdited && <span className='text-moneed-gray-7'> (수정됨)</span>}
                    </span>
                    <div className='text-[1.4rem] font-normal leading-[140%]'>{content}</div>
                </div>
                <div className='relative'>
                    <div
                        className='relative cursor-pointer rounded-full overflow-hidden aspect-square w-[2.4rem] shrink-0 ml-auto'
                        onClick={handleOpenDropdown}
                    >
                        <img src='/icon/icon-more.svg' alt='more' className='w-full h-full object-cover' />
                    </div>
                    {isDropdownOpen && <PrimaryDropdown dropdownMenus={dropdownMenus} closeDropdown={closeDropdown} />}
                </div>
            </div>
        </>
    );
};

export default Comment;
