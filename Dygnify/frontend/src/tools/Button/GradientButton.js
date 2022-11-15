import React from "react";

const GradientButton = ({
  onClick,
  children,
  className,
  id,
  ...otherProps
}) => {
  return (
    <button
      onClick={onClick}
      id={id}
      style={{ borderRadius: "100px", padding: "12px 24px", color: "white" }}
      className={`btn btn-wide bg-gradient-to-r from-[#4B74FF] to-[#9281FF] hover:from-[#9281FF] hover:to-[#4B74FF] capitalize font-medium border-none ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default GradientButton;
