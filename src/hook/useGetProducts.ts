/* eslint-disable react-hooks/exhaustive-deps */
import Api from "@/api"
import { IProduct } from "@/interfaces/IProduct";
import { usefilterStore } from "@/store/useFilter";
import { usePaginationStore } from "@/store/usePagination";
import { useProductStore } from "@/store/useProductStore";
import { useEffect, useState } from "react";

export const useGetProducts = () => {
    const setProducts = useProductStore((state) => state.setProducts)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataProducts, setDataProducts] = useState<IProduct[]>([])
    const setFiltered = usefilterStore((x) => x.setFiltered)
    const pagination = usePaginationStore((x) => x.pagination)


    const fetchProducts = async () => {
        try {
            const response = await Api.get(`/species?pageNumber=${pagination}&pageSize=10`);
            const data = response.data.data;
            console.log("data :", data);
            setProducts(data)
            setDataProducts(data)
            setFiltered(data)
        } catch (error) {
            console.log("Something went wrong when getting data!", error);
        }
    };

    useEffect(() => {
        setIsLoading(true);

        fetchProducts()
    
        setIsLoading(false);
      }, [pagination]);

    return {
        dataProducts,
        isLoading
    };
};
