import { STOCKTYPES } from "../../config/StockTypesetting";
import useStockTypeStore from "../../store/useStockTypeStore";
import Button from "../Button";
import Chip from "../Chip";

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
            <h2>원하는 카테고리를 선택하세요</h2>
            <div className="flex gap-4 mb-6 overflow-x-auto whitespace-nowrap">

                {filteredStockNames.map(({ stocktype, value, stockimg }) => (
                    <Chip
                        key={value}
                        label={stocktype}
                        icon={stockimg}
                        onClick={() => toggleStockType(stocktype)}
                        active={selectedStockNames.includes(stocktype)}
                        className="py-[12px] px-[30px] "
                    />
                ))}
            </div>
            <Button type="submit" className="green" theme="primary" onClick={handlesubmitCategoory}>완료</Button>

        </>
    );
};

export default SelectStockType;