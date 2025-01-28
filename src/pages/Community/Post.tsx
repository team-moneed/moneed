import Icon from "../../components/Icon";
import commentIcon from "../../assets/commentIcon.svg";
import heartIcon from "../../assets/heartIcon.svg";
import redHeartIcon from "../../assets/redHeartIcon.svg";
import sharingIcon from "../../assets/sharingIcon.svg";
import { useNavigate } from "react-router-dom";
import ImageCarousel from '../../components/Carousel/ImageCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import Modal from "../../components/Modal";
import DateFormatter from "../../util/Dateformatter";
import SnackBar from "../../components/SnackBar";

const Post = ({ userName, content, isliked, postId, stocktype, postImages, likes, createdAt, title }) => {

    const OPTIONS: EmblaOptionsType = {
        slidesToScroll: 1,
        loop: true,
        align: 'center',
        draggable: true,
        containScroll: 'trimSnaps',
    }

    let navigate = useNavigate();
    const movetoDetail = (e, stocktype, postId) => {
        if (isDropdownOpen) {
            setIsdropdownOpen(false);
            return;
        }
        else {
            navigate(`/post/${stocktype}/${postId}`, {
                state: { userName, content, isliked, postId, stocktype, postImages, createdAt, title, likes },
            });
        }
    };



    const [isDropdownOpen, setIsdropdownOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deletePostsuccessSnackbarVisible, setdeletePostSuccessSnackbarVisible] = useState(false);

    //좋아요
    const toggleLike = (e) => {
        e.stopPropagation();
        console.log('좋아요!')
    }

    const handleOpendropdown = (e) => {
        e.stopPropagation();
        setIsdropdownOpen((true))
    }

    //게시글 삭제할건지 묻는 모달 
    const openpostDeletemodal = (e) => {
        e.stopPropagation();
        setIsModalOpen((prev) => !prev)
        setIsdropdownOpen((prev) => !prev)
    }

    //게시글 삭제할건지 묻는 모달창 닫기
    const closepostModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(false)
    }

    //게시글 삭제 api 연동
    const handledeletePost = (e) => {
        setdeletePostSuccessSnackbarVisible(true)
        setIsModalOpen(false)
    }

    const closeDropdown = (e) => {
        setIsdropdownOpen(false);
    };

    const onEditPost = (e) => {
        e.stopPropagation();
        navigate(`/editpost/${stocktype}`, {
            state: { userName, content, isliked, postId, stocktype, postImages, createdAt, title, likes },
        });
    }

    return (
        <>
            <div
                className={`relative border border-solid border-[var(--moneed-gray-5)] rounded-[1.8rem] mb-[1.6rem] ${isDropdownOpen ? 'pointer-events-none' : ''
                    }`}
            >
                <button type="button" onClick={(e) => movetoDetail(e, stocktype, postId)} className="absolute inset-0"></button>
                <div className="pl-[1.8rem] pb-[1.3rem] pr-[1.2rem] pt-[1.4rem]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[.6rem] flex-1">
                            <div className="rounded-full overflow-hidden aspect-[1/1] w-[3.2rem]">
                                <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-black)]">
                                {userName}
                            </span>
                            <i className="w-[.2rem] h-[.2rem] rounded-full bg-[var(--moneed-gray-5)]"></i>
                            <DateFormatter createdAt={createdAt} />
                        </div>
                        <div className="relative ml-auto shrink-0 z-[2]">
                            <div className="cursor-pointer rounded-full overflow-hidden aspect-[1/1] w-[2.4rem]"
                                onClick={handleOpendropdown}>
                                <img src="/src/assets/icon/icon-more.svg" alt="" className="w-full h-full object-cover" />
                            </div>
                            {isDropdownOpen &&
                                <div className="relative z-[2] pointer-events-auto">
                                    <Dropdown
                                        firsttext="게시글 수정"
                                        secondtext="게시글 삭제"
                                        secondevent={openpostDeletemodal}
                                        firstevent={onEditPost}
                                        onClose={closeDropdown}
                                    ></Dropdown>
                                </div>}
                            {isModalOpen && <Modal
                                leftButtontext="취소하기"
                                rightButtontext="삭제하기"
                                leftButtonevent={closepostModal}
                                rightbuttonevent={handledeletePost}
                            >
                                <div>
                                    삭제된 내용은 복구되지 않아요.<br />
                                    정말 삭제하실건가요?
                                </div>
                            </Modal>}
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
                    <div className="relative z-[2]">
                        {isliked ? <Icon iconName={heartIcon} width={18} height={18} onClick={toggleLike}></Icon> :
                            <Icon iconName={redHeartIcon} width={18} height={18} onClick={toggleLike}></Icon>}
                    </div>
                    <span className="relative z-[2] mr-[1rem] text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-8)]">6</span>
                    <div className=" relative z-[2]">
                        <Icon iconName={commentIcon} width={20} height={20} />
                    </div>
                    <span className="relative z-[2] mr-[1rem] text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-8)]">8 </span>
                    <div className=" relative z-[2]">
                        <Icon onClick={() => handleCopyClipBoard(`${baseUrl}${location.pathname}`)} iconName={sharingIcon} width={20} height={20} />
                    </div>
                </div>
                {deletePostsuccessSnackbarVisible && (
                    <SnackBar
                        message="게시글이 삭제되었습니다."
                        setsnackbar={setdeletePostSuccessSnackbarVisible}
                        position="bottom"
                        type="cancel"
                    />
                )}

            </div>
        </>
    );
};

export default Post;