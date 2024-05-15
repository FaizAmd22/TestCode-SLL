import { IProduct } from "@/interfaces/IProduct"
import { IData, IProducts } from "@/interfaces/IProducts"
import { create } from "zustand"

interface ProductState {
    products: any;
    setProducts: (product: any) => void;
  }
  
  export const useProductStore = create<ProductState>((set) => ({
    products: [],
    setProducts: (product: any) => set({products: product})
  }));