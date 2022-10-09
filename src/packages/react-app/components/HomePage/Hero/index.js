import React from "react";
import { heroText } from "../../../data";

const Hero = () => {
  return (
    <div className="bg-ash py-8 px-5 md:px-10 lg:px-14 md:flex justify-between items-center">
      <div className="basis-1/2">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold">
          {heroText.heading}
        </h1>
        <p className=" my-8 md:text-base lg:text-lg">{heroText.paragraph}</p>
        <button className="bg-primary text-sm py-2 px-5 rounded-3xl" id="hero-cta">
          {heroText.buttonText}
        </button>
        <p className="text-xs font-light mt-5">
          {heroText.subText} <span className="font-semibold">Learn More</span>
        </p>
      </div>
      <div className="px-5 mt-10 md:mt-0">
        {" "}
        <img src="/images/Hero/Image.png" width={600} height={580} />
      </div>
    </div>
  );
};

export default Hero;
