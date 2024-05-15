import { usePaginationStore } from "@/store/usePagination";
import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowRightDoubleFill } from "react-icons/ri";

const Pagination = () => {
  const setPagination = usePaginationStore((x) => x.setPagination);
  const pagination = usePaginationStore((x) => x.pagination);
  const dataPagination = [1, 2, 3, 4];

  return (
    <div className="w-full flex justify-end items-center mt-10 pr-4">
      <button
        onClick={() => setPagination(dataPagination[0])}
        className="text-2xl w-[50px] h-[30px] rounded-full"
      >
        <RiArrowLeftDoubleFill />
      </button>
      <button disabled={pagination == 1} onClick={() => setPagination(pagination - 1)} className="text-2xl w-[50px] h-[30px] rounded-full">
        <MdOutlineKeyboardArrowLeft />
      </button>
      {dataPagination.map((data: any, index: number) => {
        return (
          <button
            key={index}
            onClick={() => setPagination(data)}
            className={`${pagination == data && "bg-darkfont"} ${
              pagination == data && "text-lightfont"
            } ${
                pagination == data && "font-semibold"
              } w-[50px] h-[30px] rounded-full text-xl`}
          >
            {data}
          </button>
        );
      })}
      <button disabled={pagination == 4} onClick={() => setPagination(pagination + 1)} className="text-2xl w-[50px] h-[30px] rounded-full">
        <MdOutlineKeyboardArrowRight />
      </button>
      <button
        onClick={() => setPagination(dataPagination.length)}
        className="text-2xl w-[50px] h-[30px] rounded-full"
      >
        <RiArrowRightDoubleFill />
      </button>
    </div>
  );
};

export default Pagination;
