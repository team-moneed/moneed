import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import { useNavigate } from "react-router-dom";
import Comment from './Comment';
import { EmblaOptionsType } from 'embla-carousel'
import Icon from '../../components/Icon';
import Dropdown from '../../components/Dropdown';
import DateFormatter from '../../util/Dateformatter';
import useSnackBarStore from '../../store/useSnackBarStore';
import { useModal } from '../../context/ModalContext';

const PostDetail = () => {

    // let { postId } = useParams();
    const inputRef = useRef<HTMLInputElement>(null);;
    const { state } = useLocation();
    console.log('state', state)
    const [newComment, setNewComment] = useState("")

    const [isEdit, setIsEdit] = useState(false)
    const [editContent, setEditContent] = useState("");

    const [isDropdownOpen, setIsdropdownOpen] = useState(false)

    const { showSnackBar } = useSnackBarStore();
    const { confirm } = useModal();

    const navigate = useNavigate();

    const OPTIONS: EmblaOptionsType = {
        slidesToScroll: 1,
        loop: true,
        align: 'center',
        // dragga ble: true,
        containScroll: 'trimSnaps',
    }

    //postId에 해당하는 댓글 가져오기
    const PostDetail = [
        {
            commentId: 1,
            content: "좋은 정보 감사합니다!",
            parentId: null,
            userName: "사용자2",
            createdAt: "2024-12-10T10:15:00Z",
        },
        {
            commentId: 3,
            content: "대댓글까지 만들 수 있다니 대단해요.대댓글까지 만들 수 있다니 대단해요.대댓글까지 만들 수 있다니 대단해요.대댓글까지 만들 수 있다니 대단해요.",
            parentId: null,
            userName: "사용자4",
            createdAt: "2024-12-10T10:25:00Z",
        }
    ]

    //댓글 추가/수정 창
    const handleWriteComment = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            showSnackBar('댓글이 수정되었습니다.', 'action', 'bottom', '');
            setEditContent("")
            setIsEdit(false)
        } else {
            console.log(newComment, "댓글 추가!")
            showSnackBar('댓글이 작성되었습니다.', 'action', 'bottom', '');
            setNewComment("")
        }
    }

    const handleOpendropdown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsdropdownOpen(true)
    }

    //게시글 삭제할건지 묻는 모달 
    const openpostDeletemodal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const result = confirm(<span>
            삭제된 내용은 복구되지 않아요.<br />
            정말 삭제하실건가요?
        </span>);
        result.then((confirmed) => {
            if (confirmed) {
                handledeletePost(e);
            }
        });
        setIsdropdownOpen((prev) => !prev)
    }

    //게시글 삭제 api 연동
    const handledeletePost = (e: React.MouseEvent<HTMLDivElement>) => {
        showSnackBar('게시글이 삭제되었습니다.', 'action', 'bottom', '');
        e.stopPropagation();

    }

    const closeDropdown = () => {
        setIsdropdownOpen(false);
    };

    const handleEditComment = (content: string) => {
        setIsEdit(true)
        setEditContent(content)
        console.log(content)
    }

    const onEditPost = (e: React.MouseEvent<HTMLDivElement>) => {

        const { userName, content, isliked, postId, stocktype, postImages, createdAt, title, likes } = state;
        e.stopPropagation();
        navigate(`/editpost/${stocktype}`, {
            state: { userName, content, isliked, postId, stocktype, postImages, createdAt, title, likes },
        });
    }

    const onEditComment = (content: string) => {
        handleEditComment(content)
    }



    return (
        <>
            <div className="px-[2rem] max-w-[128rem] mx-auto" >
                <div className="hidden lg:block font-[600] leading-[140%] text-[1.6rem] ml-[.4rem] text-[var(--moneed-gray-9)] mb-[1rem]">
                    {state.stocktype}커뮤니티
                </div>
                <div className="lg:flex gap-[3rem]">
                    <div className="lg:w-[60%] lg:border-[1px] lg:border-[var(--moneed-gray-4)] rounded-[1.2rem] lg:p-[2rem]">
                        <div className="pb-[1.3rem] pt-[1.4rem]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-[.6rem]">
                                    <div className="rounded-full overflow-hidden aspect-[1/1] w-[2.4rem]">
                                        <img src="/temp/sample3.png" alt=""
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
                                        <img src="/icon/icon-more.svg" alt="" className="w-full h-full object-cover" />
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
                            {state.isliked ? <Icon iconUrl="/heartIcon.svg" width={18} height={18}></Icon> :
                                <Icon iconUrl="/redHeartIcon.svg" width={18} height={18} ></Icon>}
                            <span
                                className="mr-[1rem] text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-8)]">6</span>
                            <Icon iconUrl="/commentIcon.svg" width={20} height={20} />
                            <span
                                className="mr-[1rem] text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-8)]">8 </span>
                            <Icon iconUrl="/sharingIcon.svg" width={20} height={20} />
                        </div>
                    </div>
                    <div className="lg:w-[40%] lg:ml-auto flex flex-col">
                        <div className="order-1 lg:order-2 flex gap-[1rem] py-[1.8rem]">
                            <div className="text-[1.8rem] font-[600] leading-[140%] text-[var(--moneed-black)]">
                                댓글
                            </div>
                            <div className="text-[1.8rem] font-[600] leading-[140%] text-[var(--moneed-black)]">
                                8
                            </div>
                        </div>
                        <div className="order-2 lg:order-3 flex flex-col gap-[3.6rem]">
                            {PostDetail.length == 0 ?
                                <div>
                                    <div className="flex justify-center items-center mt-[2rem]">
                                        <img src="/cta-2.svg" alt="" className="w-[29rem]" />
                                    </div>
                                </div>
                                : PostDetail.map((item) => (
                                    <Comment
                                        userName={item.userName}
                                        content={item.content}
                                        createdAt={item.createdAt}
                                        onEditComment={() => onEditComment(item.content)}
                                    >
                                    </Comment>
                                ))}
                        </div>
                        <div
                            className="order-3 lg:order-1 mt-[4rem] lg:mt-[1rem] relative flex items-center bg-[var(--moneed-gray-4)] rounded-[1.2rem]">
                            <input
                                ref={inputRef}
                                type="text"
                                onChange={handleWriteComment}
                                className="bg-transparent text-[1.6rem] text-[var(--moneed-black)] placeholder:text-[var(--moneed-gray-7)] px-[1.8rem] py-[1.2rem] w-full focus:outline-none"
                                placeholder="의견을 공유해보세요.(최대 300자)"
                                value={isEdit ? editContent : newComment}
                            />
                            <div
                                className="absolute right-[1rem] rounded-full aspect-[1/1] w-[3.6rem] bg-[var(--moneed-gray-6)] cursor-pointer hover:bg-[var(--moneed-brand-color)]"
                                onClick={handleSubmitComment}
                            >
                                <img src="/icon/icon-submit-comment.svg" alt=""
                                    className="p-[.6rem]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetail;