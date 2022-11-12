import Navbar from "../components/Navbar";
import NewProposal from "../components/NewProposal";
import Proposal from "../components/Proposal";
import CreateProposal from "./CreateProposal";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Proposals = () => {
  const { showModal } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-indigo-50 h-screen">
      <Navbar />
        <CreateProposal />
        {showModal?<NewProposal />:null}
      <div className="w-4/5 mx-auto flex items-center flex-col ">
        <Proposal />
       
      </div>
      <hr className="mx-5" />
    </div>
  );
};

export default Proposals;
