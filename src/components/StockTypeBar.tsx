import { useNavigate } from "react-router-dom";

import { STOCKTYPES } from "../config/StockTypesetting";
import useStockTypeStore from "../store/useStockTypeStore";
import Chip from "./Chip";

const StockTypeBar = ({ selectedStockType, setSelectedStockType }) => {

    //선택한 카테고리만 보이게
    const { selectedStockNames } = useStockTypeStore();

    let navigate = useNavigate();
    const movetoSelectStockType = () => {
        navigate(`/selectStockType`);
    }

    const movetoStockType = (stocktype) => {
        navigate(`/community/${stocktype}`);
    }

    return (
        <div className="relative">
            <div className="flex gap-4 mb-6 overflow-x-auto whitespace-nowrap sm:scrollbar-hide">
                <Chip
                    label="+"
                    onClick={movetoSelectStockType}
                />
                {STOCKTYPES.map(({ stocktype, StockTypeId }) => (
                    <Chip
                        key={StockTypeId}
                        label={stocktype}
                        active={selectedStockType === stocktype}
                        className="py-[12px] px-[24px]"
                        onClick={() => movetoStockType(stocktype)}
                    />
                ))}
            </div>
        </div>
    );
};

export default StockTypeBar;
