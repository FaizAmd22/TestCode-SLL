import { create } from "zustand"

interface PaginationState {
    pagination: number
    isPagination : boolean
    setPagination: (paginations: number) => void
    setIsPagination: (paginations: boolean) => void
}

export const usePaginationStore = create<PaginationState>((set) => ({
    pagination: 1,
    isPagination: true,
    setPagination: (paginations: number) => set({pagination: paginations}),
    setIsPagination: (paginations: boolean) => set({isPagination: paginations})
}))