'use client';

import VideoCarousel from '@/components/Carousel/VideoCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { useShorts } from '@/queries/shorts.query';

const MainShortforms = () => {
    const VIDEOOPTIONS: EmblaOptionsType = {
        slidesToScroll: 1,
        loop: true,
        align: 'start',
        // draggable: true,
        containScroll: 'trimSnaps',
    };

    const { data } = useShorts({ q: '주식 쇼츠', count: 10 });
    const videos = data?.items;

    return (
        <>
            <div className='mt-4'>{videos && <VideoCarousel videos={videos} options={VIDEOOPTIONS} />}</div>
        </>
    );
};

export default MainShortforms;
