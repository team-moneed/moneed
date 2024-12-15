import { useState } from "react";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Input from "../../components/Input";
import commentIcon from "../../assets/commentIcon.svg";

const Comment = ({ userName, content, replies, depth = 0 }) => {

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
        <div style={{ marginLeft: depth * 20 }}>
            <div>
                <p>{userName}</p>
                <p>{content}</p>
            </div>
            <div>
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
                </>}
        </div>
    );
};

export default Comment;
