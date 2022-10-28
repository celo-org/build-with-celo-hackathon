import { AiFillQuestionCircle } from "react-icons/ai";

const CapitalSelectButton = ({ children, selected = false }) => {
  return (
    <div
      className={`border-x border-y border-solid ${
        selected ? "border-[#4743E0]" : "border-[#d1d1d1]"
      } rounded-none px-1 py-3 w-1/4 mx-1 text-sm ${
        selected ? "text-[#4743E0]" : "text-[#00000088]"
      }`}
    >
      {children}
    </div>
  );
};
const CapitalInput = ({ value, onChange }) => {
  return (
    <div className="flex flex-col py-2">
      <span className="text-[#33333355] text-sm">(optional)</span>
      <div className="flex justify-between items-center">
        <span className="text-base py-2">How much capital do you need</span>
        <AiFillQuestionCircle color="#aaaaaa" />
      </div>
      <div className="flex">
        <CapitalSelectButton>0&#60;20</CapitalSelectButton>
        <CapitalSelectButton>20&#60;50</CapitalSelectButton>
        <CapitalSelectButton selected>50&#60;100</CapitalSelectButton>
        <CapitalSelectButton>100&#60;...</CapitalSelectButton>
      </div>
    </div>
  );
};
export default CapitalInput;
