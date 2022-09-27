import React from "react";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";
import Brindrajsinh from "../../public/images/team/Brindrajsinh.jpeg";
import Diana from "../../public/images/team/Diana.jpeg";
import Felipe from "../../public/images/team/Felipe.jpeg";
import Gilberts from "../../public/images/team/Gilberts.jpeg";
import Aun from "../../public/images/team/Aun.jpg";
import Image from "next/image";


function Team() {
  return (
    <div className="py-24">
      <h1 className="xl:text-4xl text-3xl text-center text-primary font-extrabold pb-2 sm:w-4/6 w-5/6 mx-auto black-bruno">
        Our Amazing Team
      </h1>
      <p className="text-xl text-center pb-12">The team with a vision.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 px-16 md:px-32">
        {/* card 1 */}
        <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-md rounded-xl ">
          <Image
            src={Aun}
            alt="Sebs"
            className="w-28 h-28 mx-auto rounded-full dark:bg-gray-500 aspect-square hover:scale-110 transition-all duration-200 ease-in-out"
          />
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-md md:text-lg font-semibold ">Aun Shahbaz</h2>
              <p className="px-5 text-xs text-secondary">BLOCKCHAIN DEVELOPER</p>
            </div>
            <div className="flex justify-center pt-2 space-x-4 align-center">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsGithub />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Dribble"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsLinkedin />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsTwitter />
              </a>
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-md rounded-xl">
          <Image
            src={Brindrajsinh}
            alt="Brindrajsinh"
            className="w-28 h-28 mx-auto rounded-full bg-center bg-cover object-contain aspect-square hover:scale-110 transition-all duration-200 ease-in-out"
          />
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-md md:text-lg font-semibold ">
                Brindrajsinh
              </h2>
              <p className="px-5 text-xs text-secondary">
                BLOCKCHAIN DEVELOPER
              </p>
            </div>
            <div className="flex justify-center pt-2 space-x-4 align-center">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsGithub />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Dribble"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsLinkedin />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsTwitter />
              </a>
            </div>
          </div>
        </div>
        {/* card 3 */}
        <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-md rounded-xl">
          <Image
            src={Felipe}
            alt="Felipe"
            className="w-28 h-28 mx-auto rounded-full dark:bg-gray-500 aspect-square hover:scale-110 transition-all duration-200 ease-in-out"
          />
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-md md:text-lg font-semibold ">
                Felipe Montoya
              </h2>
              <p className="px-5 text-xs text-secondary">
                CEO AND BUSINESS DEVELOPER
              </p>
            </div>
            <div className="flex justify-center pt-2 space-x-4 align-center">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsGithub />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Dribble"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsLinkedin />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsTwitter />
              </a>
            </div>
          </div>
        </div>
        {/* card 4 */}
        <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-md rounded-xl ">
          <Image
            src={Gilberts}
            alt="Gilberts"
            className="w-28 h-28 mx-auto rounded-full dark:bg-gray-500 aspect-square hover:scale-110 transition-all duration-200 ease-in-out"
          />
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-md md:text-lg font-semibold ">Gilberts</h2>
              <p className="px-5 text-xs text-secondary">BLOCKCHAIN ENGINEER</p>
            </div>
            <div className="flex justify-center pt-2 space-x-4 align-center">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsGithub />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Dribble"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsLinkedin />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsTwitter />
              </a>
            </div>
          </div>
        </div>
        {/* card 5 */}
        <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-md rounded-xl">
          <Image
            src={Diana}
            alt="Diana"
            className="w-28 h-28 mx-auto rounded-full dark:bg-gray-500 aspect-square hover:scale-110 transition-all duration-200 ease-in-out"
          />
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-md md:text-lg font-semibold ">
                Diana Rincon
              </h2>
              <p className="px-5 text-xs text-secondary">BUSINESS DEVELOPER</p>
            </div>
            <div className="flex justify-center pt-2 space-x-4 align-center">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsGithub />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Dribble"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsLinkedin />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
              >
                <BsTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
