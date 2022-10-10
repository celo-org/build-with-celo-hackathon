const Background = () => {
  return (
    <div className="flex justify-around items-end">
      <div className="absolute top-[300px] text-center flex flex-col justify-around h-[300px]">
        <h1 className="text-7xl text-white">Hope for all</h1>
        <h3>We believe in empowering africa's daughters for tommorrow</h3>
        <div>
          <button className="py-3 px-8 text-white bg-black rounded-full mx-5">See the Impact</button>
          <button className="py-3 px-8 text-black bg-white rounded-full mx-5">Join Us</button>
        </div>
      </div>
    </div>
  );
};

export default Background;
