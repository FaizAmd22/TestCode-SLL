import { useThemeDarkStore } from "@/store/useThemeDark";
import React, { useState } from "react";
import { MdOutlineTune } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import UseFilterProduct from "@/hook/useFilterProduct";
import { usePaginationStore } from "@/store/usePagination";

const Filter = () => {
  const theme = useThemeDarkStore((x) => x.themes);
  const [isFilter, setIsFilter] = useState(false);
  const { uniqueData, isLoading, setFilters } = UseFilterProduct();
  const [selectedFilters, setSelectedFilters] = useState({
    typeFish: "",
    status: "",
    util: "",
    search: "",
  });

  const setPagination = usePaginationStore((x) => x.setPagination);

  const handleFilterChange = (e: any, filterType: any) => {
    const value = e.target.value;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setSelectedFilters((prevFilters) => ({ ...prevFilters, search: value }));
    setFilters((prevFilters) => ({ ...prevFilters, search: value }));
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      typeFish: "",
      status: "",
      util: "",
      search: selectedFilters.search,
    });
    setFilters({
      typeFish: null,
      status: null,
      util: null,
      search: selectedFilters.search,
    });

    setPagination(1);
  };

  return (
    <div className="flex justify-between items-center w-[98%]">
      <div
        className="rounded-full h-11 shadow-lg flex items-center gap-3 px-5 w-[95%]"
        style={{ backgroundColor: "white" }}
      >
        <p className="text-2xl text-darkfont">
          <CiSearch />
        </p>
        <input
          placeholder="search here"
          className="h-10 w-full focus:outline-none focus:border-transparent"
          value={selectedFilters.search}
          onChange={handleSearchChange}
        />
      </div>

      <button
        onClick={() => setIsFilter(!isFilter)}
        className={`${theme ? "bg-second" : "bg-seconddark"} ${
          theme ? "text-lightfont" : "text-darkfont"
        } w-14 h-14 rounded-full flex justify-center items-center text-2xl shadow-lg ml-4`}
      >
        <MdOutlineTune />
      </button>

      {isFilter && (
        <div
          className="fixed top-48 right-12 w-56 max-h-[65vh] overflow-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <button
            onClick={handleResetFilters}
            className="w-[100%] py-2 bg-second text-lightfont font-bold"
          >
            Default
          </button>

          <div className="p-4 bg-lightcard text-darkfont">
            <h3 className="font-bold mb-2">Type of Fish</h3>
            <select
              onChange={(e) => handleFilterChange(e, "typeFish")}
              className="w-full mb-4 p-2 border rounded"
              value={selectedFilters.typeFish}
            >
              <option value="">All</option>
              {[...uniqueData.typeFish].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <h3 className="font-bold mb-2">Status</h3>
            <select
              onChange={(e) => handleFilterChange(e, "status")}
              className="w-full mb-4 p-2 border rounded"
              value={selectedFilters.status}
            >
              <option value="">All</option>
              {[...uniqueData.status].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <h3 className="font-bold mb-2">Utilization</h3>
            <select
              onChange={(e) => handleFilterChange(e, "util")}
              className="w-full mb-4 p-2 border rounded"
              value={selectedFilters.util}
            >
              <option value="">All</option>
              {[...uniqueData.util].map((util) => (
                <option key={util} value={util}>
                  {util}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
