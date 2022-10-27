import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  const scrollHandler = () => {
    if (window.scrollY >= 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);
  return (
    <div
      className={`fixed left-0 top-0 w-full z-10 ease-in duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent "
      } `}
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-[#4b006f]">
        <Link href="/">
          <h1 className="font-bold text-2xl">Crypto ventures</h1>
        </Link>
        <ul className="hidden sm:flex">
          <li className="p-4">
            <Link href="/">Home</Link>
          </li>
          <li className="p-4">
            <Link href="/startups">Startups</Link>
          </li>
          <li className="p-4">
            <Link href="/funding">Funding</Link>
          </li>
          <li className="p-4">
            <Link href="/login"> Login </Link>
          </li>
        </ul>
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose
              size={20}
              style={{ color: nav ? "white" : "#4b006f" }}
            />
          ) : (
            <AiOutlineMenu
              size={20}
              style={{ color: nav ? "white" : "#4b006f" }}
            />
          )}
        </div>
        <div
          className={`sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full ${
            nav ? "h-screen bg-black" : "h-0 bg-transparent"
          }  text-center ease-out duration-300`}
        >
          {nav && (
            <ul>
              <li className="p-4 text-4xl hover:text-grey-500">
                <Link href="/homepage"> Home </Link>
              </li>
              <li className="p-4 text-4xl hover:text-grey-500">
                <Link href="/startups">Startups</Link>
              </li>
              <li className="p-4 text-4xl hover:text-grey-500">
                <Link href="/funding">Funding</Link>
              </li>
              <li className="p-4 text-4xl hover:text-grey-500">
                <Link href="/hero"> Login </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
