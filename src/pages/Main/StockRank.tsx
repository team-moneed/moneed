import { useState } from "react";
import Chip from "../../components/Chip";
import { GROUPS } from "../../config/GroupSetting";


const StockRank = () => {
    const [selectedGroup, setSelectedGroup] = useState(GROUPS[0].group);

    const Stocks = [
        {
            name: "테슬라",
            englishName: "Tesla",
            category: "유틸리티",
            group: "해외",
            stock: "+3.5",
            image: "/images/tesla.png",
            priceKRW: "4,200,000",
            priceUSD: "3,500"
        },
        {
            name: "하이닉스",
            englishName: "SK Hynix",
            category: "에너지",
            stock: "-5",
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
            stock: "+4.8",
            image: "/images/apple.png",
            priceKRW: "1,500,000",
            priceUSD: "1,150"
        },
        {
            name: "카카오",
            englishName: "Kakao",
            category: "게임",
            stock: "-4.8",
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
                    <div
                        key={stock.name}
                        className="rounded-lg p-4 bg-white flex items-center">
                        <img
                            src={stock.image}
                            alt={stock.name}
                            className="w-12 h-12 object-cover rounded-full mr-4"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{stock.name} <span className="text-sm text-gray-500">{stock.englishName}</span></h3>
                                <p
                                    className={`text-xl font-bold ${stock.stock.includes("+") ? "text-green-500" : "text-red-500"}`}>
                                    {stock.stock}%
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-gray-600">₩ {stock.priceKRW}</span>
                                <span className="text-gray-600">${stock.priceUSD}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockRank;
