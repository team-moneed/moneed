const MainThumbnailCard = ({ postId, userName, content, title, createdAt }) => {

    return (
        <>
            <div className="border border-solid border-[var(--moneed-gray-5)] p-[1.8rem] rounded-[1.8rem]">
                <div className="flex items-center gap-[.6rem]">
                    <div className="rounded-full overflow-hidden aspect-[1/1] w-[1.8rem]">
                        <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[1.4rem] font-[400] leading-[142%] text-[var(--moneed-gray-7)]">
                        {userName}
                    </span>
                    <i className="w-[.2rem] h-[.2rem] rounded-full bg-[var(--moneed-gray-5)]"></i>
                    <span className="text-[1.4rem] font-[400] leading-[142%] text-[var(--moneed-gray-7)]">
                        {createdAt}
                    </span>
                </div>
                <p className="mt-[1.2rem] text-[1.6rem] font-bold leading-[135%] text-[var(--moneed-black)] line-clamp-1">
                    {title}
                </p>
                <p className="mt-[.4rem] text-[1.6rem] font-[400] leading-[145%] text-[var(--moneed-gray-9)] line-clamp-2">
                    {content}
                </p>
            </div>
        </>
    );
};

export default MainThumbnailCard;