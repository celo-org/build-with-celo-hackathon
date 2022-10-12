import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../../types/button";

export default function SecondaryButton({
  title,
  onPressed,
  height,
  foreground,
  background,
  disabled,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <div
      className={`relative ${
        disabled ? `cursor-not-allowed` : `cursor-pointer`
      }`}
    >
      <button
        onClick={() => onPressed()}
        className={`${height != null ? `h-[${height}px]` : `h-[46px]`} ${
          foreground != null ? foreground : `bg-black`
        } ${
          disabled ? `cursor-not-allowed` : `cursor-pointer`
        } z-[2] relative -top-[4px] -left-[4px] rounded-[10px] whitespace-nowrap flex items-center justify-center px-3 py-2 border-2 border-black font-black text-md text-white hover:top-0 hover:left-0 w-full`}
      >
        {children} {title}
      </button>
      <span
        className={`${
          background != null ? background : `bg-white`
        } w-full h-full absolute left-0 top-0 rounded-[12px] border-2 border-black transition-opacity box-border`}
      ></span>
    </div>
  );
}
