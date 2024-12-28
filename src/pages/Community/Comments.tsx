import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import Input from '../../components/Input';
import Comment from './Comment';
import { EmblaOptionsType } from 'embla-carousel'

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
            <div >
                <p>
                    <p>User:</p> {state?.userName}
                </p>
                <div>
                    <ImageCarousel slides={state?.postImages} options={OPTIONS} />
                </div>
                <p>{state?.content}</p>
            </div>
            <div>
                댓글 시작!!!-----
            </div>
            {comments.map((item) => (
                <Comment
                    userName={item.userName}
                    content={item.content}
                    depth={0}
                    replies={item.replies}
                >
                </Comment>
            ))}
            <Input
                type="text"
                onChange={handleWriteComment}
                className="border-2"
                placeholder="댓글 입력하세요."
                value={newComment}>
            </Input>
            <Button type="submit" className="green" theme="primary" onClick={handleAddComment}>완료</Button>
        </>
    );
};

export default Comments;