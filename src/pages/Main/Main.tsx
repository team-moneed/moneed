import StockRank from './StockRank';
import MainShortforms from './MainShortforms';
import MainNews from './MainNews';
import TopStockRank from './TopStockRank';

const Main = () => {
    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">주식랭킹</h2>
                <StockRank />
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">top3 종목별게시판</h2>
                <TopStockRank />
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">24시간 내 인기콘텐츠</h2>
                <MainShortforms />
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">실시간 뉴스</h2>
                <MainNews />
            </div>

        </div>
    );
};

export default Main;
