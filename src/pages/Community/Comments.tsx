import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import Input from '../../components/Input';
import Comment from './Comment';
import { EmblaOptionsType } from 'embla-carousel'
import commentIcon from "../../assets/commentIcon.svg";
import heartIcon from "../../assets/heartIcon.svg";
import redHeartIcon from "../../assets/redHeartIcon.svg";
import sharingIcon from "../../assets/sharingIcon.svg";
import Icon from '../../components/Icon';

const Comments = () => {

    let { postId } = useParams();
    const { state } = useLocation();
    const [newComment, setNewComment] = useState("")

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

    const handleWriteComment = (e) => {
        setNewComment(e.target.value)
    }

    const handleAddComment = () => {
        console.log(newComment, "댓글 추가!")
        setNewComment("")
    }

    return (
        <>
            <div className="px-[2rem] max-w-[128rem] mx-auto">
                <div >
                    <div className="pb-[1.3rem] pt-[1.4rem]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[.6rem]">
                                <div className="rounded-full overflow-hidden aspect-[1/1] w-[2.4rem]">
                                    <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-black)]">
                                    {state.userName}
                                </span>
                                <i className="w-[.2rem] h-[.2rem] rounded-full bg-[var(--moneed-gray-5)]"></i>
                                <span className="text-[1.4rem] font-[400] leading-[142%] text-[var(--moneed-gray-7)]">
                                    {state.createdAt}
                                </span>
                            </div>
                            <div className="rounded-full overflow-hidden aspect-[1/1] w-[1.8rem]">
                                <img src="/src/assets/icon/icon-more.svg" alt="" className="w-full h-full object-cover" />
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
                        {state.isliked ? <Icon iconName={heartIcon} width={18} height={18} ></Icon> :
                            <Icon iconName={redHeartIcon} width={18} height={18} ></Icon>}
                        <span className="mr-[1rem] text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-8)]">6</span>
                        <Icon iconName={commentIcon} width={20} height={20} />
                        <span className="mr-[1rem] text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-8)]">8 </span>
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
                {comments.map((item) => (
                    <Comment
                        userName={item.userName}
                        content={item.content}
                        depth={0}
                        createdAt={item.createdAt}
                        replies={item.replies}
                    >
                    </Comment>
                ))}
                <div className="relative flex items-center bg-[var(--moneed-gray-4)] rounded-[1.2rem] px-[2.4rem] py-[.8rem] w-full">
                    <Input
                        type="text"
                        onChange={handleWriteComment}
                        className="bg-transparent text-[1.4rem] text-[var(--moneed-gray-7)]"
                        placeholder="의견을 공유해보세요.(최대 300자)"
                        value={newComment}
                    />
                    <div
                        className="absolute right-[1rem] rounded-full overflow-hidden aspect-[1/1] w-[3.6rem] bg-[var(--moneed-brand-color)] cursor-pointer"
                        onClick={handleAddComment}
                    >
                        <img src="/src/assets/icon/icon-submit-comment.svg" alt="" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comments;