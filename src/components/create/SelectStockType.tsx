import { STOCKTYPES } from "../../config/StockTypesetting";
import useStockTypeStore from "../../store/useStockTypeStore";
import Button from "../Button";
import StockTypeChip from "./StockTypeChip";

const SelectStockType = () => {

    const { selectedStockNames, addStockType, removeStockType } = useStockTypeStore();
    const filteredStockNames = STOCKTYPES.filter(({ stocktype }) => stocktype !== '전체');

    const toggleStockType = (stocktype: string) => {
        if (selectedStockNames.includes(stocktype)) {
            removeStockType(stocktype);
        } else {
            addStockType(stocktype);
        }
    };

    const handlesubmitCategoory = () => {
        console.log('카테고리 제출', selectedStockNames)
    }

    return (
        <>
            <div className="px-[2rem] max-w-[128rem] mx-auto md:bg-[#EFEFF3] md:pt-[4rem]">
                <div className="lg:hidden block fixed top-0 left-0 w-full h-[10rem] bg-white z-[50]"></div>
                <div className="md:max-w-[59.2rem] md:rounded-[2.4rem] md:bg-white md:mx-auto md:pt-[6rem] md:pb-[4rem]">
                    <div className="sticky top-[6rem] bg-white md:bg-[transparent] pb-[3.6rem] md:static">
                        <h2 className="text-[2.4rem] font-[700] leading-[140%] text-[var(--moneed-black)] pt-[6.1rem] md:pt-0 md:text-center">
                            어떤 종목을 선호하시나요?
                        </h2>
                        <p className="text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-7)] md:text-center">
                            *선택된 관심 종목 게시판이 보여집니다.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-[.8rem] md:px-[10.6rem] md:max-h-[calc(38.5rem_-_10rem)] md:overflow-y-auto pb-[12rem]">
                        {filteredStockNames.map(({ stocktype, value }) => (
                            <div key={value} className="mb-[.2rem]">
                                <StockTypeChip
                                    label={stocktype}
                                    icon="/temp/sample3.png"
                                    onClick={() => toggleStockType(stocktype)}
                                    active={selectedStockNames.includes(stocktype)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="bottom-0 fixed left-0 right-0 p-8 z-[100] bg-white md:static md:max-w-[35rem] md:mx-auto md:pb-0">
                        <Button
                            type="submit"
                            theme="primary"
                            textcolor="primary"
                            className="w-full text-[1.6rem] font-[700] leading-[140%] rounded-[1.6rem] px-[1.6rem] py-[1.8rem]"
                            onClick={handlesubmitCategoory}
                        >
                            {selectedStockNames.length}개 선택
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SelectStockType;