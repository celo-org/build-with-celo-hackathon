import React from "react";
import Link from "next/link";
import Image from "next/image";
import Mobiles from "../../public/images/MobileBanner.png";

function Hero() {
  return (
    <div className="flex flex-col lg:flex-row px-16 lg:px-32 my-12 ">
      <div className="w-full lg:w-1/2 my-auto block lg:hidden">
        <Image src={Mobiles} alt="Mobiles" />
      </div>
      <div className="w-full lg:w-1/2 my-auto text-center lg:text-left">
        {/* <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
          DeFI Application
        </h2>
        <h5 className="text-xl md:text-2xl font-medium text-secondary py-8">
          With Decentralized Stablecoins Pools and Forms
        </h5> */}
        <div className="max-w-lg px-4 pt-24 py-8 mx-auto text-left md:max-w-none md:text-center">
          <h1 className="text-4xl font-extrabold leading-10 tracking-tight lg:text-left text-white text-center sm:leading-none md:text-6xl lg:text-7xl">
            <span className="block py-1">Helpi Finance</span>
            <span className="text-2xl md:text-4xl xl:text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-green-500 md:inline-block">
              Serving unbanked population with
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyon-400 to-purple-300">
                {" "}
                efficient and cheap fees
              </span>{" "}
            </span>
          </h1>
          <div className="mx-auto rounded-lg font-black mt-5 text-zinc-400 md:mt-12 text-center lg:text-lg lg:text-left">
            <Link href="/swap">
              <button className="border text-sm text-white py-3 px-7 rounded-full hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-primary-dark">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 hidden lg:block">
        <Image src={Mobiles} alt="Mobiles" />
      </div>
    </div>
  );
}

export default Hero;
