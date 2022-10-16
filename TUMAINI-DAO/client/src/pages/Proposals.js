import Navbar from "../components/Navbar";
import Proposal from "../components/Proposal";

const Proposals = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-indigo-50">
      <Navbar />
      <div className="mt-[50px] mx-2 max-w-[1100px] w-[100%] flex items-center flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Proposal />
        <Proposal />
        <Proposal />
        <Proposal />
        <Proposal />
        <Proposal />
        <Proposal />
        <Proposal />
        <Proposal />
        <Proposal />
        <Proposal />
        <Proposal />
      </div>
      <hr className="mx-5" />
    </div>
  );
};

export default Proposals;
