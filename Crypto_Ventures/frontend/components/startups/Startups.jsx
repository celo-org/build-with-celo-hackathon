import Stage from "./Stage";

const StartupsPage = () => {
  return (
    <div className="container max-w-5xl pt-28 mx-auto px-5">
      <div className="flex w-full items-center">
        <div className="text-6xl mr-10">Start-Up</div>
        <div className="w-60">Here we discuss the business model</div>
      </div>
      <div className="flex pt-20">
        <Stage title={"Incubation"} icon="svg/react.svg">
          How we stay in business, based on amount generated from those
          potential customers
        </Stage>
        <Stage title={"Product launch"} icon="svg/bitcoin.svg">
          How we stay in business, based on amount generated from those
          potential customers
        </Stage>
        <Stage title={"Revenue"} icon="svg/bars.svg" last>
          How we stay in business, based on amount generated from those
          potential customers
        </Stage>
      </div>
    </div>
  );
};
export default StartupsPage;
