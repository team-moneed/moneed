import { useState } from "react";
import Chip from "../../components/Chip";
import StockInfoBox from "../../components/StockInfoBox";
import { GROUPS } from "../../config/GroupSetting";


const StockRank = () => {
    const [selectedGroup, setSelectedGroup] = useState(GROUPS[0].group);

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
            name: "하이닉스",
            englishName: "SK Hynix",
            category: "에너지",
            rate: "-5",
            group: "국내",
            image: "/images/sk-hynix.png",
            priceKRW: "140,000",
            priceUSD: "110"
        },
        {
            name: "애플",
            englishName: "Apple",
            category: "에너지",
            group: "해외",
            rate: "+4.8",
            image: "/images/apple.png",
            priceKRW: "1,500,000",
            priceUSD: "1,150"
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
    ];

    const filteredGroup = Stocks.filter((stock) => stock.group === selectedGroup);

    return (
        <div className="p-6">
            <div className="relative">
                <div className="flex gap-4 mb-6 overflow-x-auto whitespace-nowrap">
                    {GROUPS.map(({ group }) => (
                        <Chip
                            className="py-[12px] px-[24px] "
                            key={group}
                            label={group}
                            active={selectedGroup === group}
                            onClick={() => setSelectedGroup(group)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {filteredGroup.map((stock) => (
                    <StockInfoBox
                        infoBoxImgages={stock.image}
                        name={stock.name}
                        priceKRW={stock.priceKRW}
                        priceUSD={stock.priceUSD}
                        rate={stock.rate}
                        englishName={stock.englishName}
                    ></StockInfoBox>
                ))}
            </div>
        </div>
    );
};

export default StockRank;
