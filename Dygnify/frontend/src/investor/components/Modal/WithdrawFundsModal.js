import React from "react";
import GradientButton from "../../../tools/Button/GradientButton";
import PrimaryButton from "../../../tools/Button/PrimaryButton";

const WithdrawFundsModal = () => {
  const data = {
    poolName: "New Pool",
    amountInvested: "200K USDC",
    estimatedApy: "24%",
    availableForWithdrawal: "248K USDC",
  };
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
            // onClick={() => handleDrawdown()}
          >
            ✕
          </label>
          <h3
            style={{ borderBottom: "2px solid #292C33" }}
            className="font-bold text-lg py-3 px-4"
          >
            Withdraw Funds
          </h3>
          <div style={{ display: "flex" }} className="justify-center my-6">
            <img
              style={{ borderRadius: "50%" }}
              className="p-4 bg-secondary opacity-80"
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
                $100,000,000.00 {process.env.REACT_APP_TOKEN_NAME}
              </p>
            </div>
            <small
              style={{ display: "flex", color: "#777E91" }}
              className="justify-end"
            >
              $50,000.00
            </small>
          </div>
          <div className="text-sm py-3 px-4">
            <div style={{ display: "flex" }} className="mb-1">
              <p style={{ display: "flex" }} className="justify-start">
                Pool Name
              </p>
              <p style={{ display: "flex" }} className="justify-end">
                {data?.poolName}
              </p>
            </div>
            <div style={{ display: "flex" }} className="mb-1">
              <p style={{ display: "flex" }} className="justify-start">
                Amount Invested
              </p>
              <p style={{ display: "flex" }} className="justify-end">
                {data?.amountInvested}%
              </p>
            </div>
            <div style={{ display: "flex" }} className="mb-1">
              <p style={{ display: "flex" }} className="justify-start">
                Estimated APY
              </p>
              <p style={{ display: "flex" }} className="justify-end">
                {data?.estimatedApy}
              </p>
            </div>
            <div style={{ display: "flex" }} className="mb-0">
              <p style={{ display: "flex" }} className="justify-start">
                Available for withdrawal
              </p>
              <p style={{ display: "flex" }} className="justify-end">
                {data?.availableForWithdrawal}
              </p>
            </div>
          </div>

          <div
            class="flex justify-center"
            style={{ display: "flex", marginTop: -6 }}
          >
            <div class="mb-3">
              <label
                for="exampleNumber0"
                class="form-label inline-block mb-0  text-white rounded-box"
                style={{ fontSize: 14 }}
              >
                Enter Amount
              </label>
              <input
                type="number"
                class="
        form-control
        block
        w-96
        h-57
        px-3
        py-1.5
        text-base
        font-normal
        text-white
        bg-base-100 bg-clip-padding
        border border-solid border-[#3A3C43] 
        rounded
        transition
        ease-in-out
        m-0
        focus:text-white focus:bg-base-100 focus:border-base-300 focus:outline-none
      "
                id="exampleNumber0"
                placeholder="0.0"
              />
            </div>
          </div>

          <div className="modal-action mx-4 mt-2 mb-4">
            <PrimaryButton width="w-full" disable={true}>
              Withdraw Funds
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFundsModal;
