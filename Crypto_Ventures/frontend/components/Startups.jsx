import Block from "./startups/Block";

const StartupsPage = () => {
  return (
    <div className="container max-w-5xl pt-28 mx-auto px-5">
      <div className="flex w-full items-center">
        <div className="text-6xl mr-10">Start-Up</div>
        <div className="w-60">Here we discuss the business model</div>
      </div>
      <div className="flex pt-20">
        <Block />
        <Block />
        <Block />
      </div>
    </div>
  );
};
export default StartupsPage;
