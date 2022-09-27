import React from "react";
import {
  BsFacebook,
  BsTwitter,
  // BsGithub,
  // BsFileEarmarkCode,
} from "react-icons/bs";
import { IoIosRocket } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { SiGitbook } from "react-icons/si";
import Logo from "../../public/icons/logo.png";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  return (
    <>
      <div className="bg-primary-dull border border-primary-light flex justify-between rounded-xl py-4 px-4 sm:px-8 m-4">
        <div className="flex items-center">
          {/* <h3 className="text-xl uppercase font-bold mr-4">Helpi</h3> */}
          <Image width="48" height="48" src={Logo} alt="Helpi" className="w-12 h-12 mr-4" />
          {/* <span className="hidden sm:flex items-center cursor-pointer text-md">
            <BsFileEarmarkCode className="" />
            Code
          </span> */}
        </div>
        <div className="hidden sm:flex items-center">
          <ul>
            <li className="inline">
              <BsFacebook className="inline text-xl mr-4" />
            </li>
            <li className="inline">
              <BsTwitter className="inline text-xl mr-4" />
            </li>
            <li className="inline">
              <SiGitbook className="inline text-2xl mr-8" />
            </li>
          </ul>
          <Link href="/swap">
            <button className="flex items-center bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple text-primary-dark text-sm font-semibold px-6 py-1.5 rounded-md">
              <IoIosRocket className="mr-1" /> LAUNCH APP
            </button>
          </Link>
        </div>
        {/* mobile menu icon */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple text-primary-dark text-sm font-semibold p-1.5 rounded-md"
          >
            <HiOutlineMenuAlt3 className="text-xl font-extrabold" />
          </button>
        </div>
      </div>
      {isNavOpen && (
        <div className="bg-primary-dull border border-primary-light rounded-xl p-4 m-4">
          <ul>
            {/* <li className="bg-primary-light rounded-md flex justify-between items-center font-medium cursor-pointer py-2 px-4 mb-2">
              <span>Code</span>
              <BsFileEarmarkCode className="text-xl" />
            </li> */}
            <li className="bg-primary-light rounded-md flex justify-between items-center font-medium cursor-pointer py-2 px-4 mb-2">
              <span>Share on Facebook</span>
              <BsFacebook className="inline text-xl" />
            </li>
            <li className="bg-primary-light rounded-md flex justify-between items-center font-medium cursor-pointer py-2 px-4 mb-2">
              <span>Share on Twitter</span>
              <BsTwitter className="inline text-xl" />
            </li>
            <li className="bg-primary-light rounded-md flex justify-between items-center font-medium cursor-pointer py-2 px-4 mb-2">
              <span>Star on Gitbook</span>
              <SiGitbook className="inline text-2xl" />
            </li>
            <Link href="/swap">
              <li className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple text-primary-dark rounded-md flex justify-between items-center font-medium cursor-pointer py-2 px-4">
                <span>LAUNCH APP</span>
                <IoIosRocket className="inline text-xl" />
              </li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
