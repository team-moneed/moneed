import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import { useNavigate } from "react-router-dom";
import Comment from './Comment';
import { EmblaOptionsType } from 'embla-carousel'
import commentIcon from "../../assets/commentIcon.svg";
import heartIcon from "../../assets/heartIcon.svg";
import redHeartIcon from "../../assets/redHeartIcon.svg";
import sharingIcon from "../../assets/sharingIcon.svg";
import Icon from '../../components/Icon';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import DateFormatter from '../../util/Dateformatter';
import { useIsEditingStore } from '../../store/useIsEditingStore';

const Comments = () => {

    let { postId } = useParams();
    const inputRef = useRef<HTMLInputElement>(null);;
    const { state } = useLocation();
    const [newComment, setNewComment] = useState("")
    const { setIsEditing } = useIsEditingStore();

    const [isEdit, setIsEdit] = useState(false)
    const [editContent, setEditContent] = useState("");

    const [isDropdownOpen, setIsdropdownOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        if (editContent || newComment) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }, [editContent, newComment, setIsEditing]);

    const OPTIONS: EmblaOptionsType = {
        slidesToScroll: 1,
        loop: true,
        align: 'center',
        draggable: true,
        containScroll: 'trimSnaps',
    }

    //postId에 해당하는 댓글 가져오기
    const comments = [
        {
            commentId: 1,
            content: "좋은 정보 감사합니다!",
            parentId: null,
            userName: "사용자2",
            createdAt: "2024-12-10T10:15:00Z",
            replies: [
                {
                    commentId: 2,
                    content: "저도 동의합니다!",
                    parentId: 1,
                    userName: "사용자3",
                    createdAt: "2024-12-10T10:20:00Z",
                    replies: []
                },
                {
                    commentId: 3,
                    content: "저도 동의합니다2222",
                    parentId: 1,
                    userName: "사용자4",
                    createdAt: "2024-12-10T10:20:00Z",
                    replies: []
                }
            ]
        },
        {
            commentId: 3,
            content: "대댓글까지 만들 수 있다니 대단해요.",
            parentId: null,
            userName: "사용자4",
            createdAt: "2024-12-10T10:25:00Z",
            replies: []
        }
    ]

    //댓글 추가/수정 창
    const handleWriteComment = (e) => {
        if (isEdit) {
            setEditContent(e.target.value);
        } else {
            setNewComment(e.target.value);
        }

        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo({
                top: scrollTop + rect.top - window.innerHeight / 3,
                behavior: 'smooth',
            });
        }
    };

    //댓글 수정/삭제 후  제출
    const handleSubmitComment = () => {
        setNewComment("")
        if (isEdit) {
            console.log(editContent, "댓글 수정!")
            setEditContent("")
        } else {
            console.log(newComment, "댓글 추가!")
            setNewComment("")
        }
    }

    const handleOpendropdown = (e) => {
        e.stopPropagation();
        setIsdropdownOpen(true)
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
        e.stopPropagation();

    }

    const closeDropdown = (e) => {
        setIsdropdownOpen(false);
    };

    const handleEditComment = (content) => {
        setIsEdit(true)
        setEditContent(content)
        console.log(content)
    }

    const onEditPost = (e) => {

        const { userName, content, isliked, postId, stocktype, postImages, createdAt, title, likes } = state;
        e.stopPropagation();
        navigate(`/editpost/${stocktype}`, {
            state: { userName, content, isliked, postId, stocktype, postImages, createdAt, title, likes },
        });
    }

    const onEditComment = (content) => {
        handleEditComment(content)
    }

    return (
        <>
            <div className="px-[2rem] max-w-[128rem] mx-auto" >
                <div>
                    <div className="pb-[1.3rem] pt-[1.4rem]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[.6rem]">
                                <div className="rounded-full overflow-hidden aspect-[1/1] w-[2.4rem]">
                                    <img src="/src/assets/temp/sample3.png" alt=""
                                        className="w-full h-full object-cover" />
                                </div>
                                <span className="text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-black)]">
                                    {state.userName}
                                </span>
                                <i className="w-[.2rem] h-[.2rem] rounded-full bg-[var(--moneed-gray-5)]"></i>
                                <DateFormatter createdAt={state.createdAt} />
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
                        <p className="mt-[2.4rem] text-[1.6rem] font-[600] leading-[140%] text-[var(--moneed-black)]">
                            {state.title}
                        </p>
                        <p className="mt-[2.4rem] mb-[.8rem] text-[1.6rem] font-[400] leading-[145%] text-[var(--moneed-gray-9)]">
                            {state.content}
                        </p>
                        {state.postImages.length > 0 && <div className="mt-[2.4rem]">
                            <ImageCarousel slides={state.postImages} options={OPTIONS} />
                        </div>}
                    </div>
                    <div className="flex pb-[1.6rem] pt-[.4rem]">
                        {state.isliked ? <Icon iconName={heartIcon} width={18} height={18}></Icon> :
                            <Icon iconName={redHeartIcon} width={18} height={18}></Icon>}
                        <span
                            className="mr-[1rem] text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-8)]">6</span>
                        <Icon iconName={commentIcon} width={20} height={20} />
                        <span
                            className="mr-[1rem] text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-8)]">8 </span>
                        <Icon iconName={sharingIcon} width={20} height={20} />
                    </div>
                </div>
                <div className="flex gap-[1rem] py-[1.8rem]">
                    <div className="text-[1.8rem] font-[600] leading-[140%] text-[var(--moneed-black)]">
                        댓글
                    </div>
                    <div className="text-[1.8rem] font-[600] leading-[140%] text-[var(--moneed-black)]">
                        8
                    </div>
                </div>
                <div className="max-w-[128rem] mx-auto flex flex-col gap-[3.6rem]">
                    {comments.length == 0 ?
                        <div>
                            <div className="flex justify-center items-center mt-[2rem]">
                                <img src="/src/assets/cta-2.svg" alt="" className="w-[29rem]" />
                            </div>
                        </div>
                        : comments.map((item) => (
                            <Comment
                                userName={item.userName}
                                content={item.content}
                                depth={0}
                                createdAt={item.createdAt}
                                replies={item.replies}
                                isEdit={isEdit}
                                editContent={item.content}
                                onEditComment={() => onEditComment(item.content)}
                            >
                            </Comment>
                        ))}
                </div>
                <div
                    className="mt-[4rem] relative flex items-center bg-[var(--moneed-gray-4)] rounded-[1.2rem]">
                    <input
                        ref={inputRef}
                        type="text"
                        onChange={handleWriteComment}
                        className="bg-transparent text-[1.4rem] text-[var(--moneed-black)] placeholder:text-[var(--moneed-gray-7)] px-[1.8rem] py-[1.2rem] w-full focus:outline-none"
                        placeholder="의견을 공유해보세요.(최대 300자)"
                        value={isEdit ? editContent : newComment}
                    />
                    <div
                        className="absolute right-[1rem] rounded-full aspect-[1/1] w-[3.6rem] bg-[var(--moneed-gray-6)] cursor-pointer hover:bg-[var(--moneed-brand-color)]"
                        onClick={handleSubmitComment}
                    >
                        <img src="/src/assets/icon/icon-submit-comment.svg" alt=""
                            className="p-[.6rem]" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comments;