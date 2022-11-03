const Contribute = () => {
  return (
    <div className="bg-indigo-50 p-3">
      <div className="flex justify-around bg-white p-5">
        <div>
          <h3 className="font-open text-4xl">
            Want to Contribute to the platform ?{" "}
          </h3>
        </div>
        <div className="max-w-[500px] w-[100%]">
          <form>
            <div className="mt-2">
              <h3 className="font-open">Enter Address Name</h3>
              <input
                type="text"
                placeholder="name..."
                className="max-w-[800px] w-[100%] border-2 border-slate-800 p-2 rounded"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-open">Enter Address </h3>
              <input
                type="text"
                placeholder="address..."
                className="max-w-[800px] w-[100%] border-2 border-slate-800 p-2 rounded"
              />
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
  );
};

export default Contribute;
