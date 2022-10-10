import React from "react";

type Props = {
  title: string;
  onPressed: () => void;
};

export default function PrimaryButton({ title, onPressed }: Props) {
  return (
    <div className="relative cursor-pointer">
      <button
        onClick={() => onPressed()}
        className="z-[2] relative -top-[4px] -left-[4px] rounded-[10px] bg-white whitespace-nowrap flex items-center justify-center px-3 py-2 border-[2px] border-black font-bold text-md text-black hover:top-0 hover:left-0"
      >
        {title}
      </button>
      <span className="w-full h-full absolute left-0 top-0 rounded-[12px] border-2 bg-black border-black transition-opacity"></span>
    </div>
  );
}
