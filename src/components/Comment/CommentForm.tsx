import { useRef, useState } from 'react';
import useSnackbarStore from '@/store/useSnackbarStore';
import { createComment, updateComment } from '@/api/comment.api';
import { queryClient } from '@/components/QueryClientProvider';
import { useMutation } from '@tanstack/react-query';

type CommentFormProps = {
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    editContent: string;
    setEditContent: (editContent: string) => void;
    postId: number;
    editCommentId: number | null;
};

export default function CommentForm({
    isEdit,
    setIsEdit,
    editContent,
    setEditContent,
    postId,
    editCommentId,
}: CommentFormProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [newComment, setNewComment] = useState('');
    const { mutate: createCommentMutation } = useMutation({
        mutationFn: createComment,
        onSuccess: data => {
            showSnackbar({
                message: data.message,
                variant: 'action',
                position: 'bottom',
                icon: '',
            });
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
            setNewComment('');
        },
    });

    const { mutate: updateCommentMutation } = useMutation({
        mutationFn: updateComment,
        onSuccess: data => {
            showSnackbar({
                message: data.message,
                variant: 'action',
                position: 'bottom',
                icon: '',
            });
            queryClient.invalidateQueries({ queryKey: ['post', Number(postId)] });
            setEditContent('');
            setIsEdit(false);
        },
    });

    const showSnackbar = useSnackbarStore(state => state.showSnackbar);

    //댓글 추가/수정 창
    const handleWriteComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isEdit) {
            setEditContent(e.target.value);
        } else {
            setNewComment(e.target.value);
        }

        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo({
                top: scrollTop + rect.top - window.innerHeight / 3,
                behavior: 'smooth',
            });
        }
    };

    //댓글 수정/삭제 후  제출
    const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentContent = isEdit ? editContent : newComment;
        if (currentContent.trim() === '') {
            showSnackbar({
                message: '댓글을 입력해주세요.',
                variant: 'caution',
                position: 'top',
            });
            return;
        }
        if (isEdit && editCommentId) {
            updateCommentMutation({ commentId: editCommentId, content: currentContent });
        } else {
            createCommentMutation({ postId, content: currentContent });
        }
    };
    return (
        <form onSubmit={handleSubmitComment} className='flex items-center w-full'>
            <input
                ref={inputRef}
                type='text'
                onChange={handleWriteComment}
                className='bg-transparent text-[1.6rem] text-moneed-black placeholder:text-moneed-gray-7 px-[1.8rem] py-[1.2rem] w-full focus:outline-none'
                placeholder='의견을 공유해보세요.(최대 300자)'
                value={isEdit ? editContent : newComment}
            />
            <button
                className='absolute right-4 rounded-full aspect-square w-[3.6rem] bg-moneed-gray-6 cursor-pointer hover:bg-moneed-brand'
                type='submit'
            >
                <img src='/icon/icon-submit-comment.svg' alt='' className='p-[.6rem]' />
            </button>
        </form>
    );
}
