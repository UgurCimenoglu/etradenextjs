import { create, StateCreator } from "zustand";

type ThemeType = "dark" | "light";

interface ThemeState {
  theme: "dark" | "light";
  changeTheme: (theme: ThemeType) => void;
}

const useThemeStore = create<ThemeState>()((set) => ({
  theme: "light",
  changeTheme: (theme) => set((state) => ({ theme: theme })),
}));

export default useThemeStore;
