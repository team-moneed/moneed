import { useNavigate } from "react-router-dom";
import Chip from "../../components/Chip";
import Button from "../../components/Button";
import { useState } from "react";
import MainPostBox from "../../components/Main/MainPostBox";

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
            content: "3 카카오게시글! 카카오카카ㅗ오오",
            userName: "사용자6",
            createdAt: "2024-12-09T09:00:00Z",
            likes: 7,
            stocktype: "카카오",
            category: "금융",
            isliked: false,
        },
        {
            postId: 4,
            title: "너무어려워용",
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333'
            ],
            content: "어려워어ㅕㄹ워엉리나얼안란ㅇ랑러ㅏㄴ라아아 ",
            userName: "사용자1",
            createdAt: "2024-12-10T10:00:00Z",
            likes: 10,
            stocktype: "테슬라",
            category: "금융",
            isliked: true,
        },
        {
            postId: 5,
            title: "너무 힘드렁",
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333'
            ],
            content: "어ㅇㄴㄹㅇㄴ랑라앙야아아아앙아ㅏㅇ캉아아아게시글게시글이건내용이야 ",
            userName: "사용자2",
            createdAt: "2024-12-10T10:00:00Z",
            likes: 10,
            stocktype: "테슬라",
            category: "금융",
            isliked: true,
        },
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
                {StockRank.map((stock, index) => {
                    let medalIcon = "🥇";
                    if (index === 1) {
                        medalIcon = "🥈";
                    } else if (index === 2) {
                        medalIcon = "🥉";
                    }

                    return (
                        <Chip
                            key={index}
                            label={medalIcon + stock}
                            onClick={() => setSelectedStockRank(stock)}
                            active={selectedStockRank === stock}
                        />
                    );
                })}
            </div>

            <div>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]">
                    {filteredPosts.map((post) => (
                        <MainPostBox
                            postId={post.postId}
                            userName={post.userName}
                            content={post.content}
                            title={post.title}
                            createdAt={post.createdAt}
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-[1.8rem] lg:justify-start lg:mt-[2.6rem]">
                    <Button onClick={() => movecommunity(selectedStockRank)} className="flex items-center gap-[.8rem] py-0 lg:pl-0">
                        <span className="text-[1.4rem] text-[var(--moneed-gray-8)] font-semibold leading-[135%]">
                            해당 게시판 더보기
                        </span>
                        <img src="/src/assets/icon/icon-arrow-right.svg" alt="" />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default TopStockRank;
