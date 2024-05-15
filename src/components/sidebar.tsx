"use client";
import { useThemeDarkStore } from "@/store/useThemeDark";
import React from "react";
import { MdLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const theme = useThemeDarkStore((state) => state.themes);
  const setTheme = useThemeDarkStore((state) => state.setThemes);

  return (
    <div
      className={`${theme ? "bg-main" : "bg-maindark"} ${
        theme ? "text-darkfont" : "text-lightfont"
      } h-screen flex`}
      style={{ width: "100%" }}
    >
      <div
        className={`${
          theme ? "bg-second" : "bg-seconddark"
        } h-screen flex justify-center ${
          theme ? "text-lightfont" : "text-darkfont"
        } w-[10%]`}
        style={{ borderRadius: "0px 60px 0px 0px" }}
      >
        <button className="w-full text-xl md:text-5xl md:ml-[-20px] flex justify-center items-center" onClick={() => setTheme(!theme)}>
          {theme ? <MdLightMode /> : <MdNightlightRound />}
        </button>
      </div>

      <main className="h-screen w-[100%] md:w-[90%]">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
