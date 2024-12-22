import { useEffect, useState } from "react";
import { STOCKTYPES } from "../../config/StockTypesetting";
import { useParams } from 'react-router-dom';
import Posts from "./Posts";
import useSearchStore from "../../store/useSearchStore";
import Vote from "../../components/Vote";
import StockTypeBar from "../../components/StockTypeBar";
import TopCategory from "./TopCategory";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Community = () => {
    const { searchKeyword } = useSearchStore();
    const { stocktype } = useParams();

    const [selectedStockType, setSelectedStockType] = useState(stocktype || "전체");

    useEffect(() => {
        if (stocktype) {
            setSelectedStockType(stocktype);
        }
    }, [stocktype]);

    let navigate = useNavigate();
    const movetoWritePost = () => {
        navigate(`/writepost`)
    }

    const allPosts = [
        {
            postId: 1,
            title: "1",
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333'
            ],
            content: "1 테슬라 주식 언제 사 ",
            userName: "사용자1",
            createdAt: "2024-12-10T10:00:00Z",
            likes: 10,
            stocktype: "테슬라",
            category: "금융",
            isliked: true,
            comments: [
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
        },
        {
            postId: 2,
            title: "2",
            postImages: [
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333'
            ],
            content: "2",
            userName: "사용자5",
            createdAt: "2024-12-09T09:00:00Z",
            likes: 7,
            stocktype: "애플",
            category: "정보기술",
            isliked: false,
            comments: []
        },
        {
            postId: 3,
            title: "3",
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333'
            ],
            content: "3 테슬라 언제 오르지?",
            userName: "사용자6",
            createdAt: "2024-12-09T09:00:00Z",
            likes: 7,
            stocktype: "테슬라",
            category: "금융",
            isliked: false,
            comments: []
        }
    ];

    const filteredPosts = selectedStockType === "전체"
        ? allPosts
        : allPosts.filter(post => post.stocktype === selectedStockType);

    return (
        <>
            <Button onClick={movetoWritePost}>게시글작성</Button>
            <div>
                <StockTypeBar selectedStockType={selectedStockType} setSelectedStockType={setSelectedStockType} />
                {selectedStockType === "전체" ? (
                    <div>
                        <h2>Top 5 게시글</h2>
                        <Posts posts={allPosts} displayMode="slider" imgFirst={true} />
                        <div>
                            <h2>실시간 인기 카테고리</h2>
                            <TopCategory></TopCategory>
                        </div>
                        <div>
                            <h2>투표</h2>
                            <Vote></Vote>
                        </div>
                        <h2>전체 인기 급상승 게시글</h2>
                        <Posts posts={allPosts} displayMode="list" imgFirst={true} isImgShow={true} />
                    </div>
                ) : (
                    <div>
                        <h2>카테고리: {selectedStockType}</h2>
                        <Posts posts={filteredPosts} displayMode="list" imgFirst={false} isImgShow={true} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Community;
