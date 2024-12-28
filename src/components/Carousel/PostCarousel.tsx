import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import TopPostBox from '../Community/TopPostBox'

type PropType = {
    slides: []
    options?: EmblaOptionsType
}

const PostCarousel: React.FC<PropType> = ({ slides, options }) => {
    const [emblaRef] = useEmblaCarousel(options)

    return (
        <div className=" w-full overflow-hidden" ref={emblaRef}>
            <div className="flex gap-[1.6rem]">
                {slides.map((slide, index) => (
                    <div className="flex-shrink-0 w-[calc(85%_-_1.6rem)] lg:w-[calc(60%_-_1.6rem)]">
                        <TopPostBox
                            key={slide.postId}
                            postId={slide.postId}
                            userName={slide.userName}
                            content={slide.content}
                            title={slide.title}
                            createdAt={slide.createdAt}
                        ></TopPostBox>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostCarousel
