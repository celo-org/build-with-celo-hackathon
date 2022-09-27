import React from "react";
import {
  BsStopwatch,
  BsLayersFill,
  BsCurrencyExchange,
} from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BiHome } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { AiOutlineSwap } from "react-icons/ai";
import CustomConnectButton from "../utils/ConnectButton";
import Link from "next/link";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  return (
    <>
      <div className="bg-primary-dull border border-primary-light flex justify-between rounded-xl py-4 px-4 sm:px-4">
        <div className="flex items-center">
          {/* mobile menu icon */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple text-primary-dark text-sm font-semibold p-1.5 rounded-md"
            >
              <HiOutlineMenuAlt3 className="text-xl font-extrabold" />
            </button>
          </div>
        </div>
        <div>
          <CustomConnectButton />
          {/* <ConnectButton /> */}
        </div>
      </div>
      {isNavOpen && (
        <div className="bg-primary-dull border border-primary-light rounded-xl p-4 mt-4">
          <ul>
            <Link href="/swap">
              <li className="bg-primary-light hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-primary-dark rounded-md flex justify-between items-center font-medium cursor-pointer py-3 px-4 mb-3">
                <span>Swapping</span>
                <AiOutlineSwap className="text-xl" />
              </li>
            </Link>
            <Link href="/stake">
              <li className="bg-primary-light hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-primary-dark rounded-md flex justify-between items-center font-medium cursor-pointer py-3 px-4 mb-3">
                <span>Staking</span>
                <BsLayersFill className="text-xl" />
              </li>
            </Link>
            <Link href="/vesting">
              <li className="bg-primary-light hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-primary-dark rounded-md flex justify-between items-center font-medium cursor-pointer py-3 px-4 mb-3">
                <span>Vesting</span>
                <BsStopwatch className="text-xl" />
              </li>
            </Link>
            {/* <Link href="/bonds">
              <li className="bg-primary-light hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-primary-dark rounded-md flex justify-between items-center font-medium cursor-pointer py-3 px-4 mb-3">
                <span>Bonds</span>
                <BsBank2 className="text-xl" />
              </li>
            </Link> */}
            <Link href="/buy-token">
              <li className="bg-primary-light hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-primary-dark rounded-md flex justify-between items-center font-medium cursor-pointer py-3 px-4 mb-3">
                <span>Buy Token</span>
                <BsCurrencyExchange className="text-xl" />
              </li>
            </Link>
            <Link href="/contribute">
              <li className="bg-primary-light hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-primary-dark rounded-md flex justify-between items-center font-medium cursor-pointer py-3 px-4 mb-3">
                <span>Contribute</span>
                <FaHandshake className="text-xl" />
              </li>
            </Link>
            <Link href="/white-paper">
              <li className="bg-primary-light hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-primary-dark rounded-md flex justify-between items-center font-medium cursor-pointer py-3 px-4 mb-3">
                <span>WhitePaper</span>
                <HiOutlineDocumentText className="text-xl" />
              </li>
            </Link>
            <Link href="/">
              <li className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple text-primary-dark rounded-md flex justify-between items-center font-medium cursor-pointer py-3 px-4">
                <span>Landing Page</span>
                <BiHome className="inline text-xl" />
              </li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
