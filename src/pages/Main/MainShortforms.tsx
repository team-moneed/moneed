import VideoCarousel from "../../components/Carousel/VideoCarousel";


const MainShortforms = () => {

    const VIDEOOPTIONS = {
        slidesToScroll: 1,
        loop: true,
        align: "start",
        draggable: true,
        containScroll: "trimSnaps",
    };

    const videoSlides = [
        {
            videoUrl: "",
            title: "동영상 1",
            createdAt: "2024-12-10T10:00:00Z",
        },
        {
            videoUrl: "",
            title: "동영상 2",
            createdAt: "2024-12-09T09:00:00Z",
        },
        {
            videoUrl: "",
            title: "동영상 3",
            createdAt: "2024-12-09T09:00:00Z",
        },
        {
            videoUrl: "",
            title: "동영상 4",
            createdAt: "2024-12-09T09:00:00Z",
        },
        {
            videoUrl: "",
            title: "동영상 5",
            createdAt: "2024-12-09T09:00:00Z",
        },
        {
            videoUrl: "",
            title: "동영상 6",
            createdAt: "2024-12-09T09:00:00Z",
        },
        {
            videoUrl: "",
            title: "동영상 7",
            createdAt: "2024-12-09T09:00:00Z",
        },
        {
            videoUrl: "",
            title: "동영상 8",
            createdAt: "2024-12-09T09:00:00Z",
        },
    ];

    return (
        <>
            <div className="mt-[1rem]">
                <VideoCarousel slides={videoSlides} type="video" options={VIDEOOPTIONS} />
            </div>
        </>
    );
};

export default MainShortforms;