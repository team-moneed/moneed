import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
    slides: { imgUrl?: string, videoUrl?: string, title: string, userName: string, createdAt: string }[]
    options?: EmblaOptionsType
    type: 'image' | 'video'
    slidesToShow?: number
}

const AlignCarousel: React.FC<PropType> = (props) => {
    const { slides, options, type, slidesToShow } = props
    const [emblaRef] = useEmblaCarousel(options)

    const slideWidth = 100 / slidesToShow;

    return (
        <section className="embla max-w-[48rem] mx-auto">
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                    {slides.map((slide, index) => (
                        <div
                            className="embla__slide flex-shrink-0 w-[calc(100%-2rem)] mr-4 relative bg-white shadow-lg rounded-lg overflow-hidden"
                            key={index}
                            style={{ width: `${slideWidth}%` }}
                        >
                            {type === 'image' && (
                                <>
                                    <div className="flex items-center p-4">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{slide.userName}</p>
                                            <p className="text-sm text-gray-500">{new Date(slide.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">{slide.title}</h2>
                                </>
                            )}

                            <div className="relative w-full h-64">
                                {type === 'image' ? (
                                    <img
                                        src={slide.imgUrl}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <video
                                        width="100%"
                                        height="100%"
                                        controls
                                        className="w-full h-full object-cover"
                                    >
                                        <source src={slide.videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                            {type === 'video' && (
                                <>
                                    <div className="flex items-center p-4">
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">{slide.title}</h2>
                                            <p className="text-sm text-gray-500">{new Date(slide.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AlignCarousel;
