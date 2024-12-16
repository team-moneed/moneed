import { useEffect, useState } from "react";
import { CATEGORIES } from "../../config/Categorysetting";
import { useParams } from 'react-router-dom';
import Posts from "./Posts";
import useSearchStore from "../../store/useSearchStore";
import Vote from "../../components/Vote";
import CategoryBar from "../../components/CategoryBar";

const Community = () => {
    const { searchKeyword } = useSearchStore();
    const { category } = useParams();

    const [selectedCategory, setSelectedCategory] = useState(category || "전체");

    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        }
    }, [category]);

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
            category: "테슬라",
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
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333'
            ],
            content: "2",
            userName: "사용자5",
            createdAt: "2024-12-09T09:00:00Z",
            likes: 7,
            category: "애플",
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
            category: "테슬라",
            isliked: false,
            comments: []
        }
    ];

    const filteredPosts = selectedCategory === "전체"
        ? allPosts
        : allPosts.filter(post => post.category === selectedCategory);

    return (
        <div>
            <CategoryBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <div>
                <h2>----투표투표------</h2>
                <Vote />
            </div>
            <div>
                <h2>----게시글------</h2>
                <Posts posts={filteredPosts} />
            </div>
        </div>
    );
};

export default Community;
