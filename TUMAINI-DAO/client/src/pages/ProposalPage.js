import Navbar from "../components/Navbar";
import ProposalCard from "../components/ProposalCard";


const ProposalPage = () => {
  return (
    <div className="flex flex-col items-center justify-around bg-indigo-50">
      <Navbar />
      <div>
        <ProposalCard />

      </div>
    </div>
  );
};

export default ProposalPage;