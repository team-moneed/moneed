import {create} from 'zustand';

interface SnackBarState {
  message: string;
  icon?: string;
  position: 'top' | 'bottom';
  type: 'normal' | 'action' | 'cancel';
  isVisible: boolean;
  showSnackBar: (message: string, type: 'normal' | 'action' | 'cancel', position: 'top' | 'bottom', icon?: string) => void;
  hideSnackBar: () => void;
}

const useSnackBarStore = create<SnackBarState>((set) => ({
  message: '',
  icon: undefined,
  position: 'bottom',
  type: 'normal',
  isVisible: false,
  showSnackBar: (message, type, position, icon) => set({ isVisible: true,message, type, position, icon }),
  hideSnackBar: () => set({ isVisible: false }),
}));

export default useSnackBarStore;