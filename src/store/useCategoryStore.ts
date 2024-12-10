import {create} from 'zustand';

const useCategoryStore = create((set)=>({
    selectedCategories : [],
    

}))

export default useCategoryStore