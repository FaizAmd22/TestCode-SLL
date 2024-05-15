import { ApiPost } from "@/api";
import { useOpenModalStore } from "@/store/useOpenModal";
import { useProductStore } from "@/store/useProductStore";
import { useThemeDarkStore } from "@/store/useThemeDark";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import * as Swal from "sweetalert2";

const DetailModal = () => {
  const closeModal = useOpenModalStore((x) => x.setModal);
  const setProduct = useProductStore((x) => x.setProducts);
  const dataProduct = useProductStore((x) => x.products);
  const theme = useThemeDarkStore((x) => x.themes);
    const token = sessionStorage.getItem("token");
    const router = useRouter()

  const handleClose = () => {
    closeModal(false);
    setProduct([]);
    };
    
    const handleUpdate = () => {
        closeModal(false)
        router.push("/update")
    }

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure wanna delete?",
      background: "#2b2b2b",
      color: "white",
      showCancelButton: true,
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          ApiPost.delete(`/species/${dataProduct.id}`);

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            background: "#2b2b2b",
            color: "white",
            showConfirmButton: false,
          });
          // console.log("response :", response);

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          // console.log(error.response.data.message)
          Swal.fire({
            icon: "error",
            title: "Cannot delete!",
            background: "#2b2b2b",
            color: "white",
            showConfirmButton: false,
          });
        }
      }
    });
    };

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center">
      <a
        onClick={handleClose}
        className={`w-full h-screen cursor-default fixed opacity-80 ${
          theme ? "bg-maindark" : "bg-main"
        }`}
      />
      <div
        className={`w-[60%] capitalize text-center p-5 rounded-lg relative grid grid-cols-2 gap-5 ${
          theme ? "bg-lightcard" : "bg-darkcard"
        }`}
      >
        <div className="col-span-2 md:col-span-1 h-[200px] md:h-[420px]">
          <Image
            src={
              dataProduct.imageUrl == "NULL"
                ? "https://i.pinimg.com/564x/a6/d4/2a/a6d42ac7f4942b5e3b412bfd55387fed.jpg"
                : dataProduct.imageUrl
            }
            width={200}
            height={0}
            alt="image"
            style={{ width: "100%", height: "100%", borderRadius: "20px" }}
          />
        </div>

        <div className="col-span-2 md:col-span-1 h-auto text-sm md:text-xl flex flex-col text-start justify-center items-start">
          <div>
            <h1>Indonesian Name : {dataProduct.indonesianName}</h1>
            <h1>English Name : {dataProduct.englishName}</h1>
            <h1>Scientific Name : {dataProduct.scientificName}</h1>
            <h1>Local Name : {dataProduct.localName}</h1>
            <h1>Type of Fish : {dataProduct.typeOfFish}</h1>
            <h1>Type Of Water : {dataProduct.typeOfWater}</h1>
            <h1>Fao Code : {dataProduct.faoCode}</h1>
            <h1>Status in Indonesia : {dataProduct.statusInIndonesia}</h1>
            <h1>Fish Utilization : {dataProduct.fishUtilization}</h1>
          </div>

          {token && (
            <div className="grid grid-cols-2 mt-10 w-[100%] text-center">
              <div className="col-span-1">
                <button onClick={handleUpdate} className="bg-darkfont text-lightfont px-[50px] mb-[10px] hover:bg-second">
                  edit
                </button>
              </div>
              <div className="col-span-1">
                <button onClick={handleDelete} className="font-bold px-[50px]">delete</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
