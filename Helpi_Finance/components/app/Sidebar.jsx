import React from "react";
import Logo from "../../public/icons/logo.png";
import { BsStopwatch, BsLayersFill, BsCurrencyExchange } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { AiOutlineSwap } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

function Sidebar() {
  return (
    <div id="view" className="h-full w-full flex flex-row">
      <button className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden">
        <svg
          className="w-5 h-5 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        id="sidebar"
        className="bg-primary-dull border border-primary-light h-[calc(100vh-2rem)] md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 rounded-xl overflow-x-hidden transition-transform duration-300 ease-in-out"
        x-show="sidenav"
      >
        <div className="space-y-6 md:space-y-10 mt-10">
          <div id="profile" className="space-y-3">
            <div className="flex justify-center">
              <Image
                src={Logo}
                alt="Avatar user"
                width="64"
                height="64"
                className="w-10 md:w-16"
              />
            </div>

            <div>
              <h2 className="font-medium md:font-semibold text-lg md:text-xl text-center bg-clip-text text-transparent bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple">
                Helpi Finance
              </h2>
            </div>
          </div>
          {/* <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
            <input
              type="text"
              className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
              placeholder="Search"
            />
            <button className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block">
              <svg
                className="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div> */}
          <hr className="text-secondary bg-secondary" />
          <div id="menu" className="flex flex-col space-y-2">
            {/* Swap */}
            <Link href="/swap">
              <div className="flex items-center text-md font-medium text-secondary py-2 px-2 hover:text-primary-dull hover:text-base hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-md transition-all duration-150 ease-in-out cursor-pointer">
                <AiOutlineSwap className="mr-2" />
                <span className="">Swapping</span>
              </div>
            </Link>
            {/* Staking */}
            <Link href="/stake">
              <div className="flex items-center text-md font-medium text-secondary py-2 px-2 hover:text-primary-dull hover:text-base hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-md transition-all duration-150 ease-in-out cursor-pointer">
                <BsLayersFill className="mr-2" />
                <span className="">Staking</span>
              </div>
            </Link>
            {/* Vasting */}
            <Link href="/vesting">
              <div className="flex items-center text-md font-medium text-secondary py-2 px-2 hover:text-primary-dull hover:text-base hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-md transition-all duration-150 ease-in-out cursor-pointer">
                <BsStopwatch className="mr-2" />
                <span className="">Vesting</span>
              </div>
            </Link>
            {/* Bonds */}
            {/* <Link href="/bonds">
              <div className="flex items-center text-md font-medium text-secondary py-2 px-2 hover:text-primary-dull hover:text-base hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-md transition-all duration-150 ease-in-out cursor-pointer">
                <BsBank2 className="mr-2" />
                <span className="">Bonds</span>
              </div>
            </Link> */}
            {/* Fund Transfer */}
            <Link href="/buy-token">
              <div className="flex items-center text-md font-medium text-secondary py-2 px-2 hover:text-primary-dull hover:text-base hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-md transition-all duration-150 ease-in-out cursor-pointer">
                <BsCurrencyExchange className="mr-2" />
                <span className="">Buy Token</span>
              </div>
            </Link>
          </div>
          <div>
            <h3 className="mb-6">Links</h3>
            {/* Landing */}
            <Link href="/">
              <div className="flex items-center text-md font-medium text-secondary py-2 px-2 hover:text-primary-dull hover:text-base hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-md transition-all duration-150 ease-in-out cursor-pointer">
                <BiHome className="mr-2" />
                <span className="">Landing Page</span>
              </div>
            </Link>
            {/* Contribution */}
            <Link href="/contribute">
              <div className="flex items-center text-md font-medium text-secondary py-2 px-2 hover:text-primary-dull hover:text-base hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-md transition-all duration-150 ease-in-out cursor-pointer">
                <FaHandshake className="mr-2" />
                <span className="">Contribute</span>
              </div>
            </Link>
            {/* Paper */}
            <Link href="/white-paper">
              <div className="flex items-center text-md font-medium text-secondary py-2 px-2 hover:text-primary-dull hover:text-base hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-md transition-all duration-150 ease-in-out cursor-pointer">
                <HiOutlineDocumentText className="mr-2" />
                <span className="">WhitePaper</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
