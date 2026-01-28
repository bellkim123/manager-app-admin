import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isOpen: boolean;
  isHovered: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  setHovered: (hovered: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: true,
      isHovered: false,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setHovered: (hovered) => set({ isHovered: hovered }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
);
