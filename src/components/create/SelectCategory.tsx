import { CATEGORIES } from "../../config/Categorysetting";
import useCategoryStore from "../../store/useCategoryStore";
import Button from "../Button";
import Chip from "../Chip";

const SelectCategory = () => {

    const { selectedCategories, addCategory, removeCategory } = useCategoryStore();
    const filteredCategories = CATEGORIES.filter(({ category }) => category !== '전체');

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            removeCategory(category);
        } else {
            addCategory(category);
        }
    };

    const handlesubmitCategoory = () => {
        console.log('카테고리 제출', selectedCategories)
    }

    return (
        <>
            <h2>원하는 카테고리를 선택하세요</h2>
            <div className="flex gap-4 mb-6 overflow-x-auto whitespace-nowrap">

                {filteredCategories.map(({ category, value, stockimg }) => (
                    <Chip
                        key={value}
                        label={category}
                        icon={stockimg}
                        onClick={() => toggleCategory(category)}
                        active={selectedCategories.includes(category)}
                        className="py-[12px] px-[30px] "
                    />
                ))}
            </div>
            <Button type="submit" className="green" theme="primary" onClick={handlesubmitCategoory}>완료</Button>

        </>
    );
};

export default SelectCategory;