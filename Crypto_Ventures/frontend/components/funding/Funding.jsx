import { ArrowTextBtn, BtnPrimary } from "../shared/Button";
import Campaign from "./Campaign";
import Category from "./Category";

const FundingPage = () => {
  return (
    <div className="w-full pt-20 ">
      <div className="flex w-full h-[80vh] ">
        <div className="w-1/2 h-full flex items-center justify-center bg-[#F1F1F1]">
          <p className="text-3xl">
            Our funds support early-stage <br />
            startups and upcoming fund <br />
            managers looking to make <br />
            long-term impact through <br />
            blockchain technology
          </p>
        </div>
        <div className="w-1/2 h-full">
          <img
            src="svg/plant.svg"
            alt="plant"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className=" w-full px-16 pb-10">
        <h2 className="text-2xl my-7">Top campaigns</h2>
        <div className="w-full flex pb-10">
          <Campaign /> <Campaign /> <Campaign />
        </div>
        <div className="flex flex-row-reverse ">
          <ArrowTextBtn>See more</ArrowTextBtn>
        </div>
      </div>
      <div className="w-full px-16  bg-[#E6E6E6] pb-10">
        <h2 className="text-2xl py-7">Categories</h2>
        <div className="w-full flex pb-10">
          <Category />
          <Category />
          <Category />
          <Category />
        </div>
        <div className="flex flex-row-reverse text-[#2F2E41DE] ">
          <ArrowTextBtn>More Categories</ArrowTextBtn>
        </div>
      </div>
      <div className=" w-full px-16 pb-10">
        <div className="w-full flex pb-10">
          <div className="flex flex-col w-1/3 mx-[2vw]">
            <h2 className="text-2xl mt-7 mb-4">Active</h2>
            <Campaign width="full" mx="0" /> <Campaign width="full" mx="0" />
          </div>
          <div className="flex flex-col w-1/3 mx-[2vw]">
            <h2 className="text-2xl mt-7 mb-4">Upcoming</h2>
            <Campaign width="full" mx="0" /> <Campaign width="full" mx="0" />
          </div>
          <div className="flex flex-col w-1/3 mx-[2vw]">
            <h2 className="text-2xl mt-7 mb-4">Ended</h2>
            <Campaign width="full" mx="0" /> <Campaign width="full" mx="0" />
          </div>
        </div>
        <div className="flex flex-row-reverse text-[#2F2E41DE]">
          <ArrowTextBtn>More Campaign</ArrowTextBtn>
        </div>
      </div>
      <div className="w-full bg-[#C4C4C4] flex flex-col items-center justify-center py-16">
        <p className="text-lg py-2">Need support or funding?</p>
        <BtnPrimary width="fit" px="16">
          Write us an email
        </BtnPrimary>
      </div>
    </div>
  );
};
export default FundingPage;
