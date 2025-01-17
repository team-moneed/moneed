import { create } from 'zustand';

interface IsEditingState {
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;
}

export const useIsEditingStore = create<IsEditingState>((set) => ({
    isEditing: false,  
    setIsEditing: (editing) => set({ isEditing: editing }), 
}));
