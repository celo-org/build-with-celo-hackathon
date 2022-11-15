import React, { useState } from "react";
import GradientButton from "../../../tools/Button/GradientButton";
import PrimaryButton from "../../../tools/Button/PrimaryButton";

const WithdrawCard = () => {
  const data = {
    poolSize: "$500,000.00",
    capitalInvested: "$450,000.00",
    estimatedApy: "24%",
    availableForWithdrawl: "$580,000.00",
  };

  return (
    <div
      style={{
        background: `linear-gradient(302.85deg, rgba(168, 154, 255, 0) -1.23%, rgba(168, 154, 255, 0.260833) 99.99%, rgba(168, 154, 255, 0.8) 100%`,
        boxShadow: `1px 1px 1px rgba(185, 185, 185, 0.1)`,
        width: 534,
        height: 289,
        borderRadius: "16px",
        display: "flex",
      }}
      className="card-body card text-white w-1/3 flex-row items-center"
    >
      <img
        src="./assets/Dygnify_Image.png"
        style={{ width: 150, height: 150 }}
      />
      <div style={{ marginLeft: 32, width: 400 }}>
        <div style={{ display: "flex", marginTop: -10 }} className="flex-col">
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
          <p
            style={{
              display: "flex",
              fontSize: 16,
            }}
            className="justify-start "
          >
            Pool Size
          </p>
          <p style={{ display: "flex", fontSize: 16 }} className="justify-end">
            {data.poolSize} {process.env.REACT_APP_TOKEN_NAME}
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p
            style={{ display: "flex", fontSize: 16 }}
            className="justify-start"
          >
            Capital Invested
          </p>
          <p style={{ display: "flex", fontSize: 16 }} className="justify-end">
            {data.capitalInvested}
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p
            style={{ display: "flex", fontSize: 16 }}
            className="justify-start"
          >
            Estimated APY
          </p>
          <p style={{ display: "flex", fontSize: 16 }} className="justify-end">
            {data.estimatedApy}
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p
            style={{ display: "flex", fontSize: 16 }}
            className="justify-start"
          >
            Available for Withdrawal
          </p>
          <p style={{ display: "flex", fontSize: 16 }} className="justify-end">
            {data.availableForWithdrawl}
          </p>
        </div>

        <div style={{ marginTop: 28 }}>
          <PrimaryButton disable={false}>Withdraw Funds</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default WithdrawCard;
