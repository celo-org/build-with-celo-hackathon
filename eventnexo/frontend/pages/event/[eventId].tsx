import Image from "next/image";
import React from "react";
import PrimaryButton from "../../components/btn/PrimaryButton";
import SecondaryButton from "../../components/btn/SecondaryButton";
import AppLayout from "../../components/layout/AppLayout";
import Meta from "../../components/partials/Meta";

export default function Home() {
  return (
    <AppLayout>
      <Meta title="Discover" />
      <section className="max-w-8xl flex justify-between items-center my-0 mx-auto py-12 px-28">
        <div className="">
          <h3 className="text-4xl font-black">
            CELO Workshop: Build upgradable smart contracts
          </h3>
          <div>
            <div className="my-2 flex items-center space-x-1">
              <Image src="/celo.png" width="15" height="15" />
              <h6 className="text-sm font-black">0.2CELO</h6>
            </div>
          </div>
        </div>
        <PrimaryButton title="Checkout" onPressed={() => console.log(0)} />
      </section>
      <section className="border-t-2 border-t-black flex">
        <div className="w-full max-w-8xl flex my-0 mx-auto">
          <div className="flex flex-col justify-between flex-1 pt-[60px]"></div>
          <div
            className="w-[500px] border-l-2 border-l-black sticky top-[78px] flex-shrink-[0] overflow-y-auto"
            style={{
              height: `calc(100vh - 78px)`,
              padding: `60px 120px 60px 60px`,
            }}
          >
            <div className="w-full mb-6">
              <h3 className="text-2xl font-black">
                Tickets <span className="text-md">(0/100)</span>
              </h3>
            </div>
            <div className="border-2 border-black rounded-[8px] mb-8">
              <div className="py-2 px-8">
                <div className="flex justify-between items-center py-6 border-b-2 border-b-black">
                  <h3 className="text-md font-black">Token</h3>
                  <div className="my-2 flex items-center space-x-1">
                    <Image
                      src="/celo.png"
                      width="15"
                      height="15"
                      className="border-2 border-black rounded-full"
                    />
                    <h6 className="text-md font-black">0.2CELO</h6>
                  </div>
                </div>
                <div className="flex justify-between items-center py-6">
                  <h3 className="text-md font-black">Reward</h3>
                  <div className="my-2 flex items-center space-x-1">
                    <Image
                      src="/celo.png"
                      width="15"
                      height="15"
                      className="border-2 border-black rounded-full"
                    />
                    <h6 className="text-md font-black">0.2CELO</h6>
                  </div>
                </div>
                <div className="flex items-center justify-center pt-2 pb-5 flex-row space-x-5">
                  <h6 className="text-md font-black">Powered by:</h6>
                  <Image
                    src="/celo.png"
                    width="15"
                    height="15"
                    className="border-2 border-black rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <SecondaryButton
                title="Get Ticket"
                onPressed={() => console.log(0)}
              />
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
