import React from "react";
import "./sidebarLink.css";

const SidebarLink = ({ text, children }) => {
  return (
    <div className="link">
      <div className="icon">{children}</div>
      <h2>{text}</h2>
    </div>
  );
};

export default SidebarLink;
