import { ReactNode } from "react";

type StockInfoProps = {
    categoryData: {}
    onClick: () => void;
    children?: ReactNode;
    className?: string;
    index: number;
};

const CategoryRankBox = ({ categoryData, onClick, children, className, index }: StockInfoProps) => {
    return (
        <>

            <div className="bg-[var(--moneed-black-3)] border-[var(--moneed-gray-5)] border-[.1rem] rounded-[1.6rem]">
                <div className="flex shrink-0 justify-between items-center">
                    <div className="flex-col flex p-[1rem] rounded-[1.6rem] w-[4rem] h-[4rem] shrink-0 justify-center items-center bg-[var(--moneed-black)]">
                        <div className="font-[700] leading-[140%] text-[1.4rem] text-[var(--moneed-white)]">
                            {index + 1}위
                        </div>
                    </div>
                    <div className="font-[600] leading-[140%] text-[1.6rem] text-[var(--moneed-black)] mt-[1.2rem]">
                        {categoryData.categoryName}
                    </div>
                    <div className="font-[700] leading-[140%] text-[1.6rem] mr-[2.8rem] mt-[1.2rem] text-[var(--moneed-black)] tracking-[0.02rem]">
                        {categoryData.rate}
                    </div>
                </div>
                <div className="flex my-[1rem] mx-[6.8rem] rounded-[1.2rem] border-solid border-[var(--moneed-gray-5)] gap-[1rem] bg-[var(--moneed-white)] items-center justify-center">
                    <div className="rounded-full overflow-hidden aspect-[1/1] w-[1.6rem]">
                        <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-[400] leading-[140%] text-[1.4rem] text-[var(--moneed-black)]">
                        {categoryData.stock.company}
                    </span>
                    <div className="px-[.3rem] py-[.8rem] justify-center items-center gap-[1rem] inline-flex">
                        <span className="py-[.3rem] px-[.8rem] font-[400] leading-[140%] text-[1rem] text-[var(--moneed-gray-8)] tracking-[0.02rem] rounded-[.6rem] border border-solid border-[var(--moneed-gray-8)]">
                            {categoryData.stock.englishName}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryRankBox;