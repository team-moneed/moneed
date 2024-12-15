import { create } from "zustand";

const useCategoryStore = create((set) => ({
    selectedCategories: [],
    addCategory: (category) =>
        set((state) => {
            if (state.selectedCategories.length >= 10) return state; 
            return {
                selectedCategories: [...state.selectedCategories, category], 
            };
        }),
    removeCategory: (category) =>
        set((state) => ({
            selectedCategories: state.selectedCategories.filter(
                (selectedCategory) => selectedCategory !== category 
            ),
        })),
}));

export default useCategoryStore;
