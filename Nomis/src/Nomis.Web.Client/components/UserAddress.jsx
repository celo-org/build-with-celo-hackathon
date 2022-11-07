import React from "react";

export default function UserAddress({ address, fullAddress }) {
  const [copy, setCopy] = React.useState("");
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setTimeout(() => setCopy(""), 1000);
    setCopy("copied");
  };
  return (
    <div className={`UserAddress ${copy}`}>
      <h4 onClick={copyToClipboard}>{address}</h4>
      <span className="notify">Address copied!</span>
    </div>
  );
}
