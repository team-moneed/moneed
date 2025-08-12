'use client';

import { useState, useEffect } from 'react';
import { useSuspenseInfiniteShorts } from '@/queries/shorts.query';
import ShortformDetail from './ShortformDetail';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ShortformPageSkeleton } from '@/components/Skeletons/shortform/ShortformSkeleton';
import withSuspense from '@/components/HOC/withSuspense';

function ShortformPage() {
    const {
        data: videos,
        fetchNextPage,
        isFetchingNextPage,
    } = useSuspenseInfiniteShorts({ q: '주식 쇼츠', count: 20 });
    const [videoId, setVideoId] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const video = videos?.find(video => video.id.videoId === videoId);
    const ref = useIntersectionObserver({ onIntersect: fetchNextPage });

    useEffect(() => {
        setIsClient(true);
    }, []);

    // 클라이언트에서만 렌더링하여 hydration mismatch 방지
    if (!isClient) {
        return <ShortformPageSkeleton count={20} />;
    }

    return (
        <div className='px-[1.8rem] lg:px-0 max-w-512 mx-auto'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-y-[1.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.6rem] mb-[.6rem]'>
                {videos.map((video, index) => (
                    <div
                        key={`${video.id.videoId}-${index}`}
                        className='overflow-hidden rounded-lg cursor-pointer'
                        onClick={() => setVideoId(video.id.videoId)}
                    >
                        <div className='aspect-[9/16] min-h-[200px]'>
                            <iframe
                                className='w-full h-full pointer-events-none'
                                src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=0&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${video.id.videoId}`}
                                title={video.snippet.title}
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                            />
                        </div>
                    </div>
                ))}
            </div>
            {video && <ShortformDetail video={video} setVideoId={setVideoId} />}
            {isFetchingNextPage && <ShortformPageSkeleton count={20} />}
            <div ref={ref} />
        </div>
    );
}

export default withSuspense(ShortformPage, <ShortformPageSkeleton count={20} />);
