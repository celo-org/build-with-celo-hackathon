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
        <PrimaryButton title="Checkout" onPressed={() => console.log(0)}>
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
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
            />
          </svg>
        </PrimaryButton>
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
              <div className="w-full mb-6">
                <h3 className="text-2xl font-black">
                  Tickets <span className="text-md">(0/100)</span>
                </h3>
              </div>
              <div className="border-2 border-black rounded-[8px] mb-8 py-2 px-8">
                {/* <div className="flex items-start justify-start flex-col w-full">
                  <p className="text-lg font-black">Ticket ends:</p>
                  <div className="flex w-full justify-between mt-6 py-0 px-6 font-black">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl">00</span>
                      <i className="mt-2 not-italic text-xs">Days</i>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl">00</span>
                      <i className="mt-2 not-italic text-xs">Hours</i>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl">00</span>
                      <i className="mt-2 not-italic text-xs">Minutes</i>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl">00</span>
                      <i className="mt-2 not-italic text-xs">Seconds</i>
                    </div>
                  </div>
                </div> */}
                <div className="flex items-center justify-center flex-col w-full py-8">
                  <p className="text-4xl font-black">Sold out</p>
                </div>
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
                    <h3 className="text-md font-black">CO2 Offset 🌱</h3>
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
              <div
                className="m-0"
                style={{
                  padding: "4px 0px 0px 4px",
                }}
              >
                <SecondaryButton
                  height={50}
                  title="Get Ticket"
                  foreground="bg-[#00D26D]"
                  onPressed={() => console.log(0)}
                >
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
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                    />
                  </svg>
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
