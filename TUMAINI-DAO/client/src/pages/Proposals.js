import Navbar from "../components/Navbar";
import NewProposal from "../components/NewProposal";
import Proposal from "../components/Proposal";
import CreateProposal from "./CreateProposal";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Proposals = () => {
  const { showModal } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center bg-indigo-50">
      <Navbar />
        <CreateProposal />
        {showModal?<NewProposal />:null}
      <div className="mt-[50px] mx-2 max-w-[1100px] w-[100%] flex items-center flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Proposal />
       
      </div>
      <hr className="mx-5" />
    </div>
  );
};

export default Proposals;
