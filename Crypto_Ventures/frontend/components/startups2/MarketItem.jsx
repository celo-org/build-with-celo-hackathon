const MarketItem = ({ title, children }) => {
  return (
    <div className="flex w-1/2 mb-10">
      <div className="w-1/6">
        <div className=" bg-orange-100 aspect-square rounded-full flex items-center justify-center mr-5">
          <img src="svg/star.svg" className="w-6" />
        </div>
      </div>
      <div className="w-5/6 flex flex-col">
        <h6>{title}</h6>
        <p className="text-base text-gray-400">{children} </p>
      </div>
    </div>
  );
};

export default MarketItem;
