import Api, { ApiPost } from "@/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormAdd = () => {
  const [faoCode, setFaoCode] = useState<string>("");
  const [typeOfFish, setTypeOfFish] = useState<string>("");
  const [scientificName, setScientificName] = useState<string>("");
  const [englishName, setEnglishName] = useState<string>("");
  const [indonesianName, setIndonesianName] = useState<string>("");
  const [localName, setLocalName] = useState<string>("");
  const [typeOfWater, setTypeOfWater] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [statusInIndonesia, setStatusInIndonesia] = useState<string>("");
  const [fishUtilization, setFishUtilization] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestingData = {
      faoCode,
      typeOfFish,
      scientificName,
      englishName,
      indonesianName,
      localName,
      typeOfWater,
      imageUrl,
      statusInIndonesia,
      fishUtilization,
    };

    try {
      const response = await ApiPost.post("/species", requestingData);
      console.log(response);
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
        router.push("/");
      }, 1000);
    } catch (error: any) {
      toast.error(error.response.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[100%]">
      <div className="flex w-[100%] gap-10">
        <div className="w-[50%] text-center">
          <div className="mb-10">
            <label
              htmlFor="faoCode"
              className="block text-sm font-medium text-gray-700"
            >
              Fao Code
            </label>
            <input
              type="text"
              id="faoCode"
              className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
              value={faoCode}
              onChange={(e) => setFaoCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="typeOfFish"
              className="block text-sm font-medium text-gray-700"
            >
              Type of Fish
            </label>
            <input
              type="text"
              id="typeOfFish"
              className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
              value={typeOfFish}
              onChange={(e) => setTypeOfFish(e.target.value)}
              required
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="scientificName"
              className="block text-sm font-medium text-gray-700"
            >
              Scientific Name
            </label>
            <input
              type="text"
              id="scientificName"
              className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
              value={scientificName}
              onChange={(e) => setScientificName(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="englishName"
              className="block text-sm font-medium text-gray-700"
            >
              English Name
            </label>
            <input
              type="text"
              id="englishName"
              className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
              value={englishName}
              onChange={(e) => setEnglishName(e.target.value)}
              required
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="indonesianName"
              className="block text-sm font-medium text-gray-700"
            >
              Indonesian Name
            </label>
            <input
              type="text"
              id="indonesianName"
              className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
              value={indonesianName}
              onChange={(e) => setIndonesianName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="w-[50%] text-center">
          <div className="mb-10">
            <label
              htmlFor="localName"
              className="block text-sm font-medium text-gray-700"
            >
              Local Name
            </label>
            <input
              type="text"
              id="localName"
              className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="typeOfWater"
              className="block text-sm font-medium text-gray-700"
            >
              Type of Water
            </label>
            <input
              type="text"
              id="typeOfWater"
              className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
              value={typeOfWater}
              onChange={(e) => setTypeOfWater(e.target.value)}
              required
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="statusInIndonesia"
              className="block text-sm font-medium text-gray-700"
            >
              Status in Indonesia
            </label>
            <input
              type="text"
              id="statusInIndonesia"
              className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
              value={statusInIndonesia}
              onChange={(e) => setStatusInIndonesia(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="fishUtilization"
              className="block text-sm font-medium text-gray-700"
            >
              Fish Utilization
            </label>
            <input
              type="text"
              id="fishUtilization"
              className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
              value={fishUtilization}
              onChange={(e) => setFishUtilization(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
      <ToastContainer />
    </form>
  );
};

export default FormAdd;
