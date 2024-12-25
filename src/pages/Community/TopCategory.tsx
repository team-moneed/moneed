import StockInfoBox from "../../components/Community/StockInfoBox";

const TopCategory = () => {

    const stockCategories = [
        {
            category: "정보기술",
            popularStocks: [
                { name: "테슬라", priceIncreaseRate: "12.5", img: "png", priceKRW: "1000", priceUSD: "33" },
                { name: "마이크로소프트", priceIncreaseRate: "8.3", img: "png" },
                { name: "애플", priceIncreaseRate: "5.7", img: "png" },
                { name: "엔비디아", priceIncreaseRate: "15.2", img: "png" },
                { name: "삼성전자", priceIncreaseRate: "3.9", img: "png" },
            ],
        },
        {
            category: "금융",
            popularStocks: [
                { name: "애플", priceIncreaseRate: "5.7", img: "png" },
                { name: "골드만삭스", priceIncreaseRate: "2.4", img: "png" },
                { name: "JP모건", priceIncreaseRate: "4.1", img: "png" },
                { name: "뱅크오브아메리카", priceIncreaseRate: "3.2", img: "png" },
                { name: "모건스탠리", priceIncreaseRate: "1.9", img: "png" },
            ],
        }
    ]

    return (
        <>
            <div className="p-4">
                {stockCategories.map((categoryData, index) => {
                    return (
                        <div key={categoryData.category} className="mb-6">
                            <h3 className="text-lg font-bold mb-2">
                                {index + 1}위 {categoryData.category}
                            </h3>
                            <div>
                                {
                                    categoryData.popularStocks.map((popularstock) => (
                                        <StockInfoBox
                                            infoBoxImgages={popularstock.img}
                                            name={popularstock.name}
                                            rate={popularstock.priceIncreaseRate}
                                        ></StockInfoBox>
                                    ))
                                }
                            </div>
                        </div>
                    );
                })}
            </div>

        </>
    );
};

export default TopCategory;