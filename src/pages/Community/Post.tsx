import Icon from "../../components/Icon";
import commentIcon from "../../assets/commentIcon.svg";
import heartIcon from "../../assets/heartIcon.svg";
import redHeartIcon from "../../assets/redHeartIcon.svg";
import sharingIcon from "../../assets/sharingIcon.svg";
import { useNavigate } from "react-router-dom";
import ImageCarousel from '../../components/Carousel/ImageCarousel'
import { EmblaOptionsType } from 'embla-carousel'

const Post = ({ userName, content, isliked, postId, stocktype, postImages, likes, createdAt, title }) => {

    const OPTIONS: EmblaOptionsType = {
        slidesToScroll: 1,
        loop: true,
        align: 'center',
        draggable: true,
        containScroll: 'trimSnaps',
    }


    let navigate = useNavigate();
    const movetoDetail = (postId) => {
        navigate(`/comment/${postId}`, {
            state: { userName, content, isliked, postId, stocktype, postImages, createdAt, title },
        });
    }

    //좋아요
    const toggleLike = () => {

    }

    return (
        <>
            <div className="border border-solid border-[var(--moneed-gray-5)] rounded-[1.8rem] mb-[1.6rem] " onClick={() => movetoDetail(postId)}>
                <div className="pl-[1.8rem] pb-[1.3rem] pr-[1.2rem] pt-[1.4rem]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[.6rem]">
                            <div className="rounded-full overflow-hidden aspect-[1/1] w-[3.2rem]">
                                <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-black)]">
                                {userName}
                            </span>
                            <i className="w-[.2rem] h-[.2rem] rounded-full bg-[var(--moneed-gray-5)]"></i>
                            <span className="text-[1.4rem] font-[400] leading-[142%] text-[var(--moneed-gray-7)]">
                                {createdAt}
                            </span>
                        </div>
                        <div className="rounded-full overflow-hidden aspect-[1/1] w-[1.8rem]">
                            <img src="/src/assets/icon/icon-more.svg" alt="" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <p className="mt-[1.2rem] text-[1.6rem] font-bold leading-[135%] text-[var(--moneed-black)] line-clamp-1">
                        {title}
                    </p>
                    <p className="mt-[.4rem] mb-[.8rem] text-[1.6rem] font-[400] leading-[145%] text-[var(--moneed-gray-9)] line-clamp-3">
                        {content}
                    </p>
                    {postImages.length > 0 && <div>
                        <ImageCarousel slides={postImages} options={OPTIONS} />
                    </div>}
                </div>
                <div className="flex pl-[1.6rem] pb-[1.6rem] pr-[1.2rem] pt-[.4rem]">
                    {isliked ? <Icon iconName={heartIcon} width={18} height={18} onClick={toggleLike}></Icon> :
                        <Icon iconName={redHeartIcon} width={18} height={18} onClick={toggleLike}></Icon>}
                    <span className="mr-[1rem] text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-8)]">6</span>
                    <Icon iconName={commentIcon} width={20} height={20} />
                    <span className="mr-[1rem] text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-8)]">8 </span>
                    <Icon iconName={sharingIcon} width={20} height={20} />
                </div>

            </div>
        </>
    );
};

export default Post;
