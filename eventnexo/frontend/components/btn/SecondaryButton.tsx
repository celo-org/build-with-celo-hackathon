import React from "react";

type Props = {
  title: string;
  onPressed: () => void;
};

export default function SecondaryButton({ title, onPressed }: Props) {
  return (
    <div className="relative cursor-pointer">
      <button
        onClick={() => onPressed()}
        className="z-[2] relative -top-[4px] -left-[4px] rounded-[10px] bg-black whitespace-nowrap flex items-center justify-center px-3 py-2 border border-black font-bold text-md text-white hover:top-0 hover:left-0"
      >
        {title}
      </button>
      <span className="w-full h-full absolute left-0 top-0 rounded-[12px] border-2 border-black transition-opacity"></span>
    </div>
  );
}
