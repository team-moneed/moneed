
import { useNavigate } from "react-router-dom";

import { CATEGORIES } from "../config/Categorysetting";
import useCategoryStore from "../store/useCategoryStore";
import Chip from "./Chip";

const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {

    //선택한 카테고리만 보이게
    const { selectedCategories } = useCategoryStore();

    let navigate = useNavigate();
    const movetoSelectCategory = () => {
        navigate(`/selectCategory`);
    }

    const movetoCategory = (category) => {
        navigate(`/community/${category}`);
    }

    return (
        <>
            <div className="relative">
                <div className="flex gap-4 mb-6 overflow-x-auto whitespace-nowrap">
                    <Chip
                        label="+"
                        onClick={movetoSelectCategory}
                    ></Chip>
                    {CATEGORIES.map(({ category, categoryId }) => (
                        <Chip
                            key={category}
                            label={category}
                            active={selectedCategory === category}
                            className="py-[12px] px-[24px] "
                            // onClick={() => setSelectedCategory(category)}
                            onClick={() => movetoCategory(category)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CategoryBar;