'use client';

import { useState } from 'react';
import Comment from '@/components/Comment/Comment';
import { useSuspenseUser, useUserComments } from '@/queries/user.query';

const MyComment = () => {
    const [activeTab, setActiveTab] = useState<'thisWeek' | 'notThisWeek'>('thisWeek');

    const { data: comments } = useUserComments();
    const { data: user } = useSuspenseUser();

    const thisweekComments = comments.filter(comment => {
        const now = new Date();
        const commentDate = new Date(comment.createdAt);
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        return commentDate >= startOfWeek;
    });

    return (
        <>
            <div className='px-8 max-w-512 mx-auto'>
                <div className='flex my-[1.8rem]'>
                    <div className='text-[1.8rem] font-semibold leading-[140%]'>댓글</div>
                    <div className='ml-[.4rem] text-[1.8rem] font-semibold leading-[140%]'>
                        {activeTab === 'thisWeek' ? thisweekComments.length : comments.length}
                    </div>
                </div>
                <div className='border-b-2 border-solid border-moneed-gray-5'>
                    <button
                        onClick={() => setActiveTab('thisWeek')}
                        className={`${
                            activeTab === 'thisWeek'
                                ? 'text-moneed-black border-b-4 border-solid border-moneed-black'
                                : 'text-moneed-gray-7'
                        } pr-[1.2rem] text-[1.6rem] font-semibold leading-[140%]`}
                    >
                        이번주 게시글
                    </button>
                    <button
                        onClick={() => setActiveTab('notThisWeek')}
                        className={`${
                            activeTab === 'notThisWeek'
                                ? 'text-moneed-black border-b-4 border-solid border-moneed-black'
                                : 'text-moneed-gray-7'
                        } pr-[1.2rem] text-[1.6rem] font-semibold leading-[140%]`}
                    >
                        이전 게시글
                    </button>
                </div>
                {activeTab === 'thisWeek' ? (
                    <div className='pt-[1.8rem]'>
                        {thisweekComments.map(comment => {
                            const myComment = {
                                ...comment,
                                user,
                            };
                            return (
                                <div key={comment.id} className='pt-[1.8rem]'>
                                    <Comment
                                        comment={myComment}
                                        setEditContent={() => {}}
                                        setIsEdit={() => {}}
                                        setEditCommentId={() => {}}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className='pt-[1.8rem]'>
                        {comments.map(comment => {
                            const myComment = {
                                ...comment,
                                user,
                            };
                            return (
                                <div key={comment.id} className='pt-[1.8rem]'>
                                    <Comment
                                        comment={myComment}
                                        setEditContent={() => {}}
                                        setIsEdit={() => {}}
                                        setEditCommentId={() => {}}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyComment;
