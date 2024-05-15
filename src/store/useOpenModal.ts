import { create } from "zustand"

interface OpenModalState {
    modal: boolean
    setModal: (modals: boolean) => void
}

export const useOpenModalStore = create<OpenModalState>((set) => ({
    modal: false,
    setModal: (modals: boolean) => set({modal: modals})
}))