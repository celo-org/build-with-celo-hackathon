import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EventCard() {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-[0] group p-0 m-0">
      <Link href="/event/celo-connect" passHref>
        <a className="mb-10 px-3 py-0 relative w-full inline-block flex-shrink-[0]">
          <div className="relative cursor-pointer w-full p-0 m-0">
            <div className="group-hover:-translate-x-2 group-hover:-translate-y-2 duration-75 transition ease-out bg-white relative border-black border-2 z-[2] rounded-[8px]">
              <div className="p-6">
                <h3 className="mb-6 font-black text-2xl w-full h-[70px] text-ellipsis line-clamp-2">
                  CELO Workshop: Build upgradable smart contracts
                </h3>
                <div className="flex flex-row items-center space-x-3">
                  <div className="my-2 flex items-center space-x-1">
                    <Image src="/celo.png" width="15" height="15" />
                    <h6 className="text-sm font-black">0.3CELO</h6>
                  </div>
                  <div className="my-2 flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    <h6 className="text-sm font-black">Virtual</h6>
                  </div>
                  <div className="my-2 flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    <h6 className="text-sm font-black">22/09/2022</h6>
                  </div>
                </div>
                {/* <p className="w-full text-xs font-bold ">
                  Join Viral to learn how you can build upgradeable smart
                  contracts, so later you can push updates to your smart
                  contract logic
                </p> */}
              </div>
            </div>
            <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[12px]  border-black border-2 z-[1] bg-primary opacity-0 group-hover:opacity-100"></div>
          </div>
        </a>
      </Link>
    </div>
  );
}
