
import { useNavigate, Outlet } from "react-router-dom";
import MypageBox from "../../components/Mypage/MypageBox";
import MyStockBox from "../../components/Mypage/MyStockBox";

const Mypage = () => {

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


    let navigate = useNavigate();
    const movetoMyProfile = () => {
        navigate(`/myprofile`);
    }

    const movetoMyPost = () => {
        navigate(`/mypost`);
    }

    const movetoMyComment = () => {
        navigate(`/mycomment`);
    }

    return (
        <>
            <div className="px-[2rem] max-w-[128rem] mx-auto">
                <div className="lg:flex lg:gap-[2.4rem] lg:mt-[1.6rem]">
                    <div className="space-y-[1.6rem] lg:w-[40%]">
                        <div className="p-[1.6rem] justify-center items-center rounded-[1.6rem] border border-solid border-[var(--moneed-gray-5)]">
                            <div className="flex justify-center">
                                <div className="rounded-full overflow-hidden aspect-[1/1] w-[5.6rem]">
                                    <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="flex gap-[1rem] justify-center items-center">
                                <div className="text-[2rem] my-[.8rem] font-[700] leading-[145%] text-[var(--moneed-brand-color)]">
                                    내가본나의 피드
                                </div>
                                <div className="aspect-[1/1] w-[2.4rem] cursor-pointer" onClick={movetoMyProfile}>
                                    <img src="/src/assets/icon/icon-setting.svg" alt="" className="w-full h-full" />
                                </div>
                            </div>
                            <div className="text-center text-[1.4rem] font-[400] leading-[145%] text-[var(--moneed-gray-7)]">
                                연동된 계정: 카카오
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-[1.6rem] pb-[1.6rem]">
                            <MypageBox
                                menu="내가 작성한 게시글"
                                count={5}
                                onClick={movetoMyPost}
                            ></MypageBox>
                            <MypageBox
                                menu="내가 작성한 댓글"
                                count={7}
                                onClick={movetoMyComment}
                            ></MypageBox>
                        </div>
                    </div>
                    <div className="p-[1.6rem] justify-center items-center rounded-[1.6rem] border border-solid bg-[var(--moneed-black-3)] border-[var(--moneed-gray-5)] lg:w-[60%]">
                        <div className="flex mb-[1.6rem] justify-between">
                            <div className="text-[2rem] font-[600] leading-[140%]">
                                내가 선택한 종목
                            </div>
                            <div className="aspect-[1/1] w-[2.4rem]">
                                <img src="/src/assets/icon/icon-addcircle.svg" alt="" className="w-full h-full" />
                            </div>
                        </div>
                        <div className="space-y-[.8rem]">
                            {stockData.map((stock, index) => (
                                <MyStockBox
                                    key={index}
                                    infoBoxImgages={stock.infoBoxImgages}
                                    name={stock.name}
                                    priceUSD={stock.priceUSD}
                                    rate={stock.rate}
                                    englishName={stock.englishName}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mypage;
