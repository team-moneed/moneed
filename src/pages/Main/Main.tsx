import StockRank from './StockRank';
import MainShortforms from './MainShortforms';

const Main = () => {
    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">24시간 내 인기콘텐츠</h2>
                <MainShortforms />
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">주요 종목</h2>
                <StockRank />
            </div>

        </div>
    );
};

export default Main;
