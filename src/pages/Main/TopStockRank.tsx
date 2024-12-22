import StockInfoBox from "../../components/StockInfoBox";
import { useNavigate } from "react-router-dom";
import Chip from "../../components/Chip";
import Button from "../../components/Button";
import { useState } from "react";
import Posts from "../Community/Posts";

const TopStockRank = () => {

    const StockRank = [
        '테슬라', '애플', '카카오'
    ];

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
        }
    ];

    const [selectedStockRank, setSelectedStockRank] = useState(StockRank[0])

    let navigate = useNavigate();
    const movecommunity = (stockname: string) => {
        navigate(`/community/${stockname}`);
    };

    const filteredPosts = allPosts.filter(post => post.stocktype === selectedStockRank);

    return (
        <>
            <div className="flex gap-4">
                {StockRank.map((stock, index) => (
                    <Chip
                        key={index}
                        label={stock}
                        onClick={() => setSelectedStockRank(stock)}
                        active={selectedStockRank === stock}
                    />
                ))}
            </div>

            <div>
                <Posts
                    posts={filteredPosts}
                    displayMode="list"
                    isImgShow={false}
                />
                <Button onClick={() => movecommunity(selectedStockRank)}>
                    해당 게시글로 이동
                </Button>
            </div>
        </>
    );
};

export default TopStockRank;
