import { create } from "zustand";

const useLevelStore = create((set) => ({
    selectedLevel: "", 
    setSelectLevel: (level: string) =>
        set(() => ({
            selectedLevel: level, 
        })),
}));

export default useLevelStore;
