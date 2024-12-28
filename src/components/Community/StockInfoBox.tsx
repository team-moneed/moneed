import { ReactNode } from "react";

type StockInfoProps = {
    infoBoxImgages?: string[] | string;
    name?: string;
    priceKRW?: string;
    priceUSD?: string;
    rate?: string;
    children?: ReactNode;
    className?: string;
    englishName?: string;
};

const StockInfoBox = ({ infoBoxImgages, name, priceKRW, priceUSD, rate, children, className, englishName }: StockInfoProps) => {
    return (
        <>
            <div className="">
                <div className="rounded-full overflow-hidden aspect-[1/1] w-[3.6rem] mr-[.6rem]">
                    <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="">
                    <h3 className="text-[1.4rem] font-[600] leading-[140%] text-[var(--moneed-black)]">유나이티드헬스</h3>
                    <span className="text-[1.2rem] font-[400] leading-[135%] text-[var(--moneed-gray-8)]">LLY|헬스케어</span>
                </div>
                <div className="">
                    <span className="">$504.99</span>
                </div>
                <div>
                    16.3%
                </div>
            </div>
            {children}
        </>
    );
};

export default StockInfoBox;