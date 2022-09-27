import React from "react";
import { TiGroup } from "react-icons/ti";

function OurMission() {
  return (
    <div className="mt-24 md:flex xl:px-16 px-12 py-20 2xl:mx-auto 2xl:container relative z-40">
      <div className="relative lg:w-1/2 sm:w-96 xl:h-96 h-80">
        <img
          src="https://i.ibb.co/4g1D9cv/imgslider1.png"
          alt="profile"
          className="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded"
        />
        <div className="w-32 md:flex hidden items-center justify-center absolute top-0 -mr-16 -mt-14 right-0 h-32 bg-primary-dull text-secondary rounded-full">
          <TiGroup className="text-5xl"/>
        </div>
      </div>
      <div className="md:w-1/3 lg:w-1/3 xl:ml-32 md:ml-20 md:mt-0 mt-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold xl:leading-loose text-gray-300">
            Our Mission
          </h1>
          <p className="text-base font-medium leading-6 mt-4 text-gray-400">
            We are a Decentralized protocol that allows users an easy access to
            the DeFi space by allowing them to use fiat-based currencies for
            day-to-day exchanges and cross-border remittances. The protocol is
            equiped with vesting capabilities allowing users to withdraw their
            rewards in a periodic manner rather than a massive cash-out format.
            <br />
            <br />
            Our platform also allows users to send money to their families and
            friends in other countries directly in their native currency
            removing the double conversion process and conversion fees.
          </p>
        </div>
        <div className="md:mt-4 mt-8">
          <p className="text-base font-medium leading-4 text-secondary">
            Felipe Montoya
          </p>
          <p className="text-base leading-4 mt-2 mb-4 text-gray-400">
            CEO and Business Developer
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurMission;
