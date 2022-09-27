import React from 'react';
import { RiTrophyLine } from "react-icons/ri";

function OurAchievements() {
  return (
    <div className="px-16 pb-24">
      <h1
        id="roadmap"
        className="xl:text-4xl text-3xl text-center text-primary font-extrabold py-6 sm:w-4/6 w-5/6 mx-auto black-bruno"
      >
        {/* <span className="text-xl better-brush">Paste You Heading Here</span> */}
        Our Achievements
      </h1>
      <div className="flex flex-col md:grid grid-cols-9 mx-auto py-2 text-blue-50">
        {/* <!-- left --> */}
        <div className="flex flex-row-reverse md:contents">
          <div className="col-start-1 col-end-5 p-4 border border-primary-light bg-primary-dull rounded-xl my-4 ml-auto shadow-md w-11/12">
            <p className="leading-tight text-justify text-sm text-secondary mb-1 ">
              APRIL 2021
            </p>
            {/* <h3 className="font-semibold text-xl mb-4 text-secondary black-bruno">
              Bonds
              <span className="text-lg better-brush">:</span>
            </h3> */}
            <p className="leading-tight text-justify">
              Third prize in Gitcoin Binance Smart Chain Hackathon
            </p>
          </div>
          <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
            <div className="h-full w-6 flex items-center justify-center">
              <div className="h-full w-1 bg-primary-light rounded-t-full pointer-events-none"></div>
            </div>
            <div className="w-8 h-8 absolute top-1/2 -mt-4 -ml-1 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center">
              <RiTrophyLine className="text-primary-dark text-xl" />
            </div>
          </div>
        </div>
        {/* <!-- right --> */}
        <div className="flex md:contents">
          <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
            <div className="h-full w-6 flex items-center justify-center">
              <div className="h-full w-1 bg-primary-light pointer-events-none"></div>
            </div>
            <div className="w-8 h-8 absolute top-1/2 -mt-4 -ml-1 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center">
              <RiTrophyLine className="text-primary-dark text-xl" />
            </div>
          </div>
          <div className="col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md border  border-primary-light bg-primary-dull w-11/12">
            <p className="leading-tight text-justify text-sm text-secondary mb-1 ">
              MAY 2021
            </p>
            {/* <h3 className="font-semibold text-xl mb-4 text-secondary black-bruno">
              Staking Pools <span className="text-lg better-brush">:</span>
            </h3> */}
            <p className="leading-tight text-justify">
              Best LatAm Team Gitcoin Celo Mobilize Hackathon
            </p>
          </div>
        </div>
        {/* <!-- left --> */}
        <div className="flex flex-row-reverse md:contents">
          <div className="col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md border  border-primary-light bg-primary-dull w-11/12">
            <p className="leading-tight text-justify text-sm text-secondary mb-1 ">
              JUNE 2021
            </p>
            {/* <h3 className="font-semibold text-xl mb-4 text-secondary black-bruno">
              Vesting
              <span className="text-lg better-brush ">:</span>
            </h3> */}
            <p className="leading-tight text-justify ">
              Runners-up Degen VC Gitcoin Hackathon
            </p>
          </div>
          <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
            <div className="h-full w-6 flex items-center justify-center">
              <div className="h-full w-1 bg-primary-light pointer-events-none"></div>
            </div>
            <div className="w-8 h-8 absolute top-1/2 -mt-4 -ml-1 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center">
              <RiTrophyLine className="text-primary-dark text-xl" />
            </div>
          </div>
        </div>
        {/* <!-- right --> */}
        <div className="flex md:contents">
          <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
            <div className="h-full w-6 flex items-center justify-center">
              <div className="h-full w-1 bg-primary-light pointer-events-none rounded-b-full"></div>
            </div>
            <div className="w-8 h-8 absolute top-1/2 -mt-4 -ml-1 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center">
              <RiTrophyLine className="text-primary-dark text-xl" />
            </div>
          </div>
          <div className="col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md border border-primary-light bg-primary-dull w-11/12">
            <p className="leading-tight text-justify text-sm text-secondary mb-1 ">
              NOVEMBER 2021
            </p>
            {/* <h3 className="font-semibold text-xl mb-4 text-secondary black-bruno">
              Contribute <span className="text-lg better-brush">:</span>
            </h3> */}
            <p className="leading-tight text-justify ">
              Mission-alligned Team in Celo Startup Pathway
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurAchievements