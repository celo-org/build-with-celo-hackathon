import { useNavigate } from "react-router-dom";

const Proposal = () => {
    const navigate = useNavigate("/proposal")

    const handleViewProposal = ()=>{
        navigate("/proposal_page")
    }
  return (
    <div className="flex flex-col items-center justify-start m-5 p-2 bg-white shadow-lg w-[350px] max-w-[100%] h-[550px] rounded-lg font-roboto">
      <div className="">
        <img
          src={process.env.PUBLIC_URL + "/planting.jpg"}
          alt=""
          className="h-[350px] w-[350px] object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col justify-around h-[300px] m-1">
        <h1 className="text-2xl text-gray-800 font-jost">
          Accept Donation to St Lisa school for Girls
        </h1>
        <h3 className="font-black text-blue-600 font-work">Voting Closed</h3>
        <div className="flex text-gray-800 font-work">
          <h4 className="font-normal ">
            Approval:
            <span className="text-2xl font-jost">86%</span>
          </h4>
          <h4 className="px-2 font-normal">
            Against:
            <span className="text-2xl font-jost">14%</span>
          </h4>
        </div>
        <div className="">
          <button onClick={handleViewProposal} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-full font-open ">
            View Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
