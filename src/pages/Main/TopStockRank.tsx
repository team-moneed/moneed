import StockInfoBox from "../../components/StockInfoBox";
import { useNavigate } from "react-router-dom";

const TopStockRank = () => {

    const Stocks = [
        {
            name: "테슬라",
            englishName: "Tesla",
            category: "유틸리티",
            group: "해외",
            rate: "+3.5",
            image: "/images/tesla.png",
            priceKRW: "4,200,000",
            priceUSD: "3,500"
        },
        {
            name: "카카오",
            englishName: "Kakao",
            category: "게임",
            rate: "-4.8",
            group: "국내",
            image: "/images/apple.png",
            priceKRW: "100,000",
            priceUSD: "80"
        },
    ]

    let navigate = useNavigate();
    const movecommunity = (stockname) => {
        navigate(`/community/${stockname}`);
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                {Stocks.map((stock) => (
                    <StockInfoBox
                        infoBoxImgages={stock.image}
                        name={stock.name}
                        priceKRW={stock.priceKRW}
                        priceUSD={stock.priceUSD}
                        rate={stock.rate}
                        englishName={stock.englishName}
                        onClick={() => movecommunity(stock.name)}
                    ></StockInfoBox>
                ))}
            </div>
        </>
    );
};

export default TopStockRank;