"use client";

import { ApiPost } from "@/api";
import { IData } from "@/interfaces/IProducts";
import { useThemeDarkStore } from "@/store/useThemeDark";
import Image from "next/image";
import React from "react";

const CardItem = (data: IData) => {
  const theme = useThemeDarkStore((x) => x.themes);
  const token = sessionStorage.getItem("token");

  const { englishName, indonesianName, imageUrl } = data.data;
  console.log(imageUrl);


  return (
    <div
      className={`${
        theme ? "bg-lightcard" : "bg-darkcard"
      } w-auto flex flex-col md:flex-row gap-5 rounded-2xl shadow-xl h-[320px] md:h-[220px] text-center items-center md:text-start`}
    >
      <div className="h-[150px] md:h-[220px]">
        <Image
          src={
            imageUrl == "NULL"
              ? "https://i.pinimg.com/564x/a6/d4/2a/a6d42ac7f4942b5e3b412bfd55387fed.jpg"
              : imageUrl
          }
          width={200}
          height={0}
          alt="image"
          style={{ height: "100%" }}
        />
      </div>

      <div className="w-[60%] h-[110px] pr-3 flex flex-col justify-center items-center text-center ">
        <h1>
          {indonesianName} ({englishName})
        </h1>
      </div>
    </div>
  );
};

export default CardItem;
