import { useState } from "react";

const Comment = ({ userName, content, createdAt, replies, depth = 0 }) => {

    const [newReply, setNewReply] = useState("")
    const [isReply, setIsReply] = useState(false)

    const handleWriteReply = (e) => {
        setNewReply(e.target.value)
    }

    const handleAddReply = () => {
        console.log(newReply, "대댓글 추가!")
        setNewReply("")
    }

    const handleOpenReply = () => {
        setIsReply((prev) => !prev)
    }

    return (
        <>
            <div className="relative flex items-start gap-[.6rem]">
                <i className="absolute block w-[.1rem] top-0 bottom-0 left-[1.6rem] bg-[var(--moneed-gray-5)]"></i>
                <div className="relative rounded-full overflow-hidden aspect-[1/1] w-[3.2rem] shrink-0">
                    <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                    <span className="text-[1.4rem] font-[700] leading-[140%] text-[var(--moneed-black)]">
                        {userName}
                    </span>
                    <i className="w-[.2rem] h-[.2rem] mx-[.8rem] mb-[.2rem] rounded-full bg-[var(--moneed-gray-5)] inline-block "></i>
                    <span className="text-[1.4rem] font-[400] leading-[142%] text-[var(--moneed-gray-7)]">
                        {createdAt}
                    </span>
                    <div className="text-[1.4rem] font-[400] leading-[140%]">
                        댓글은 500자 Max입니다
                        좌측의 길이는 글을 쓸때 댓글 높이에 따라 짧아지고 길어집니다.
                        좌측의 길이는 글을 쓸때 댓글 높이에 따라 짧아지고 길어집니다.
                    </div>
                </div>
                <div className="rounded-full overflow-hidden aspect-[1/1] w-[1.8rem] shrink-0">
                    <img src="/src/assets/icon/icon-more.svg" alt="" className="w-full h-full object-cover" />
                </div>
            </div>
            {/* <div>
                <Icon iconName={commentIcon} width={20} height={20} onClick={handleOpenReply} />
            </div>

            {replies && replies.length > 0 && (
                <div>
                    {replies.map((reply) => (
                        <Comment
                            key={reply.commentId}
                            userName={reply.userName}
                            content={reply.content}
                            replies={reply.replies}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
            {isReply &&
                <><Input
                    type="text"
                    onChange={handleWriteReply}
                    className="border-2"
                    placeholder="대댓글 입력하세요."
                    value={newReply}>
                </Input>
                    <Button type="submit" className="green" theme="primary" onClick={handleAddReply}>완료</Button>
                </>} */}
        </>
    );
};

export default Comment;