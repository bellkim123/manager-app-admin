import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  // 데스크탑 사이드바 상태
  isOpen: boolean;
  isHovered: boolean;
  // 모바일 사이드바 상태
  isMobileOpen: boolean;
  // 데스크탑 액션
  toggle: () => void;
  open: () => void;
  close: () => void;
  setHovered: (hovered: boolean) => void;
  // 모바일 액션
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      // 데스크탑 상태
      isOpen: true,
      isHovered: false,
      // 모바일 상태 (persist 제외 - 아래 partialize에서 처리)
      isMobileOpen: false,
      // 데스크탑 액션
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setHovered: (hovered) => set({ isHovered: hovered }),
      // 모바일 액션
      openMobile: () => set({ isMobileOpen: true }),
      closeMobile: () => set({ isMobileOpen: false }),
      toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
    }),
    {
      name: 'sidebar-storage',
      partialize: (state) => ({
        isOpen: state.isOpen,
      }),
    }
  )
);
