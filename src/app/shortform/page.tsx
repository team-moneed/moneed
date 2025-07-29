'use client';

import { useState } from 'react';
import { useInfiniteShorts } from '@/queries/shorts.query';
import ShortformDetail from './ShortformDetail';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function ShortformPage() {
    const { data: videos, isLoading, fetchNextPage } = useInfiniteShorts({ q: '주식 쇼츠', count: 20 });
    const [videoId, setVideoId] = useState<string | null>(null);
    const video = videos?.find(video => video.id.videoId === videoId);
    const ref = useIntersectionObserver({ onIntersect: fetchNextPage });

    return (
        <div className='sm:px-6 px-8 max-w-512 mx-auto'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-y-[1.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.6rem] mb-[.6rem]'>
                {!isLoading &&
                    videos?.map(video => (
                        <div
                            key={video.id.videoId}
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
            <div ref={ref} />
        </div>
    );
}
