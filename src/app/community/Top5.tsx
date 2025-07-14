'use client';

import { getTopPosts } from '@/api/post.api';
import PostCarousel from '@/components/Carousel/PostCarousel';
import Top5Thumbnail from './Top5Thumbnail';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function Top5() {
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
                    <Top5Thumbnail
                        user={post.user}
                        content={post.content}
                        title={post.title}
                        createdAt={post.createdAt}
                        postId={post.id}
                    />
                </div>
            ))}
        </PostCarousel>
    );
}
