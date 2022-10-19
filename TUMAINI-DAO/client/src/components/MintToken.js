const MintToken = () => {
  return (
    <div className="flex justify-around ">
      <div className="flex flex-col mt-[10px]">
        <form>
          <label className="text-xl m-5">Mint Tokens</label>
          <input
            className="max-w-[600px] w-[100%] border-2 border-slate-800 p-2 rounded m-5"
            type="number"
            placeholder="Enter Number of Tokens to Mint.."
          />
          <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-[200px] font-open m-5">
            Activate Tokens
          </button>
          <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-[200px] font-open m-5">
            Rename please
          </button>
        </form>
      </div>
    </div>
  );
};

export default MintToken;
