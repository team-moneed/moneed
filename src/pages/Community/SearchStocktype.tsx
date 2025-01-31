import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyStockBox from '../../components/Mypage/MyStockBox';
import Hangul from 'hangul-js';

const SearchStocktype = () => {
    const navigate = useNavigate();
    const [searchStockType, setsearchStockType] = useState("");

    const selectStocktype = (stocktype: string) => {
        navigate(`/writepost/${stocktype}`);
    };

    const stockData = [
        {
            infoBoxImgages: "",
            name: "애플",
            priceUSD: "$173.45",
            rate: "2.5%",
            englishName: "Apple",
        },
        {
            infoBoxImgages: "",
            name: "구글",
            priceUSD: "$2723.56",
            rate: "-1.3%",
            englishName: "Google",
        },
        {
            infoBoxImgages: "",
            name: "마이크로소프트",
            priceUSD: "$312.65",
            rate: "0.8%",
            englishName: "Microsoft",
        },
        {
            infoBoxImgages: "/src/assets/temp/sample4.png",
            name: "테슬라",
            priceUSD: "$998.75",
            rate: "4.2%",
            englishName: "Tesla",
        },
        {
            infoBoxImgages: "",
            name: "아마존",
            priceUSD: "$3476.55",
            rate: "-0.4%",
            englishName: "Amazon",
        },
        {
            infoBoxImgages: "",
            name: "유나이티드헬스",
            priceUSD: "$504.99",
            rate: "16.3%",
            englishName: "UnitedHealth",
        },
        {
            infoBoxImgages: "",
            name: "페이스북",
            priceUSD: "$328.54",
            rate: "1.1%",
            englishName: "Facebook",
        },
        {
            infoBoxImgages: "",
            name: "알리바바",
            priceUSD: "$145.32",
            rate: "-3.2%",
            englishName: "Alibaba",
        },
        {
            infoBoxImgages: "",
            name: "삼성전자",
            priceUSD: "$50.12",
            rate: "0.5%",
            englishName: "Samsung",
        },
        {
            infoBoxImgages: "",
            name: "넷플릭스",
            priceUSD: "$612.99",
            rate: "-2.1%",
            englishName: "Netflix",
        },
    ];


    const getInitialConsonant = (str: string) => {
        return Hangul.d(str)
            .map((char: string) => char.charAt(0))
            .join('');
    };

    const filteredStockData = stockData.filter(item => {
        if (!searchStockType) {
            return true;
        }

        console.log(Hangul.disassemble(item.name).includes(Hangul.disassemble(searchStockType)))

        return (item.name.toLowerCase().includes(searchStockType) ||
            getInitialConsonant(item.name).includes(getInitialConsonant(searchStockType)))
    });

    return (
        <>
            <div className="px-[2rem] max-w-[128rem] mx-auto">
                <div className="relative">
                    <img
                        src="/src/assets/icon/icon-search.svg"
                        alt="search icon"
                        className="absolute left-[1rem] top-[50%] transform -translate-y-[50%] w-[1.6rem] h-[1.6rem]"
                    />
                    <input
                        type="text"
                        placeholder="게시판 종목을 검색 해 주세요."
                        value={searchStockType}
                        onChange={(e) => setsearchStockType(e.target.value)}
                        className="pl-[3rem] pr-[1rem] py-[.8rem] w-full border border-solid border-[var(--moneed-gray-5)] bg-[var(--moneed-black-3)] rounded-[1.6rem] text-[1.6rem] text-[var(--moneed-gray-7)]"
                    />
                </div>
                <div className="text-[1.6rem] font-[600] leading-[140%] pb-[1rem] pt-[2.2rem]">
                    나의 선호 종목 [10]개
                </div>
                <div className="px-[2.4rem] py-[.8rem]">
                    {filteredStockData.map((item) => (
                        <MyStockBox
                            key={item.name}
                            onClick={() => selectStocktype(item.name)}
                            className=""
                            isSelectCategory={true}
                            name={item.name}
                        >
                        </MyStockBox>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchStocktype;
