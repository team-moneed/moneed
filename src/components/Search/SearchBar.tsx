import useSearchStore from "../../store/useSearchStore";
import Button from "../Button";
import Input from "../Input";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";
import { STOCKTYPES } from "../../config/StockTypesetting";

const SearchBar = () => {

    const StockTypeBar = STOCKTYPES.map((stocktype) => stocktype.stocktype)

    const { searchKeyword, setSearchKeyword } = useSearchStore();

    let navigate = useNavigate();
    const handleSearch = (keyword) => {
        setSearchKeyword(keyword)
        navigate(`/community`, {
            state: {
                isStockTypeSearch: StockTypeBar.includes(searchKeyword.trim())
            },
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    return (
        <>
            <Input
                type="text"
                onChange={handleInputChange}
                className="border-2"
                placeholder="검색어 입력"
                value={searchKeyword}
            />
            <Button type="submit" className="green" theme="primary" onClick={() => handleSearch(searchKeyword)}>
                완료
            </Button>
            {searchKeyword && <SearchResult></SearchResult>}
        </>
    );
};

export default SearchBar;
