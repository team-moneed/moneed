import Icon from "../../components/Icon";
import commentIcon from "../../assets/commentIcon.svg";
import heartIcon from "../../assets/heartIcon.svg";
import redHeartIcon from "../../assets/redHeartIcon.svg";
import { useNavigate } from "react-router-dom";
import EmblaCarousel from '../../components/Carousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

const Post = ({ userName, content, isliked, postId, stocktype, postImages, isImgShow, likes }) => {

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
            state: { userName, content, isliked, postId, stocktype, postImages },
        });
    }

    //좋아요
    const toggleLike = () => {

    }

    return (
        <>
            <div>
                {userName}
            </div>
            {isImgShow && <div>
                <EmblaCarousel slides={postImages} options={OPTIONS} />
            </div>}
            <div>
                content : {content}
            </div>
            <div>
                {isliked ? <Icon iconName={heartIcon} width={20} height={20} onClick={toggleLike}></Icon> :
                    <Icon iconName={redHeartIcon} width={20} height={20} onClick={toggleLike}></Icon>}
                {likes}
            </div>
            <div>
                <Icon iconName={commentIcon} width={20} height={20} onClick={() => movetoDetail(postId)} />
            </div>
        </>
    );
};

export default Post;
