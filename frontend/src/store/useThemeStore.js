import { create } from 'zustand'

export const useThemeStore = create((set) => ({
theme:localStorage.getItem("synctalk-theme") || "Coffee",
setTheme: (theme) => {
    localStorage.setItem("synctalk-theme", theme);
    set({ theme });
}
  
  
}));