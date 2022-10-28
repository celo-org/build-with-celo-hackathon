import Navbar from "../components/Navbar";
import ProposalCard from "../components/ProposalCard";
import { useLocation } from "react-router-dom";


const ProposalPage = () => {
  const { state } = useLocation();
  const { id } = state;
  
  return (
    <div className="flex flex-col items-center justify-around bg-indigo-50">
      <Navbar />
      <div>
        <ProposalCard id={id} />

      </div>
    </div>
  );
};

export default ProposalPage;