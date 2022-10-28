import { AiFillQuestionCircle } from "react-icons/ai";
const TextField = ({ label, value, onChange, type = "text", placeholder }) => {
  return (
    <div className="flex flex-col mx-4 w-1/2">
      <div className="flex justify-between items-center">
        <span className="text-base py-2">{label}</span>
        <AiFillQuestionCircle color="#aaaaaa" />
      </div>
      <input
        className="border-x border-y border-solid border-[#d1d1d1] rounded-none p-3 w-full"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
