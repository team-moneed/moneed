import { create } from "zustand";

const useSearchStore = create((set) => ({
    searchKeyword: "", 
    setSearchKeyword: (keyword: string) =>
        set(() => ({
            searchKeyword: keyword, 
        })),
}));

export default useSearchStore;
