/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CardItem from "@/components/cardItem";
import DetailModal from "@/components/detailModal";
import Filter from "@/components/filter";
import Pagination from "@/components/pagination";
import { useGetProducts } from "@/hook/useGetProducts";
import { usefilterStore } from "@/store/useFilter";
import { useOpenModalStore } from "@/store/useOpenModal";
import { usePaginationStore } from "@/store/usePagination";
import { useProductStore } from "@/store/useProductStore";
import { useThemeDarkStore } from "@/store/useThemeDark";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Tippy from "@tippyjs/react";

export default function Home() {
  const theme = useThemeDarkStore((state) => state.themes);
  const setProduct = useProductStore((x) => x.setProducts);
  const setModal = useOpenModalStore((x) => x.setModal);
  const isModal = useOpenModalStore((x) => x.modal);
  const { isLoading, dataProducts } = useGetProducts();
  const filtered = usefilterStore((x) => x.filtered);
  const setFiltered = usefilterStore((x) => x.setFiltered);
  const isPagination = usePaginationStore((x) => x.isPagination);
  const token = sessionStorage.getItem("token");
  const router = useRouter();

  useEffect(() => {
    setFiltered(dataProducts);
  }, []);

  const handleOpen = (data: any) => {
    setProduct(data);
    setModal(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");

    toast.success("Success add product!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="xl:px-24 md:px-10 px-5 py-14" style={{ width: "100%" }}>
      <div className="flex justify-between">
        <div className="flex gap-5 items-center mb-6">
          <h1 className="text-4xl font-bold">Products</h1>
          {token && (
            <Tippy content="Add Product" placement="right">
              <button
                type="button"
                className="text-2xl font-bold bg-darkfont text-lightfont w-9 h-9 flex justify-center items-center rounded-full"
                onClick={() => router.push("/product")}
              >
                <FaPlus />
              </button>
            </Tippy>
          )}
        </div>

        {token && (
          <div>
            <button
              onClick={handleLogout}
              className="md:mr-7 py-3 px-10 rounded-full bg-darkfont text-lightfont font-bold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <Filter />

      {isModal && <DetailModal />}
      <div
        className="grid 2xl:grid-cols-3 grid-cols-2 gap-20 mt-7 md:pr-5 pt-4 pb-9 overflow-y-auto"
        style={{ height: "64vh", scrollbarWidth: "thin" }}
      >
        {filtered.map((data: any, index: number) => {
          return (
            <button
              onClick={() => handleOpen(data)}
              className="col-span-1"
              key={index}
            >
              <CardItem data={data} />
            </button>
          );
        })}
      </div>

      {isPagination && <Pagination />}
      <ToastContainer />
    </div>
  );
}
