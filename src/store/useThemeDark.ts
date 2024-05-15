import { create } from "zustand"

interface ThemeStateDark {
    themes: boolean
    setThemes: (theme: boolean) => void
}

export const useThemeDarkStore = create<ThemeStateDark>((set) => ({
    themes: true,
    setThemes: (theme: boolean) => set({themes: theme})
}))