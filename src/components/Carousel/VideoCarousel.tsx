import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
type PropType = {
    slides: { imgUrl?: string, videoUrl?: string, title: string, userName: string, createdAt: string }[]
    options?: EmblaOptionsType
    slidesToShow?: number
}
const VideoCarousel = (props: PropType) => {
    const { slides, options, slidesToShow } = props
    const [emblaRef] = useEmblaCarousel({
        ...options,
        loop: true,
        wrapAround: true,
        slidesToShow,
    })
    return (
        <div className="flex flex-col items-start gap-[1rem] self-stretch pb-[1.2rem] overflow-hidden" ref={emblaRef}>
            <div className="flex gap-[1.3rem] lg:gap-[1.4rem] items-center self-stretch" >
                {slides.map((slide, index) => (
                    <div className="rounded-[0.8rem] aspect-[108/192] lg:aspect-[162/288] shrink-0 overflow-hidden">
                        <video
                            controls
                            className="w-full h-full object-cover"
                        >
                            <source src={slide.videoUrl} type="video/mp4" />
                        </video>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VideoCarousel;

