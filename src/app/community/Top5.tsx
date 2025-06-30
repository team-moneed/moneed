'use client';

import { getTopPosts } from '@/api/post.api';
import PostCarousel from '@/components/Carousel/PostCarousel';
import CommunityThumbnailCard from '@/components/Community/CommunityThumbnailCard';
import { PostSkeleton } from '@/components/Community/Post';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

export default function Top5WithSuspense() {
    return (
        <Suspense
            fallback={
                <PostCarousel>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className='shrink-0 w-[calc(85%-1.6rem)] lg:w-[calc(50%+.8rem)]'>
                            <PostSkeleton />
                        </div>
                    ))}
                </PostCarousel>
            }
        >
            <Top5 />
        </Suspense>
    );
}

function Top5() {
    const POSTOPTIONS = {
        slidesToScroll: 1,
        loop: false,
        // align: 'start',
        draggable: true,
        // containScroll: "keepSnaps",
    };

    const { data: topPosts } = useSuspenseQuery({
        queryKey: ['top-posts'],
        queryFn: () => getTopPosts({ limit: 5 }),
    });

    return (
        <PostCarousel options={POSTOPTIONS}>
            {topPosts.map(post => (
                <div key={post.id} className='shrink-0 w-[calc(85%-1.6rem)] lg:w-[calc(50%+.8rem)]'>
                    <CommunityThumbnailCard
                        userName={post.user.nickname}
                        content={post.content}
                        title={post.title}
                        createdAt={post.createdAt}
                    ></CommunityThumbnailCard>
                </div>
            ))}
        </PostCarousel>
    );
}
