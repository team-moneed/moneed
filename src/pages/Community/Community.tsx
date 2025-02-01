import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import Posts from "./Posts";
import StockTypeBar from "../../components/StockTypeBar";
import TopCategory from "./TopCategory";
import PostCarousel from "../../components/Carousel/PostCarousel";
import useMoveScroll from "../../hook/usemoveScroll";
import StockInfoBox from "../../components/Community/StockInfoBox";
import CompanyInfoBox from "../../components/Community/CompanyInfoBox";


const Community = () => {

    const { stocktype } = useParams();

    const [selectedStockType, setSelectedStockType] = useState(stocktype || "전체");

    useEffect(() => {
        if (stocktype) {
            setSelectedStockType(stocktype);
        }
    }, [stocktype]);

    const top5Ref = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const hotPostsRef = useRef<HTMLDivElement>(null);
    const voteRef = useRef<HTMLDivElement>(null);

    const { onMoveToElement: moveToTop5 } = useMoveScroll(top5Ref);
    const { onMoveToElement: moveToCategory } = useMoveScroll(categoryRef);
    const { onMoveToElement: moveToHotPosts } = useMoveScroll(hotPostsRef);
    const { onMoveToElement: moveToVote } = useMoveScroll(voteRef);

    const topPosts = [
        {
            postId: 1,
            title: "1",
            content: "1 테슬라 주식 언제 사테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사  ",
            userName: "사용자1",
            createdAt: "2024-12-10T10:00:00Z",
            stocktype: "테슬라",
        },
        {
            postId: 2,
            title: "2",
            content: "2 주식으로 돈벌래돈벌꺼야!!테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사언제사야이득이야? 알려줘알려줘알려주라고!!",
            userName: "사용자5",
            createdAt: "2024-12-09T09:00:00Z",
            stocktype: "애플",
        },
        {
            postId: 3,
            title: "3",
            content: "3 카카오게시글! 카카오카카ㅗ오오",
            userName: "사용자6",
            createdAt: "2024-12-09T09:00:00Z",
            stocktype: "카카오",
        },
        {
            postId: 4,
            title: "4",
            content: "4 카카오게시글! 카카오카카ㅗ오오",
            userName: "사용자6",
            createdAt: "2024-12-09T09:00:00Z",
            stocktype: "카카오",
        }


    ]


    const allPosts = [
        {
            postId: 1,
            title: "1",
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333'
            ],
            content: "주식으로 돈벌래돈벌꺼야!!테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사언제사야이득이야? 알려줘알려줘알려주라고!! ",
            userName: "사용자1",
            createdAt: "2024-12-10T10:00:00Z",
            likes: 10,
            stocktype: "테슬라",
            category: "금융",
            isliked: true
        },
        {
            postId: 2,
            title: "2",
            postImages: [],
            content: "2",
            userName: "사용자5",
            createdAt: "2024-12-09T09:00:00Z",
            likes: 7,
            stocktype: "애플",
            category: "정보기술",
            isliked: false
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
            isliked: false
        },
        {
            postId: 4,
            title: "4",
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333'
            ],
            content: "4 테슬라 언제 오르지?",
            userName: "사용자5",
            createdAt: "2025-01-18T09:00:00Z",
            likes: 7,
            stocktype: "테슬라",
            category: "금융",
            isliked: false
        }
    ];

    const filteredPosts = selectedStockType === "전체"
        ? allPosts
        : allPosts.filter(post => post.stocktype === selectedStockType);

    const POSTOPTIONS = {
        slidesToScroll: 1,
        loop: false,
        // align: 'start',
        draggable: true,
        // containScroll: "keepSnaps",
    };


    return (
        <>
            <div className="px-[2rem] max-w-[128rem] mx-auto">
                <div>
                    <StockTypeBar selectedStockType={selectedStockType} />
                    {selectedStockType === "전체" ? (
                        <div>
                            <div className="flex gap-[1rem] pt-[2rem] items-start">
                                <button onClick={moveToTop5} className="text-[1.4rem] leading-[140%] font-[400] text-[var(--moneed-gray-7)] mr-[1.2rem]">Top 5</button>
                                <button onClick={moveToCategory} className="text-[1.4rem] leading-[140%] font-[400] text-[var(--moneed-gray-7)] mr-[1.2rem]">지금 뜨는 카테고리</button>
                                <button onClick={moveToVote} className="text-[1.4rem] leading-[140%] font-[400] text-[var(--moneed-gray-7)] mr-[1.2rem]">지금 핫한 투표</button>
                                <button onClick={moveToHotPosts} className="text-[1.4rem] leading-[140%] font-[400] text-[var(--moneed-gray-7)]">인기 급상승 게시글</button>
                            </div>
                            <div ref={top5Ref} className="mt-[3.6rem]">
                                <div className="flex items-baseline gap-[.8rem] mb-[1.6rem]">
                                    <h2 className="text-[2.2rem] leading-[145%] font-[700] text-[var(--moneed-black)] lg:text-[2.4rem] lg:leading-[140%]">
                                        Top 5
                                    </h2>
                                    <span className="text-[var(--moneed-gray-7)] text-[1.2rem] font-[400] leading-[135%]">
                                        12월 기준
                                    </span>
                                </div>
                            </div>
                            <PostCarousel slides={topPosts} options={POSTOPTIONS}></PostCarousel>
                            <div ref={categoryRef} className="mt-[2.8rem]">
                                <div className="flex items-baseline gap-[.8rem] mb-[1.8rem]">
                                    <h2 className="text-[2.2rem] leading-[145%] font-[700] text-[var(--moneed-black)] lg:text-[2.4rem] lg:leading-[140%]">
                                        지금 뜨는 카테고리
                                    </h2>
                                    <span className="text-[var(--moneed-gray-7)] text-[1.2rem] font-[400] leading-[135%]">
                                        12월 17일 8시 기준 | 전일종가
                                    </span>
                                </div>
                            </div>
                            <TopCategory></TopCategory>
                            <div ref={voteRef} className="mt-[2.8rem]">
                                <div className="flex items-baseline gap-[.8rem] mb-[1.8rem]">
                                    <h2 className="text-[2.2rem] leading-[145%] font-[700] text-[var(--moneed-black)] lg:text-[2.4rem] lg:leading-[140%]">
                                        지금 핫한 투표
                                    </h2>
                                    <span className="text-[var(--moneed-gray-7)] text-[1.2rem] font-[400] leading-[135%]">
                                        12월 17일 8시 기준
                                    </span>
                                </div>
                            </div>
                            <div className="bg-[var(--moneed-navy)] h-[12rem] rounded-[.8rem] text-center  pt-[4rem]">
                                <span className="text-[2rem] leading-[145%] font-[700] text-[var(--moneed-white)]">comming soon</span>
                            </div>
                            <div ref={hotPostsRef} className="mt-[2.8rem]">
                                <div className="flex items-baseline gap-[.8rem] mb-[1.8rem]">
                                    <h2 className="text-[2.2rem] leading-[145%] font-[700] text-[var(--moneed-black)] lg:text-[2.4rem] lg:leading-[140%]">
                                        인기 급상승 게시글
                                    </h2>
                                </div>
                            </div>
                            <Posts posts={allPosts} />
                        </div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem] mb-[.6rem]">
                                <CompanyInfoBox />
                                <StockInfoBox />
                            </div>
                            <div className="mt-[2.8rem]">
                                <div className="flex items-baseline gap-[.8rem] mb-[1.8rem]">
                                    <h2 className="text-[2.2rem] leading-[145%] font-[700] text-[var(--moneed-black)] lg:text-[2.4rem] lg:leading-[140%]">
                                        투표
                                    </h2>
                                    <span className="text-[var(--moneed-gray-7)] text-[1.2rem] font-[400] leading-[135%]">
                                        12월 17일 8시 기준
                                    </span>
                                </div>
                            </div>
                            <div className="bg-[var(--moneed-navy)] h-[12rem] rounded-[.8rem] text-center  pt-[4rem]">
                                <span className="text-[2rem] leading-[145%] font-[700] text-[var(--moneed-white)]">comming soon</span>
                            </div>
                            <div className="mt-[2.8rem]">
                                <div className="flex items-baseline gap-[.8rem] mb-[1rem]">
                                    <h2 className="text-[2.2rem] leading-[145%] font-[700] text-[var(--moneed-black)] lg:text-[2.4rem] lg:leading-[140%]">
                                        게시글
                                    </h2>
                                </div>
                            </div>
                            <Posts posts={filteredPosts} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Community;
