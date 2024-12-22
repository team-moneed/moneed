import { create } from "zustand";

const useStockTypeStore = create((set) => ({
    selectedStockNames: [],
    addStockType: (stocktype) =>
        set((state) => {
            if (state.selectedStockNames.length >= 10) return state; 
            return {
                selectedStockNames: [...state.selectedStockNames, stocktype], 
            };
        }),
    removeStockType: (stocktype) =>
        set((state) => ({
            selectedStockNames: state.selectedStockNames.filter(
                (selectedStockType) => selectedStockType !== stocktype 
            ),
        })),
}));

export default useStockTypeStore;
