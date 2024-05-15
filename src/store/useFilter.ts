import { IProduct } from "@/interfaces/IProduct"
import { create } from "zustand"

interface Filtered {
    filtered: IProduct[]
    setFiltered: (filter: IProduct[]) => void
}

export const usefilterStore = create<Filtered>((set) => ({
    filtered: [],
    setFiltered: (filter: IProduct[]) => set({filtered: filter})
}))