import React from "react";
import { stats } from "../../../data";

const Stats = () => {
  return (
    <div className="bg-[#FBD981] py-14 px-5 md:px-10 lg:px-14">
      <h1 className="text-center text-2xl md:text-4xl font-bold">{stats.heading} </h1>
      <p className="text-center text-lg my-5">{stats.subText} </p>
      <div className="md:flex my-0 md:my-20 justify-between mx-0 md:mx-10">
        {stats.statistics.map((stat, index) => (
          <div key={`${stat.number}-${stat.text}-${index}`} className="text-center mt-5">
            <p className="text-5xl md:text-4xl lg:text-7xl font-bold">{stat.number} </p>
            <p className="">{stat.text} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
