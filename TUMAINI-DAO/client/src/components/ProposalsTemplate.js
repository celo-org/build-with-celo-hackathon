import React from "react";
import { useNavigate } from "react-router-dom";

import moment from "moment-timezone";
let times;
const ProposalTemplate = (props) => {
  const navigate = useNavigate("/proposal");
  const navigate1 = useNavigate();
  const handleViewProposal = () => {
    navigate("/proposal_page");
  };

  return (
    <div className="flex w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  " >
      {props.proposal.map((proposals, index) => (
        <div key={proposals[0]} className="flex flex-col gap-3 items-center justify-start m-5 p-2 bg-white shadow-lg max-w-[100%] rounded-lg font-roboto" >
          <div className="">
            <img
              src={process.env.PUBLIC_URL + "/planting.jpg"}
              alt=""
              className="h-[300px] w-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-4 m-1">
            <h1 className="text-2xl text-gray-800 font-bold font-jost">{proposals[5]}</h1>
            <h3 className="font-black text-blue-600 font-work">
              {moment.unix(proposals[2]).isAfter(moment()) ? (
                <h3 className="text-green-400 font-jost">Voting open</h3>
              ) : (
                <h3 className="text-red-400 font-jost">Voting closed</h3>
              )}
            </h3>
            <div className="flex text-gray-800 font-work">
              <h4 className="font-normal text-sm ">
                Approval:
                <span className="text-sm font-jost">
                  {(parseInt(proposals[3]) * 100) /
                    (parseInt(proposals[3]) + parseInt(proposals[4]))}
                  %
                </span>
              </h4>
              <h4 className="px-2 text-sm font-normal">
                Against:
                <span className="text-sm font-jost">
                  {(parseInt(proposals[4]) * 100) /
                    (parseInt(proposals[3]) + parseInt(proposals[4]))}
                  %
                </span>
              </h4>
            </div>
            <div className="">
              <button
                onClick={() =>
                  navigate1("/proposal_page", {
                    state: { id: index, param: proposals[5] },
                  })
                }
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-full font-open shadow-md"
              >
                View Proposal
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};
export default ProposalTemplate;
