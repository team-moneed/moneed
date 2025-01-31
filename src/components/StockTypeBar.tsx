import { useNavigate } from "react-router-dom";

import { STOCKTYPES } from "../config/StockTypesetting";
import Chip from "./Chip";

type StockTypeBar = {
    selectedStockType: string
}

const StockTypeBar = ({ selectedStockType }: StockTypeBar) => {

    //선택한 카테고리만 보이게

    const navigate = useNavigate();
    const movetoSelectStockType = () => {
        navigate(`/selectStockType`);
    }

    const movetoStockType = (stocktype: string) => {
        navigate(`/community/${stocktype}`);
    }

    return (
        <div className="relative">
            <div className="flex gap-4 mb-6 overflow-x-auto whitespace-nowrap">
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
