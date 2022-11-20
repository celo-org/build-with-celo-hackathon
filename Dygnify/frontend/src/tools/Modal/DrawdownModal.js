import React from "react";
import GradientButton from "../Button/GradientButton";

const DrawdownModal = ({ data, handleDrawdown, onDrawdown }) => {
  return (
    <div>
      <input type="checkbox" id="drawdown-modal" className="modal-toggle" />
      <div
        style={{ backdropFilter: "brightness(40%) blur(8px)" }}
        className="modal"
      >
        <div
          style={{ backgroundColor: "#20232A", borderRadius: "16px" }}
          className="modal-box w-1/3 max-w-5xl p-0"
        >
          <label
            for="drawdown-modal"
            className="btn btn-ghost absolute right-2 top-2 pb-2"
            onClick={() => handleDrawdown()}
          >
            ✕
          </label>
          <h3
            style={{ borderBottom: "2px solid #292C33" }}
            className="font-bold text-lg py-3 px-4"
          >
            Drawdown
          </h3>
          <div style={{ display: "flex" }} className="justify-center my-6">
            <img
              style={{ borderRadius: "50%" }}
              className="p-4 bg-base-500 opacity-80"
              src="/images/wallet_white.png"
              alt=""
            />
          </div>
          <div
            style={{ backgroundColor: "#292C33", borderRadius: "4px" }}
            className="mx-4 mb-3 py-4 px-4 text-base"
          >
            <div style={{ display: "flex" }}>
              <p style={{ display: "flex" }} className="justify-start">
                Total Balance
              </p>
              <p style={{ display: "flex" }} className="justify-end">
                {data?.loan_amount} {process.env.REACT_APP_TOKEN_NAME}
              </p>
            </div>
            {/* <small
              style={{ display: "flex", color: "#777E91" }}
              className="justify-end"
            >
              {data?.loan_amount} USDT
            </small> */}
          </div>
          <div className="text-sm py-3 px-4">
            <div style={{ display: "flex" }} className="mb-2">
              <p style={{ display: "flex" }} className="justify-start">
                Pool Name
              </p>
              <p style={{ display: "flex" }} className="justify-end">
                {data?.opportunity_name}
              </p>
            </div>
            <div style={{ display: "flex" }} className="mb-2">
              <p style={{ display: "flex" }} className="justify-start">
                Interest Rate
              </p>
              <p style={{ display: "flex" }} className="justify-end">
                {data?.loanInterest}
              </p>
            </div>
            <div style={{ display: "flex" }} className="mb-2">
              <p style={{ display: "flex" }} className="justify-start">
                Available for drawdown
              </p>
              <p style={{ display: "flex" }} className="justify-end">
                ${data?.opportunityAmount}
              </p>
            </div>
          </div>
          <div className="modal-action mx-4 mt-2 mb-4">
            <GradientButton className="w-full" onClick={onDrawdown}>
              Drawdown Funds
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawdownModal;
