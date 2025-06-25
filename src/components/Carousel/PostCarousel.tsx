'use client';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton } from '@/components/Carousel/CarouselArrowButton';
import { usePrevNextButtons } from '@/hooks/usePrevNextButtons';
import CommunityThumbnailCard from '@/components/Community/CommunityThumbnailCard';
import { Suspense } from 'react';
import { PostSkeleton } from '@/components/Community/Post';
import { PostUser } from '@/types/post';
import { cn } from '@/util/style';

type PropType = {
    posts: {
        id: number;
        content: string;
        title: string;
        createdAt: string;
        stocktype?: string;
        user: PostUser;
    }[];
    options?: EmblaOptionsType;
};

const PostCarousel: React.FC<PropType> = ({ posts, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const { nextBtnDisabled, onNextButtonClick, prevBtnDisabled, onPrevButtonClick } = usePrevNextButtons(emblaApi);

    return (
        <div className='relative lg:pr-[5.6rem]'>
            <div className='w-full overflow-hidden mask-right' ref={emblaRef}>
                <div className='flex gap-[1.6rem]'>
                    {posts.map(post => (
                        <div key={post.id} className='shrink-0 w-[calc(85%-1.6rem)] lg:w-[calc(50%+.8rem)]'>
                            <CommunityThumbnailCard
                                userName={post.user.nickname}
                                content={post.content}
                                title={post.title}
                                createdAt={post.createdAt}
                            ></CommunityThumbnailCard>
                        </div>
                    ))}
                </div>
            </div>
            <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className={cn(
                    'hidden lg:absolute lg:block top-1/2 left-2 transform -translate-y-1/2 z-10 p-[1.2rem] rounded-4xl bg-moneed-gray-5',
                    prevBtnDisabled && 'lg:hidden',
                )}
            />
            <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className={cn(
                    'hidden lg:absolute lg:block top-1/2 right-2 transform -translate-y-1/2 z-10 p-[1.2rem] rounded-4xl bg-moneed-gray-5',
                    nextBtnDisabled && 'lg:hidden',
                )}
            />
        </div>
    );
};

export const PostCarouselWithSuspense = ({ posts: slides, options }: PropType) => {
    return (
        <Suspense
            fallback={Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className='w-[calc(85%-1.6rem)] lg:w-[calc(50%+.8rem)]'>
                    <PostSkeleton />
                </div>
            ))}
        >
            <PostCarousel posts={slides} options={options} />
        </Suspense>
    );
};

export default PostCarousel;
