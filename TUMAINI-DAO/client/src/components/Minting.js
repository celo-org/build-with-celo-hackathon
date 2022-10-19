import { useNavigate } from "react-router-dom";

const Minting = () => {
    
    const navigate = useNavigate();

    const handleNavigateToToken = ()=>{
        navigate("/mint_token");
    }
  return (
    <div className="flex items-center justify-around m-5 p-2 bg-white shadow-lg  max-w-[100%] h-[550px] rounded-lg font-roboto">
      <div className="overflow-hidden object-fill ">
        <img src={process.env.PUBLIC_URL + "/coins.png"} alt="" className="max-h-[800px] h-[100%] max-w-[800px] w-[100%]" />
      </div>
      <div className="flex flex-col justify-between h-[300px]">
        <h1 className="font-work text-6xl text-slate-900">Mint Rehema Tokens</h1>
        <h3 className="font-work ">
          Get Our <span>Free Token </span>
        </h3>
        <button onClick={handleNavigateToToken} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-[200px] font-open ">
          View Proposal
        </button>
      </div>
    </div>
  );
};

export default Minting;
