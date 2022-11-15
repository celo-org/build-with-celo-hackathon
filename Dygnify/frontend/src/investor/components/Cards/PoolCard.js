import React, { useState } from "react";

const PoolCard = () => {
  const data = [{ loan_amount: 45000, opportunity_name: "Bullet" }];

  return (
    <div
      style={{
        background: `linear-gradient(302.85deg, rgba(168, 154, 255, 0) -1.23%, rgba(168, 154, 255, 0.260833) 99.99%, rgba(168, 154, 255, 0.8) 100%`,
        boxShadow: `1px 1px 1px rgba(185, 185, 185, 0.1)`,
        width: 534,
        height: 227,
        borderRadius: "16px",
        display: "flex",
      }}
      className="card-body card text-white w-1/3 flex-row"
    >
      <img
        src="./assets/Dygnify_Image.png"
        style={{ width: 150, height: 150 }}
      />
      <div style={{ marginLeft: 32, width: 400 }}>
        <div style={{ display: "flex", marginTop: -18 }} className="flex-col">
          <p className="card-title mb-0" style={{ fontSize: 23 }}>
            Name of Pool
          </p>
          <p
            className="card-title mb-4 mt-0"
            style={{ fontSize: 16, fontWeight: 400 }}
          >
            Name of Company
          </p>
        </div>

        <div style={{ display: "flex" }} className="mb-1 ">
          <p style={{ display: "flex" }} className="justify-start ">
            Pool Size
          </p>
          <p style={{ display: "flex" }} className="justify-end">
            450000000 {process.env.REACT_APP_TOKEN_NAME}
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p style={{ display: "flex" }} className="justify-start">
            Capital Invested
          </p>
          <p style={{ display: "flex" }} className="justify-end">
            22/7/2022
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p style={{ display: "flex" }} className="justify-start">
            Estimated APY
          </p>
          <p style={{ display: "flex" }} className="justify-end">
            24%
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p style={{ display: "flex" }} className="justify-start">
            Yield Generated
          </p>
          <p style={{ display: "flex" }} className="justify-end">
            $24000
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
