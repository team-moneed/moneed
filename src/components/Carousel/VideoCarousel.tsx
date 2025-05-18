'use client';

import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton } from '@/components/Carousel/CarouselArrowButton';
import { usePrevNextButtons } from '@/hook/usePrevNextButtons';
import { useRouter } from 'next/navigation';

type PropType = {
    slides: { imgUrl?: string; videoUrl?: string; title: string; userName: string; createdAt: string }[];
    options?: EmblaOptionsType;
    slidesToShow?: number;
};
const VideoCarousel = (props: PropType) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel({
        ...options,
        loop: false,
        // wrapAround: true,
        // slidesToShow,
    });
    const { nextBtnDisabled, onNextButtonClick } = usePrevNextButtons(emblaApi);

    const router = useRouter();

    const movetoshortformDetail = () => {
        router.push('/shortformdetail');
    };

    return (
        <div className='relative lg:pr-[5.6rem]'>
            <div className='w-full overflow-hidden mask-right' ref={emblaRef}>
                <div className='flex gap-[.8rem]'>
                    {slides.map((slide, index) => (
                        <div
                            className='w-[calc(30%_-_1.6rem)] lg:w-[calc(20%_-_1.6rem)] shrink-0'
                            key={index}
                            style={{ aspectRatio: '9/16' }}
                            onClick={movetoshortformDetail}
                        >
                            <video controls className='w-full h-full object-cover rounded-[.8rem]'>
                                <source src={slide.videoUrl} type='video/mp4' />
                            </video>
                        </div>
                    ))}
                </div>
            </div>
            <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className='hidden lg:absolute lg:block top-1/2 right-2 transform -translate-y-1/2 z-10 p-[1.2rem] rounded-[2rem] bg-[var(--moneed-gray-5)]'
            />
        </div>
    );
};

export default VideoCarousel;
