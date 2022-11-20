import React from "react";

const Footer = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          margin: "60px 0",
        }}
      >
        <a href="">
          <p>Investment Disclaimer</p>
        </a>
        <a href="">
          <p>Data Privacy Policy</p>
        </a>
        <a href="">
          <p>Imprint</p>
        </a>
      </div>
    </>
  );
};

export default Footer;
