import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const CreateProposal = () => {
  const { showModal, setShowModal } = useContext(AppContext);

  const handleShowModal = ()=>{
      setShowModal(!showModal);
  }
  return (
    <div className="flex flex-col items-start mt-[30px] bg-white max-w-[700px] w-[100%] md:h-[120px] h-[100%] rounded-lg mt-[80px]">
      <h1 className="font-work text-3xl m-2 text-slate-800">
        Create a New Proposal
      </h1>
      <button onClick={handleShowModal} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-[200px] font-open m-2">
        New Proposal
      </button>
    </div>
  );
};

export default CreateProposal;
