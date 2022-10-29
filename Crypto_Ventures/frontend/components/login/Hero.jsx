import React from "react";
//import { FaGoogle } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { BtnPrimary } from "../shared/Button";

const Hero = () => {
  return (
    <div className=" min-h-screen  bg-center bg-cover custom-img">
      {/* Overlay */}
      <div className="p-5 text-[#4b006f]   w-full">
        <div className="container max-w-6xl mx-auto">
          <p className="py-4 mt-14 text-lg ">
            a successful business strategy begins <br /> with discovering the
            right investors
          </p>
          <form className="bg-transparent shadow-sm rounded  pt-4 pb-4 mb-4 max-w-sm">
            <div className="mb-4">
              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="username"
              >
                <h2>Sign Up</h2>
              </label>{" "}
              <br />
              <input
                className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-2">
              <input
                className="shadow appearance-none border bg-white border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter Password"
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center w-full justify-between">
              <div className=""></div>
              <a
                className="inline-block align-baseline text-sm text-black hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <BtnPrimary onClick={() => alert("pressed")}>Sign in</BtnPrimary>
            <br />
            <div className="flex flex-col justify-between">
              <div className="">Already have an account ?</div>
              <a
                className="inline-block align-baseline text-sm text-black hover:text-blue-800"
                href="#"
              >
                Login Here
              </a>
            </div>
          </form>
          <div className="flex items-center  w-fit justify-between bg-transparent">
            <li className="block mx-4 px-4 py-1 bg-white">
              <FcGoogle size={20} />
            </li>
            <li className="block mx-4  px-4 py-1 bg-white text-black">
              <BsApple size={20} />
            </li>
            <li className="block mx-4  px-4 py-1 bg-white text-blue-600">
              <BsFacebook size={20} />
            </li>
          </div>
          <div className="flex items-center w-fit justify-between pt-3 text-black">
            <div className="block mr-5">
              <RiCheckboxCircleLine size={40} />
            </div>
            <p>
              By signing up you agree to receive <br /> updates and special
              offers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
