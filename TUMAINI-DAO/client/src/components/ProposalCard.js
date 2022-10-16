import { useState } from "react";
import PieChart from "../components/PieChart";

const ProposalCard = () => {
  const [toggleVote, setToggleVote] = useState(false);

  const handleToggleVote = () => {
    setToggleVote(!toggleVote);
  };
  return (
    <div className="flex flex-col bg-white text-gray-900 rounded-lg shadow-lg mt-[100px] mx-2 w-[100%]">
      <div className="flex flex-col items-center md:flex-row md:max-w-[1200px] md:w-[100%] font-jost ">
        <div className="md:max-w-[500px] w-[100%]">
          <img
            src={process.env.PUBLIC_URL + "/planting.jpg"}
            alt=""
            className="object-cover max-w-[600px] w-[100%] md:max-w-[600px] md:h-[100%] md:max-h-[500px] rounded-t-md md:rounded-l-md md:rounded-t-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="md:max-w-[450px] md:w-[100%] flex justify-around py-3">
            <div className="h-[400px] px-2 md:max-w-[400px] md:w-[100%] flex flex-col justify-around">
              <h3 className="font-open font-bold text-gray-700 text-xl">
                Elgeyo marakwet
              </h3>
              <h1 className="font-jost text-5xl">Donation to St Lisa School</h1>
              <h3 className="font-open text-gray-600 text-xl">
                Accept Donation to St Lisa school for Girls
              </h3>
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3>
                    <span className="font-extrabold font-work text-2xl">
                      Voting Opened
                    </span>
                  </h3>
                </div>
                <div>
                  <button
                    onClick={handleToggleVote}
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-full font-work "
                  >
                    Vote
                  </button>
                </div>
              </div>
              <div
                style={toggleVote ? { display: "flex" } : { display: "none" }}
                className="flex items-center justify-between"
              >
                <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-1 w-[100px] font-work ">
                  Approve
                </button>
                <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-1 w-[100px] font-work ">
                  Reject
                </button>
              </div>
              <h4>1 week remaining</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="max-w-[500px] w-[100%] m-[10px]">
          <h1 className="font-jost text-2xl">Read more information</h1>
          <h2 className="font-open">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi delectus vel a odit harum in quam quos, nihil nam commodi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut veritatis, maxime deleniti assumenda nam laboriosam? Magni veritatis assumenda voluptatibus nostrum.</h2>
        </div>
        <div className="max-w-[350px] w-[100%]">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
