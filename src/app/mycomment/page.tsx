'use client';

import { useState } from 'react';
import Comment from '@/components/Comment/Comment';
import { useMyComments } from '@/queries/comments.query';
import { cn } from '@/util/style';

// TODO: 삭제된 댓글 -> "삭제된 댓글입니다" 표시
const MyComment = () => {
    const [activeTab, setActiveTab] = useState<'thisWeek' | 'notThisWeek'>('thisWeek');

    const { data: comments } = useMyComments();

    const thisweekComments = comments.filter(comment => {
        const now = new Date();
        const commentDate = new Date(comment.createdAt);
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        return commentDate >= startOfWeek;
    });

    const currentTabComments = activeTab === 'thisWeek' ? thisweekComments : comments;

    return (
        <>
            <div className='px-8 max-w-512 mx-auto'>
                <div className='flex my-[1.8rem]'>
                    <div className='text-[1.8rem] font-semibold leading-[140%]'>댓글</div>
                    <div className='ml-[.4rem] text-[1.8rem] font-semibold leading-[140%]'>
                        {currentTabComments.length}
                    </div>
                </div>
                <div className='border-b-2 border-solid border-moneed-gray-5'>
                    <button
                        onClick={() => setActiveTab('thisWeek')}
                        className={cn(
                            'pr-[1.2rem] text-[1.6rem] font-semibold leading-[140%]',
                            activeTab === 'thisWeek'
                                ? 'text-moneed-black border-b-4 border-solid border-moneed-black'
                                : 'text-moneed-gray-7',
                        )}
                    >
                        이번주 게시글
                    </button>
                    <button
                        onClick={() => setActiveTab('notThisWeek')}
                        className={cn(
                            'pr-[1.2rem] text-[1.6rem] font-semibold leading-[140%]',
                            activeTab === 'notThisWeek'
                                ? 'text-moneed-black border-b-4 border-solid border-moneed-black'
                                : 'text-moneed-gray-7',
                        )}
                    >
                        이전 게시글
                    </button>
                </div>
                <div className='pt-[1.8rem]'>
                    {currentTabComments.map(comment => (
                        <div key={comment.id} className='pt-[1.8rem]'>
                            <Comment
                                comment={comment}
                                setEditContent={() => {}}
                                setIsEdit={() => {}}
                                setEditCommentId={() => {}}
                            />
                        </div>
                    ))}
                    {currentTabComments.length === 0 && (
                        <div className='text-[1.6rem] font-normal leading-[140%] text-moneed-gray-7'>
                            최근에 작성한 댓글이 없어요
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyComment;
