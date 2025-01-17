import DateFormatter from "../../util/Dateformatter";

const CommunityThumbnailCard = ({ postId, userName, content, title, createdAt }) => {
    return (
        <div className="relative border border-solid border-[var(--moneed-gray-5)] px-[1.8rem] py-[1.6rem] rounded-[1.6rem] h-[18rem]">

            <p className="mt-[1.2rem] text-[1.6rem] font-[600] leading-[140%] text-[var(--moneed-black)] line-clamp-1">
                {title}
            </p>
            <p className="mt-[.4rem] mb-[1.2rem] text-[1.6rem] font-[400] leading-[140%] text-[var(--moneed-gray-9)] line-clamp-3">
                {content}
            </p>

            <div className="absolute bottom-[1.6rem] flex items-center gap-[.6rem]">

                <div className="rounded-full overflow-hidden aspect-[1/1] w-[1.8rem]">
                    <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-black)]">
                    {userName}
                </span>
                <i className="w-[.2rem] h-[.2rem] rounded-full bg-[var(--moneed-gray-5)]"></i>
                <DateFormatter createdAt={createdAt} />
            </div>
        </div>
    );
};

export default CommunityThumbnailCard;