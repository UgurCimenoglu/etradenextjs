import { create } from "zustand";

interface SideBarToggle {
  isOpen: boolean;
  openSideBar: (open: boolean) => void;
}

const useSidebarToggleStore = create<SideBarToggle>()((set) => ({
  isOpen: false,
  openSideBar: (value) => set((state) => ({ isOpen: value })),
}));

export default useSidebarToggleStore;
