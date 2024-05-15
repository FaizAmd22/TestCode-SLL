/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useThemeDarkStore } from "@/store/useThemeDark";
import FormLogin from "./components/formLogin";

const Cpanel = () => {
  const router = useRouter();
  const token = sessionStorage.getItem("token");
  const theme = useThemeDarkStore((x) => x.themes);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  }, []);

  return (
    <>
      {token ? (
        <div>Loading...</div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
          <div
            className={` p-8 rounded-lg shadow-md w-full max-w-md ${
              theme ? "bg-lightcard" : "bg-darkcard"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <FormLogin />
          </div>
        </div>
      )}
    </>
  );
};

export default Cpanel;
