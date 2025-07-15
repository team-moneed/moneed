'use client';

import { use, useEffect, useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import UploadImage from '@/components/UploadImage';
import useSnackbarStore from '@/store/useSnackbarStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPost, updatePost } from '@/api/post.api';
import { REASON_CODES } from '@/constants/snackbar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EditPostSkeleton from '@/components/Skeletons/EditPostSkeleton';

type FieldData = {
    title: string;
    content: string;
};

const EditPostContent = ({ postId }: { postId: string }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FieldData>({
        defaultValues: {
            title: '',
            content: '',
        },
    });

    // Changed to useSuspenseQuery
    const { data: post } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: () => getPost({ postId: Number(postId) }),
    });

    const showSnackbar = useSnackbarStore(state => state.showSnackbar);

    const content = watch('content', '');
    const initialContent = post?.content || '';

    const title = watch('title', '');
    const initialTitle = post?.title || '';

    const [postImages] = useState<string[]>([]);
    const [, setFormImg] = useState<FormData | string[]>([]);

    useEffect(() => {
        if (title.trim().length >= 50) {
            showSnackbar({
                message: '제목은 공백 포함 50자 제한입니다.',
                variant: 'normal',
                position: 'bottom',
                icon: '/icon/icon-snackbar.svg',
            });
        }

        if (content.trim().length >= 1000) {
            showSnackbar({
                message: '본문은 최대 1000자 입니다.',
                variant: 'normal',
                position: 'bottom',
                icon: '/icon/icon-snackbar.svg',
            });
        }

        // store에서 가져온 함수(showSnackBar)는 리렌더링시 참조가 변경되지 않기 때문에 종속성 배열에 추가해도 useEffect가 매번 실행되지 않음
    }, [content, title, initialContent, initialTitle, showSnackbar]);

    useEffect(() => {
        if (post) {
            setValue('title', post.title);
            setValue('content', post.content);
        }
    }, [post, setValue]);

    const handleFileUpload = (formData: FormData) => {
        setFormImg(formData);
    };

    const onSubmit = async (data: FieldData) => {
        const formData = { ...data, stockId: post?.stock.id };

        if (errors.title) {
            showSnackbar({
                message: '제목을 입력해주세요.',
                variant: 'normal',
                position: 'bottom',
                icon: '/icon/icon-snackbar.svg',
            });
            return;
        }

        if (errors.content) {
            showSnackbar({
                message: '내용을 입력해주세요.',
                variant: 'normal',
                position: 'bottom',
                icon: '/icon/icon-snackbar.svg',
            });
            return;
        }

        const res = await updatePost({ postId: Number(postId), ...formData });

        if (res.status === 200) {
            router.push(`/posts/${postId}?reason=${REASON_CODES.POST_UPDATED}`);
        }
    };

    return (
        <div className='px-8 max-w-512 mx-auto'>
            <div className='flex py-[.8rem] leading-[140%] items-center gap-[.4rem]'>
                <Image src={post.user.profileImage} alt='profile' width={24} height={24} className='rounded-full' />
                <span className='text-[1.4rem] font-semibold text-moneed-black'>{post.user.nickname}</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('title', { required: '제목을 입력해주세요.' })}
                    type='text'
                    placeholder='제목을 입력해주세요'
                    className='border-b border-moneed-gray-5 w-full py-[1.6rem] text-[1.6rem] font-normal leading-[140%] focus:outline-none placeholder:text-moneed-gray-7'
                    maxLength={50}
                />
                <textarea
                    {...register('content', { required: '의견을 입력해주세요.' })}
                    placeholder='의견을 입력해주세요'
                    className='w-full h-120 py-[1.6rem] text-[1.6rem] font-normal leading-[140%] placeholder:text-moneed-gray-7 focus:outline-none'
                    maxLength={1000}
                />
                <div
                    className={`fixed left-0 right-0 z-20 h-[5.2rem] px-8 bg-white flex items-center justify-between transition-all duration-300 bottom-0`}
                >
                    <UploadImage
                        id='blog'
                        onUploadFiles={handleFileUpload}
                        multiple={true}
                        uploadfileLength={4}
                        imgpreviewWidth={60}
                        imgpreviewHeight={60}
                        imgClassName='object-cover w-full h-full'
                        buttonpositionClassName='mr-0'
                        imgUrl={postImages}
                        // buttonProps={{ type: "button" }}
                    />
                    <div className='text-right text-[1.4rem] text-moneed-gray-7 w-full mx-4'>
                        {content.length} / 1000자
                    </div>
                    <button
                        className='rounded-full overflow-hidden aspect-square w-[3.6rem] bg-moneed-gray-6 cursor-pointer hover:bg-moneed-brand-color'
                        type='submit'
                    >
                        <img
                            src='/icon/icon-submit-post.svg'
                            alt='submit'
                            className='w-full h-full object-cover p-[.6rem]'
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};

const EditPost = ({ params }: { params: Promise<{ postId: string }> }) => {
    const { postId } = use(params);

    return (
        <Suspense fallback={<EditPostSkeleton />}>
            <EditPostContent postId={postId} />
        </Suspense>
    );
};

export default EditPost;
