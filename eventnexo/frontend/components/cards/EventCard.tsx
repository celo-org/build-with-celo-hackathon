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
              <div className="p-10">
                <h3 className="mb-6 font-black text-2xl overflow-hidden w-full">
                  CELO Workshop: Build upgradable smart contracts
                </h3>
                <p className="w-full text-xs font-bold overflow-hidden h-10 text-ellipsis whitespace-nowrap leading-5">
                  Join Viral to learn how you can build upgradeable smart
                  contracts, so later you can push updates to your smart
                  contract logic
                </p>
                <div className="my-2 flex items-center space-x-1">
                  <Image src="/celo.png" width="15" height="15" />
                  <h6 className="text-sm font-black">0.2CELO</h6>
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[12px]  border-black border-2 z-[1] bg-[#00D26D] opacity-0 group-hover:opacity-100"></div>
          </div>
        </a>
      </Link>
    </div>
  );
}
