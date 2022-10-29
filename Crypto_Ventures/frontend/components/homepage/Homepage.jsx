import React from "react";
import { BtnGreen } from "../shared/Button";

function Homepage() {
  return (
    <div className="w-full flex flex-col">
      <div className="pt-20 relative">
        <img src="svg/homeImg.svg" className="w-full h-auto" alt="..." />
        <div className="absolute w-full top-0 left-0 h-full flex justify-center ">
          <p className="py-4 text-lg mt-48 font-bold ">
            a successful business strategy begins <br /> with discovering the
            right investors
          </p>
        </div>
      </div>
      <div className="w-full py-16">
        <div className="container max-w-5xl mx-auto px-5 flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col items-center mb-16 md:mb-0">
            <h2 className="text-3xl font-semibold">I Want To Invest</h2>
            <p className="text-lg text-center text-black italic py-4 min-h-[8rem]">
              Invest in the equity of <br /> hand-picked startups – powered{" "}
              <br /> by Blockchain
            </p>

            <BtnGreen>Get Started</BtnGreen>
          </div>
          <div className="flex flex-col items-center ">
            <h2 className="text-3xl font-semibold">I own A Startup</h2>
            <p className="text-lg text-center text-black italic py-4 min-h-[8rem]">
              I am searching for investors to <br /> fund my startup
            </p>

            <BtnGreen>Get Started</BtnGreen>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className="container max-w-5xl mx-auto px-5">
          <div className=" p-16 rounded-lg bg-[#ffe6d8] w-full flex justify-center">
            <div className="max-w-lg">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 text-center">
                How it Works?
              </h5>{" "}
              <br />
              <p className="text-gray-700 text-base mb-4 text-center">
                We make it possible for you to unlock your financial freedom! We
                are creating a hospitable environment where creatives and
                investors match with no hassle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
