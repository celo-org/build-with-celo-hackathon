import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GradientButton from "../../tools/Button/GradientButton";
import TransactionCard from "./components/Cards/TransactionCard";
import axiosHttpService from "../../services/axioscall";
import { tokenTransactions } from "../../services/blockchainTransactionDataOptions";
import { kycOptions } from "../../services/KYC/blockpass";
import Alert from "../Components/Alert";
import InvestModal from "./components/Modal/InvestModal";
import {
  getUserWalletAddress,
  getWalletBal,
} from "../../components/transaction/TransactionHelper";
import { getDisplayAmount } from "../../services/displayTextHelper";

const ViewSeniorPool = () => {
  const location = useLocation();
  const defaultPoolName = "Senior Pool";
  const defaultAPY = "10";
  const defaultPoolAmount = 0;
  const [transactionData, setTransactionData] = useState([]);
  const [poolName, setPoolName] = useState(defaultPoolName);
  const [poolDescription, setPoolDescription] = useState();
  const [estimatedAPY, setEstimatedAPY] = useState(defaultAPY);
  const [poolAmount, setPoolAmount] = useState(defaultPoolAmount);
  const [selected, setSelected] = useState(null);

  const [kycStatus, setKycStatus] = useState();
  const [error, setError] = useState();

  const handleDrawdown = () => {
    setSelected(null);
  };

  useEffect(() => {
    getUserWalletAddress().then((address) => loadBlockpassWidget(address));
  }, []);

  const loadBlockpassWidget = (address) => {
    const blockpass = new window.BlockpassKYCConnect(
      process.env.REACT_APP_CLIENT_ID,
      {
        refId: address, // assign the local user_id of the connected user
      }
    );

    blockpass.startKYCConnect();

    blockpass.on("KYCConnectSuccess", () => {
      //add code that will trigger when data have been sent.
    });
  };

  useEffect(() => {
    axiosHttpService(tokenTransactions(process.env.REACT_APP_SENIORPOOL)).then(
      (transactionDetails) => {
        if (transactionDetails && transactionDetails.res) {
          setTransactionData(transactionDetails.res.result);
        }
      }
    );

    getWalletBal(process.env.REACT_APP_SENIORPOOL).then((amt) => {
      setPoolAmount(getDisplayAmount(amt));
    });
  }, []);

  useEffect(() => {
    if (location.state) {
      setPoolName(
        location.state.poolName ? location.state.poolName : defaultPoolName
      );
      setPoolDescription(
        location.state.poolDescription ? location.state.poolDescription : ""
      );
      setEstimatedAPY(
        location.state.estimatedAPY ? location.state.estimatedAPY : defaultAPY
      );
      setKycStatus(location.state.kycStatus ? location.state.kycStatus : false);
    }
  }, []);

  return (
    <>
      {selected ? (
        <InvestModal handleDrawdown={handleDrawdown} isSenior={true} />
      ) : null}

      <div style={{ fontSize: 28 }} className="mb-0">
        {poolName}
      </div>

      <div
        className="flex-row justify-between items w-full"
        style={{ display: "flex" }}
      >
        <div style={{ display: "flex" }} className="flex-col w-1/2 ">
          <div
            style={{ display: "flex" }}
            className="flex-row justify-between mt-10 mb-3"
          >
            <div style={{ fontSize: 19 }} className="mb-0">
              Pool Overview
            </div>
          </div>
          <div>{poolDescription}</div>
        </div>
        <div className="w-1/2">
          <div
            style={{
              background: `linear-gradient(285.83deg, rgba(32, 35, 42, 0) 0%, #20232A 103.08%)`,
            }}
            className="rounded-box p-5 mt-10 ml-24"
          >
            <div
              style={{ display: "flex" }}
              className="flex-row justify-between pb-2"
            >
              <h2 style={{ fontSize: 19 }}>Estimated APY.</h2>
              <h2 style={{ fontSize: 28 }}>{estimatedAPY}%</h2>
            </div>
            <div
              style={{ display: "flex" }}
              className="flex-row justify-between pb-2"
            >
              <h2 style={{ fontSize: 19 }}>Total Pool Balance</h2>
              <h2 style={{ fontSize: 28 }}>{poolAmount}</h2>
            </div>

            <label
              htmlFor={kycStatus ? "InvestModal" : ""}
              id={kycStatus ? "" : "blockpass-kyc-connect"}
              style={{
                borderRadius: "100px",
                padding: "12px 24px",
                color: "white",
              }}
              className={`btn btn-wide bg-gradient-to-r from-[#4B74FF] to-[#9281FF] hover:from-[#9281FF] hover:to-[#4B74FF] capitalize font-medium border-none `}
              onClick={() => {
                if (kycStatus) return setSelected(true);
                else return null;
              }}
            >
              {kycStatus ? "Invest" : "Complete your KYC"}
            </label>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "50px", fontSize: 19, marginBottom: "20px" }}>
        Recent Activity
      </div>
      {transactionData.length > 0 ? (
        <div className="w-1/2">
          {transactionData ? (
            transactionData.map((item) => (
              <TransactionCard
                key={transactionData.blockHash}
                data={item}
                address={process.env.REACT_APP_SENIORPOOL}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      ) : (
        <p>Transaction details are not available at this moment</p>
      )}
    </>
  );
};

export default ViewSeniorPool;
