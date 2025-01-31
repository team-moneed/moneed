const ShortformDetail = () => {

    const videoList = [
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
            <div>
                숏폼Detail
            </div>
            {videoList.map((index) => (
                <div className="shrink-0"
                    key={index}
                    style={{ aspectRatio: '9/16' }}>
                    <video
                        key={index}
                        controls
                        className="w-full h-full object-cover rounded-[.8rem]"
                    >
                    </video>
                </div>
            ))}
        </>
    );
};

export default ShortformDetail;