const Campaign = ({ width = "1/3", mx = "[2vw]" }) => {
  return (
    <div
      className={`flex flex-col w-${width} mx-${mx} my-[2vh] shadow-md shadow-[#aaaaaa]`}
    >
      <img src="svg/graduate.svg" alt="campaignImage" className="w-full " />
      <div className="p-2 px-4 flex-col ">
        <h4 className="text-xl py-1">Mpesa Fund</h4>
        <h4 className="text-lg py-1">Health</h4>
        <p className="py-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod ter
        </p>
        <p className="py-1">funding timestamp</p>
        <div className="py-1 rounded w-full h-2 bg-[#C4C4C4]" />
        <p className="py-1">
          <strong>$40,000 raised</strong>&nbsp;of $30,000
        </p>
      </div>
    </div>
  );
};
export default Campaign;
