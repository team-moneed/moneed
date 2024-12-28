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
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide, index) => (
                        <div
                            className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.333%] shrink-0 pl-4 first:pl-0"
                            key={index}
                            style={{ aspectRatio: '9/16' }}
                        >
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
        </div>
    )
}

export default VideoCarousel;

