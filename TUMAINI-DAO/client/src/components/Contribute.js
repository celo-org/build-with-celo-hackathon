const Contribute = () => {
  return (
    <div className="grid grid-cols-2 divide-x m-1">
      <div className=" bg-slate-300 h-60 rounded-2xl m-1 flex justify-start p-3">
        <div>
          <h2 className=" text-green-400 font-bold">cUSD Balance: </h2><br/>
          <h2 className=" font-bold text-orange-400">Rehema  Balance: </h2>
        </div>

      </div>
      <div className=" bg-slate-300 h-60 rounded-2xl m-1">
      <div className="flex justify-around  p-5">
        <div>
          <h3 className="font-open text-4xl">
            Want to Contribute to the platform ?{" "}
          </h3>
        </div>
        <div className="max-w-[500px] w-[100%]">
          <form>
            <div className="mt-2">
              <h3 className="font-open">Enter Amount </h3>
              <input
                type="text"
                placeholder="30..."
                className="max-w-[800px] w-[100%] border-2 border-slate-800 p-2 rounded"
              />
            </div>
            <div className="mt-2">
             
              <input
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-[200px] font-open my-2"
                type="submit"
                name="Send Transcation"
              />
            </div>
          </form>
        </div>
      </div>
        </div>
        <div className="  bg-slate-300 h-60 rounded-2xl m-1">
         <h1 className="flex  justify-center font-bold text-blue-400">Share Rehema Token</h1><br/>
         <div className="flex justify-around">
          <div className="font-bold justify-start prose-sm">
            <h2>Enter Address and amount to share your Rehema Tokens</h2>
          </div>
          <div className="p-1 px-5">
          <div className="mt-2">
              <h3 className="font-open">Enter Amount </h3>
              <input
                type="text"
                placeholder="30..."
                className="max-w-[800px] w-[100%] border-2 border-slate-800 p-2 rounded"
              />
            </div>
            <div className="mt-2 ">
              <h3 className="font-open">Enter Address </h3>
              <input
                type="text"
                placeholder="0xhjfjnjr..."
                className="max-w-[800px] w-[100%] border-2 border-slate-800 p-2 rounded"
              />
            </div>
            <input
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-1 px-5 w-[200px] font-open my-2"
                type="submit"
                name="Send Transcation"
              />
          </div>
         </div>
        </div>
        <div className=" bg-slate-300 h-60 rounded-2xl m-1 px-5  ">
        <h1 className="flex justify-center text-yellow-200">Buy Rehema Token</h1>
        <div className="flex justify-around">
        <div className="mt-2">
              <h3 className="font-open">Enter Amount </h3>
              <input
                type="text"
                placeholder="30..."
                className="max-w-[200px] w-[100%] border-2 border-slate-800 p-2 rounded"
              />
              <input
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-1 px-5 w-[300px] h-8 font-open my-2"
                type="submit"
                name="Send Transcation"
              />
            </div>
            

        </div>
        </div>

      
    </div>
  );
};

export default Contribute;
