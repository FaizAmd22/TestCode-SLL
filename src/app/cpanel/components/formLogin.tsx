import Api from "@/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const FormLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestingData = { username, password };

    try {
      const response = await Api.post("/auth/login", requestingData);

      const token = response.data.accessToken;

      sessionStorage.setItem("token", token);

      toast.success("Login Success!", {
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
      toast.error(
        password.length < 8
          ? error.response.data.errors.Password[0]
          : error.response.data,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
    }
  };

  const toggleShowPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsShow(!isShow);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-10">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <div className="flex justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <button
            className="px-5 text-lg flex justify-center items-center"
            onClick={toggleShowPassword}
          >
            {isShow ? <BiHide /> : <BiShowAlt />}
          </button>
        </div>
        <input
          type={isShow ? "text" : "password"}
          id="password"
          className="mt-1 p-2 w-full rounded-md shadow-sm sm:text-sm text-darkfont"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Login
      </button>
      <ToastContainer />
    </form>
  );
};

export default FormLogin;
