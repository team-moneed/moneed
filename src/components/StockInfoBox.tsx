import { ReactNode } from "react";

type StockInfoProps = {
    infoBoxImgages: string[] | string;
    name?: string;
    priceKRW?: string;
    priceUSD?: string;
    rate?: string;
    onClick: () => void;
    children?: ReactNode;
    className?: string;
    englishName?: string;
};

const StockInfoBox = ({ infoBoxImgages, name, priceKRW, priceUSD, rate, onClick, children, className, englishName }: StockInfoProps) => {
    return (
        <>
            <div onClick={onClick}
                className="rounded-lg p-4 bg-white flex items-center ">
                <img
                    src={infoBoxImgages}
                    alt={name}
                    className="w-12 h-12 object-cover rounded-full mr-4"
                />
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{name} <span className="text-sm text-gray-500">{englishName}</span></h3>
                        <p>
                            {rate}%
                        </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600">₩ {priceKRW}</span>
                        <span className="text-gray-600">${priceUSD}</span>
                    </div>
                </div>
                {children}
            </div>
        </>
    );
};

export default StockInfoBox;