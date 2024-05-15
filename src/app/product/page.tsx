"use client";

import React, { useEffect } from "react";
import FormAdd from "./components/formAdd";
import { useThemeDarkStore } from "@/store/useThemeDark";
import { useRouter } from "next/navigation";

const Product = () => {
  const router = useRouter();
  const token = sessionStorage.getItem("token");
  const theme = useThemeDarkStore((x) => x.themes);

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  }, []);

  return (
    <>
      {!token ? (
        <div>Loading...</div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
          <div
            className={`w-[70%] p-8 rounded-lg shadow-md flex flex-col justify-center items-center ${
              theme ? "bg-lightcard" : "bg-darkcard"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">Add Update</h2>
            <FormAdd />
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
