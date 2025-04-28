import { STOCKTYPES } from '../../config/StockTypesetting';
import useSearchStore from '../../store/useSearchStore';
import { useNavigate } from 'react-router-dom';

const SearchResult = () => {
    const { searchKeyword, setSearchKeyword } = useSearchStore();

    const StockTypeBar = STOCKTYPES.map(stocktype => stocktype.stocktype);

    const navigate = useNavigate();
    const handlemoveKeywordPosts = (keyword: string) => {
        setSearchKeyword(keyword);
        navigate(`/community/${keyword}`);
        setSearchKeyword('');
    };

    return (
        <>
            {StockTypeBar.includes(searchKeyword.trim()) && (
                <>
                    <div>{searchKeyword}</div>
                    <button onClick={() => handlemoveKeywordPosts(searchKeyword.trim())}>커뮤니티로 이동</button>
                </>
            )}
        </>
    );
};

export default SearchResult;
