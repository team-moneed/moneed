import Card from "../../components/Card";


const NewsData = [
    {
        cardImgages: "https://example.com/news1.jpg",
        title: "뉴스 제목 1",
        content: "뉴스 내용 1",
        date: "2024-12-22",
    },
    {
        cardImgages: "https://example.com/news2.jpg",
        title: "뉴스 제목 2",
        content: "뉴스 내용 2",
        date: "2024-12-21",
    },
    {
        cardImgages: "https://example.com/news3a.jpg",
        title: "뉴스 제목 3",
        content: "뉴스 내용 3",
        date: "2024-12-20",
    },
];

const MainNews = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NewsData.map((news, index) => (
                <Card
                    key={index}
                    cardImgages={news.cardImgages}
                    title={news.title}
                    content={news.content}
                    date={news.date}
                />
            ))}
        </div>
    );
};

export default MainNews;
