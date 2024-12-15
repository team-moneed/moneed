import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
    slides: string[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef] = useEmblaCarousel(options)

    return (
        <section className="embla">
            <div className="embla__viewport w-full overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                    {slides.map((imgUrl, index) => (
                        <div
                            className="embla__slide w-full h-64 flex-shrink-0"
                            key={index}
                        >
                            <img
                                src={imgUrl}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
