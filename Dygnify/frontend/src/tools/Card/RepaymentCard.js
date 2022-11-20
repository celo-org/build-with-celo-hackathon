import React, { useState, useEffect } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import RepaymentModal from "../Modal/RepaymentModal";
import { getBinaryFileData } from "../../services/fileHelper";
import { retrieveFiles } from "../../services/web3storageIPFS";

const RepaymentCard = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const handleRepayment = async () => {
    setSelected(null);
  };
  const { opportunityInfo, opportunityAmount, loanInterest, isFull } = data;

  const [poolName, setPoolName] = useState(data.poolName);

  useEffect(() => {
    // fetch the opportunity details from IPFS
    retrieveFiles(opportunityInfo, true).then((res) => {
      if (res) {
        let read = getBinaryFileData(res);
        read.onloadend = function () {
          let opJson = JSON.parse(read.result);
          if (opJson) {
            setPoolName(opJson.loanName);
          }
        };
      }
    });
  }, []);
  return (
    <div
      style={{ boxShadow: `1px 1px 1px rgba(185, 185, 185, 0.1)` }}
      className="card text-white w-1/3"
    >
      <div
        style={{
          background: `linear-gradient(302.85deg, rgba(168, 154, 255, 0) -1.23%, rgba(168, 154, 255, 0.260833) 99.99%, rgba(168, 154, 255, 0.8) 100%`,
          borderRadius: "16px",
        }}
        className="card-body"
      >
        <h2 className="card-title mb-4">{poolName} </h2>
        <div className="text-sm">
          <div style={{ display: "flex" }} className="mb-2">
            <p style={{ display: "flex" }} className="justify-start">
              Capital Borrowed
            </p>
            <p style={{ display: "flex" }} className="justify-end">
              {data?.opportunityAmount} {process.env.REACT_APP_TOKEN_NAME}
            </p>
          </div>
          <div style={{ display: "flex" }} className="mb-2">
            { 
              data?.isOverDue ?
                <p style={{ display: "flex", color: "#EF4444" }} className="justify-start">
                  Overdue Amount
                </p>
              :
                <p style={{ display: "flex" }} className="justify-start">
                  Due Amount
                </p>
            }
            <p style={{ display: "flex", color: `${data?.isOverDue ? "#EF4444" : "white"}` }} className="justify-end">
              {data?.repaymentDisplayAmount} {process.env.REACT_APP_TOKEN_NAME}
            </p>
          </div>
          <div style={{ display: "flex" }} className="mb-2">
            <p style={{ display: "flex" }} className="justify-start">
              Due Date
            </p>
            <p style={{ display: "flex" }} className="justify-end">
              {data?.nextDueDate}
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
            className={`btn btn-secondary w-full bg-blue-500 hover:bg-blue-500 capitalize font-medium border-none`}
            onClick={() => setSelected(data)}
          >
            Make Repayment
          </label>
        </div>
        {selected && (
          <RepaymentModal
            key={data?.id}
            data={selected}
            handleRepayment={handleRepayment}
            poolName = {poolName}
          ></RepaymentModal>
        )}
      </div>
    </div>
  );
};

export default RepaymentCard;
