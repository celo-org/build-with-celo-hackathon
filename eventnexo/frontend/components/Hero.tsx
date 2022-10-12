import React from "react";
import Image from "next/image";
import SecondaryButton from "./btn/SecondaryButton";

export default function Hero() {
  return (
    <section className="flex w-full bg-primary border-b-2 border-b-black py-16 px-10">
      <div className="max-w-6xl mx-auto my-0 relative">
        <div className="flex flex-col-reverse md:flex-start items-start bg-white border-black border-2 rounded-[10px] w-full relative z-[10] top-[16px] left-[20px] lg:top-[20px] lg:left-[30px] p-[12px] h-[500px]">
          <div className="w-full lg:w-[40%] min-h-[142px] px-6 lg:px-16 py-10">
            <h3 className="text-3xl font-black overflow-hidden text-ellipsis max-w-full">
              Explore celo blockcain
            </h3>
            <p className="mt-6 text-md font-bold overflow-hidden text-ellipsis">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
            <div className="mt-10 bottom-[40px] flex">
              <SecondaryButton
                title="Book now"
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
          <div className="flex flex-1 overflow-hidden relative">
            <div className="relative overflow-hidden max-w-[709px] max-h-[458px] rounded-[14px]">
              <Image
                src="https://i.imgur.com/Flfo4hJ.png"
                layout="fill" // required
                objectFit="cover"
                priority
                className="w-full max-w-[709px] max-h-[458px]"
              />
            </div>
          </div>
        </div>
        <span className="w-full h-full absolute left-0 top-0 rounded-[12px] border-2 border-black bg-white transition-opacity"></span>
      </div>
    </section>
  );
}
