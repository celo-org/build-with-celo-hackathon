const Stage = ({ icon, last = false, title, children }) => {
  return (
    <div className="w-1/3 px-5">
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-1/2  rounded-full bg-orange-100 aspect-square flex items-center justify-center">
            <img src={icon} className="w-14" />
          </div>
          {!last && (
            <div className="flex grow pr-5 items-center justify-end">
              <img src={"svg/arrow.svg"} alt="arrow" className="h-10" />
            </div>
          )}
        </div>
        <h6 className="pt-10 ">{title}</h6>
        <p className="text-base text-gray-400">{children}</p>
      </div>
    </div>
  );
};

export default Stage;
