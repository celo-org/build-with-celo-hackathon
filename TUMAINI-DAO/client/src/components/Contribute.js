import React from "react";
import { useState } from "react";
const Contribute = (props) => {
  const [address, setAddress] = useState(null);
  const [amount, setAmount] = useState(null);
  return (
    <>
      <div className=" w-full">
        <div className="w-4/5 mx-auto flex justify-evenly py-10">
          <h2 className=" font-bold font-jost text-lg ">
            cUSD Balance:{" "}
            <span className="text-green-400 font-bold font-jost text-4xl">
              {parseFloat((props.cUSD / 10 ** 18).toFixed(4))}
            </span>
          </h2>
          <br />
          <h2 className=" font-bold font-jost text-lg">
            Rehema Balance:{" "}
            <span className="font-bold text-orange-400  font-jost text-4xl">
              {props.balance}{" "}
            </span>
          </h2>
        </div>
      </div>
      <div className="w-4/5 mx-auto flex justify-evenly py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-1">
          <div className=" bg-white h-60 rounded-md m-1">
            <div className="flex flex-col gap-6 justify-around  p-5">
              <div>
                <h3 className="font-jost font-bold xl:text-3xl lg:text-2xl md:text-xl sm:text-lg">
                  Want to Contribute to the platform ?{" "}
                </h3>
              </div>
              <div className="w-[100%]">
                <form>
                  <div className="">
                    <h3 className="font-jost">Enter Amount </h3>
                    <input
                      type="text"
                      placeholder="30..."
                      className="w-[100%] border-2 border-slate-800 p-2 rounded"
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-4 px-5 w-2/5 font-open my-3 shadow-md"
                      type="submit"
                      name="Send Transcation"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className=" bg-white h-60 rounded-md mt-4 p-5 flex flex-col gap-6 ">
              <div>
                <h1 className="font-jost font-bold xl:text-3xl lg:text-2xl md:text-xl sm:text-lg">
                  Buy Rehema Token
                </h1>
              </div>

              <div className="">
                <div className="">
                  <h3 className="font-jost">
                    Buy <span className="font-bold">10</span> Rehema Tokens for{" "}
                    <span className="font-bold">1.58</span> cUSD{" "}
                  </h3>

                  <input
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-4 w-2/5 font-open my-3"
                    type="submit"
                    name="Send Transcation"
                    value="BUY"
                    onClick={() => {
                      props.buyrehema();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="  bg-white h-100 rounded-md m-1 p-5 flex flex-col gap-6">
            <h1 className="font-jost font-bold xl:text-3xl lg:text-2xl md:text-xl sm:text-lg">
              Share Rehema Token
            </h1>
            
            <div className="flex flex-col ">
              <div className="flex justify-start prose-sm">
                <h2 className="font-jost font-bold ">Enter Address and amount to share your Rehema Tokens</h2>
              </div>
              <div className="pt-2">
                <div className="mt-2">
                  <h3 className="font-jost">Enter Amount </h3>
                  <input
                    type="text"
                    placeholder="30..."
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    value={amount}
                    className="max-w-[800px] w-[100%] border-2 border-slate-800 p-2 rounded"
                  />
                </div>
                <div className="mt-4 ">
                  <h3 className="font-jost">Enter Address </h3>
                  <input
                    type="text"
                    placeholder="0xhjfjnjr..."
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    value={address}
                    className="max-w-[800px] w-[100%] border-2 border-slate-800 p-2 rounded"
                  />
                </div>
                <input
                  className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-4 px-5 w-2/5 font-open my-3 shadow-md"
                  type="submit"
                  name="Send Transcation"
                  onClick={() => {
                    props.shareRehemaToken(address, amount);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contribute;
