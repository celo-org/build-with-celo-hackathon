import Navbar from "../components/Navbar";
import ProposalCard from "../components/ProposalCard";
import { useLocation } from "react-router-dom";


const ProposalPage = () => {
  const { state } = useLocation();
  const { id } = state;
  const {param} = state;
  
  return (
    <div className="flex flex-col items-center justify-around h-screen bg-indigo-50">
      <Navbar />
      <div>
        <ProposalCard id={id} param={param} />

      </div>
    </div>
  );
};

export default ProposalPage;