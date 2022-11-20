import React from "react";

const PrimaryButton = ({
  children,
  htmlFor,
  width,
  onClick,
  disable,
  data,
}) => {
  return (
    <button
      onClick={disable ? null : onClick}
      htmlFor={htmlFor}
      style={{ borderRadius: "100px", padding: "12px 24px", color: "white" }}
      className={`${
        disable
          ? `btn btn-secondary btn-wide bg-[#A0ABBB] capitalize font-medium border-none ${width}`
          : `btn btn-wide bg-blue-500  hover:bg-blue-500 capitalize font-medium border-none ${width}`
      }`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
