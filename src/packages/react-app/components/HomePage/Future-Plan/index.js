import React from "react";
import Image from "next/image";
import { futurePlans } from "../../../data";

const FuturePlan = () => {
  return (
    <div className="future-plan flex justify-center items-center py-20 px-8 md:px-10 lg:px-14">
      <div className="future-plan-img">
        {" "}
        <img src="/images/FuturePlan/outline.png" />
      </div>
      <div className="mobile-future-plan">
        <h1 className="text-[white] font-bold text-xl text-center">
          Our Future Plans
        </h1>
        <div className="text-center my-10">
          <Image src="/images/Footer/Logo.png" width={80} height={80} />
        </div>
        <ul className=" list-disc">
          {futurePlans.map((plan, index) => (
            <li key={index} className="my-5">
              {plan.text}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FuturePlan;
