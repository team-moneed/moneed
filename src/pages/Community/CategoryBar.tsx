import { useState } from "react";
import Chip from "../../components/Chip";
import { STOCKS } from "../../config/Stocksetting";

const CategoryBar = () => {

    const [selectedStock, setSelectedStock] = useState(STOCKS[0].stockname);
    return (
        <div>
            <button>+</button>
            <div className="relative">
                <div className="flex gap-4 mb-6 overflow-x-auto whitespace-nowrap">
                    {STOCKS.map(({ stockname, value }) => (
                        <Chip
                            key={value}
                            label={stockname}
                            active={selectedStock === stockname}
                            onClick={() => setSelectedStock(stockname)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryBar;