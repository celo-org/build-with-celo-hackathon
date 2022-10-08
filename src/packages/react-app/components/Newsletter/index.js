import React from "react";
import Image from "next/image";

const Newsletter = () => {
  return (
    <div className="md:flex px-5 md:px-10 py-14 justify-between items-center">
      <div className="basis-1/2 md:pr-5">
        <h1 className="md:text-2xl lg:text-4xl text-2xl font-bold">Receive updates on our development, new features, and impact analysis.</h1>
        <div className="flex flex-col lg:flex-row lg:justify-between mt:3 md:mt-5 lg:items-center">
          <input className="bg-[#F5F5F4] p-5 lg:basis-1/2 my-3 lg:my-0" placeholder="Enter your email address here"/>
          <button className="bg-primary text-sm py-3 px-5 rounded-3xl md:mr-5 mb-10 lg:mb-0">Subscribe Now</button>
        </div>
      </div>
      <Image src="/images/Newsletter/img.png" width={550} height={236} />
    </div>
  );
};

export default Newsletter;
