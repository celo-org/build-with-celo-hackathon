import React, { useState } from "react";
import GradientButton from "../../../tools/Button/GradientButton";
import PrimaryButton from "../../../tools/Button/PrimaryButton";

const ViewPoolCard = () => {
  const data = [{ loan_amount: 45000, opportunity_name: "Bullet" }];

  const StatusButton = ({ label, id }) => {
    return (
      <div
        className="rounded-box  text-[#000000] items-center justify-center"
        style={{
          fontSize: 16,
          fontWeight: 600,
          width: 65,
          height: 29,
          display: "flex",
          background: `${
            id === 1
              ? "#109B81"
              : id === 2
              ? "linear-gradient(95.8deg, #FFE202 5%, #F2B24E 95.93%)"
              : id === 3
              ? "linear-gradient(276.08deg, rgba(255, 255, 255, 0.04) 2.02%, rgba(255, 255, 255, 0.4) 2.03%, #FFFFFF 99.33%)"
              : "#000000"
          }`,
          //background: `linear-gradient(95.8deg, #FFE202 5%, #F2B24E 95.93%)`,
          //background: `linear-gradient(276.08deg, rgba(255, 255, 255, 0.04) 2.02%, rgba(255, 255, 255, 0.4) 2.03%, #FFFFFF 99.33%)`,
        }}
      >
        <div>{label}</div>
      </div>
    );
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
            Pool Balance
          </p>
          <p style={{ display: "flex" }} className="justify-end">
            450000000 {process.env.REACT_APP_TOKEN_NAME}
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
            Status
          </p>

          <StatusButton label={"Full"} id={2} />
        </div>
        <div style={{ marginTop: 32 }}>
          <PrimaryButton>View Pool </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ViewPoolCard;
