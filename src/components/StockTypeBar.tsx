
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
        <>
            <div className="relative">
                <div className="flex gap-4 mb-6 overflow-x-auto whitespace-nowrap">
                    <Chip
                        label="+"
                        onClick={movetoSelectStockType}
                    ></Chip>
                    {STOCKTYPES.map(({ stocktype, StockTypeId }) => (
                        <Chip
                            key={stocktype}
                            label={stocktype}
                            active={selectedStockType === stocktype}
                            className="py-[12px] px-[24px] "
                            // onClick={() => setSelectedStockType(stocktype)}
                            onClick={() => movetoStockType(stocktype)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default StockTypeBar;