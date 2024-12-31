import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { usePrevNextButtons, PrevButton, NextButton } from './CarouselArrowButton'
import CommunityThumbnailCard from '../Community/CommunityThumbnailCard'

type PropType = {
    slides: {
        postId: string
        userName: string
        content: string
        title: string
        createdAt: string
    }[]
    options?: EmblaOptionsType
}

const PostCarousel: React.FC<PropType> = ({ slides, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
        usePrevNextButtons(emblaApi)

    return (
        <div className="relative">
            <div className="w-full overflow-hidden pr-[2rem]" ref={emblaRef}>
                <div className="flex gap-[1.6rem] lg:pr-[2rem]">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.postId}
                            className="flex-shrink-0 w-[calc(85%_-_1.6rem)] lg:w-[calc(60%_-_1.6rem)]"
                        >
                            <CommunityThumbnailCard
                                postId={slide.postId}
                                userName={slide.userName}
                                content={slide.content}
                                title={slide.title}
                                createdAt={slide.createdAt}
                            ></CommunityThumbnailCard>
                        </div>
                    ))}
                </div>
            </div>
            {/* <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
            /> */}
            <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className="hidden lg:absolute lg:block top-1/2 right-2 transform -translate-y-1/2 z-10 p-[1.2rem] rounded-[2rem] bg-[var(--moneed-gray-5)]"
            />
        </div>
    )
}

export default PostCarousel
