import { CATEGORIES } from "../../config/Categorysetting";
import useSearchStore from "../../store/useSearchStore";
import { useNavigate } from "react-router-dom";

const SearchResult = () => {

    const { searchKeyword, setSearchKeyword } = useSearchStore();

    const categoryList = CATEGORIES.map((category) => category.category)

    let navigate = useNavigate();
    const handlemoveKeywordPosts = (keyword) => {
        setSearchKeyword(keyword)
        navigate(`/community`, {
            state: {
                isCategorySearch: categoryList.includes(searchKeyword.trim())
            },
        });
    }

    return (
        <>
            {categoryList.includes(searchKeyword.trim()) &&
                <>
                    <div>
                        {searchKeyword}
                    </div>
                    <button onClick={() => handlemoveKeywordPosts(searchKeyword.trim())}>
                        커뮤니티로 이동
                    </button>
                </>}
        </>
    );
};

export default SearchResult;