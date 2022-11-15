import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QueriesCard = () => {
  const data = {
    nameOfPool: "Name of Pool",
    drawdownCap: "$10,000,000",
    interestRate: "24%",
    status: "Under Review",
  };

  const push = useNavigate();

  return (
    <div
      style={{ boxShadow: `1px 1px 1px rgba(185, 185, 185, 0.1)` }}
      className="card text-white w-full"
    >
      <div
        style={{
          background: `linear-gradient(302.85deg, rgba(168, 154, 255, 0) -1.23%, rgba(168, 154, 255, 0.260833) 99.99%, rgba(168, 154, 255, 0.8) 100%`,
          borderRadius: "16px",
        }}
        className="card-body"
      >
        <h2 className="card-title mb-4">{data.nameOfPool} </h2>
        <div className="text-sm">
          <div style={{ display: "flex" }} className="mb-2">
            <p style={{ display: "flex" }} className="justify-start">
              Drawdown Cap
            </p>
            <p style={{ display: "flex" }} className="justify-end">
              {data.drawdownCap} {process.env.REACT_APP_TOKEN_NAME}
            </p>
          </div>
          <div style={{ display: "flex" }} className="mb-2">
            <p style={{ display: "flex" }} className="justify-start">
              Interest Rate
            </p>
            <p style={{ display: "flex" }} className="justify-end">
              {data.interestRate} {process.env.REACT_APP_TOKEN_NAME}
            </p>
          </div>
          <div style={{ display: "flex" }} className="mb-2">
            <p style={{ display: "flex" }} className="justify-start">
              Status
            </p>
            <p style={{ display: "flex" }} className="justify-end">
              {data.status}
            </p>
          </div>
        </div>
        <div className="justify-center w-full mt-6">
          <label
            htmlFor="repayment-modal"
            color="none"
            style={{
              borderRadius: "100px",
              padding: "12px 24px",
              color: "white",
            }}
            className={`btn btn-secondary w-full bg-blue-500 capitalize font-medium border-none`}
            onClick={() => push("/borrower_dashboard/queriesPoolDetail")}
          >
            View detail
          </label>
        </div>
      </div>
    </div>
  );
};

export default QueriesCard;
