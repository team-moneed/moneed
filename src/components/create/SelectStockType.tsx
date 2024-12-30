import { STOCKTYPES } from "../../config/StockTypesetting";
import useStockTypeStore from "../../store/useStockTypeStore";
import Button from "../Button";
import Chip from "../Chip";
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
            <div className="px-[2rem] max-w-[128rem] mx-auto">
                <h2 className="text-[2.4rem] font-[700] leading-[140%] text-[var(--moneed-black)]  mt-[6.1rem]">어떤 종목을 선호하시나요?</h2>
                <span className="text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-7)]" >*선택된 관심 종목 게시판이 보여집니다.</span>

                <div className="flex flex-wrap gap-[.8rem] mt-[3.7rem] overflow-y-auto max-h-[24]">
                    {filteredStockNames.map(({ stocktype, value, stockimg }) => (
                        <div
                            key={value}
                            className="mb-[.2rem]"
                        >
                            <StockTypeChip
                                label={stocktype}
                                icon="/src/assets/temp/sample3.png"
                                onClick={() => toggleStockType(stocktype)}
                                active={selectedStockNames.includes(stocktype)}
                            />
                        </div>
                    ))}
                </div>
                <Button type="submit" theme="primary" textcolor="primary"
                    className="bottom-[1.9rem] absolute text-[1.6rem] font-[700] leading-[140%] rounded-[1.6rem] px-[15.1rem] py-[1.8rem]" onClick={handlesubmitCategoory}>{selectedStockNames.length}개 선택</Button>
            </div>
        </>
    );
};

export default SelectStockType;