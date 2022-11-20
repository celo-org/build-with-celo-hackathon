import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../tools/Button/PrimaryButton";
import { getBinaryFileData } from "../../../services/fileHelper";
import { retrieveFiles } from "../../../services/web3storageIPFS";

const UnderwriterCard = ({ data }) => {
  const path = useNavigate();
  const [companyName, setCompanyName] = useState();
  const [poolName, setPoolName] = useState();
  const [poolDetails, setPoolDetails] = useState();

  useEffect(() => {
    // fetch the opportunity details from IPFS
    retrieveFiles(data?.opportunityInfo, true).then((res) => {
      if (res) {
        let read = getBinaryFileData(res);
        read.onloadend = function () {
          let opJson = JSON.parse(read.result);
          if (opJson) {
            setCompanyName(opJson.company_name);
            setPoolName(opJson.loanName);
            setPoolDetails({ ...data, ...opJson });
            console.log(opJson);
          }
        };
      }
    });
  }, []);

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
        src="/assets/Dygnify_Image.png"
        style={{ width: 150, height: 150 }}
      />
      <div style={{ marginLeft: 32, width: 400 }}>
        <div style={{ display: "flex", marginTop: -10 }} className="flex-col">
          <p className="card-title mb-0" style={{ fontSize: 23 }}>
            {poolName}
          </p>
          <p
            className="card-title mb-4 mt-0"
            style={{ fontSize: 16, fontWeight: 400 }}
          >
            {companyName}
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
            {data.opportunityAmount} {process.env.REACT_APP_TOKEN_NAME}
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p
            style={{ display: "flex", fontSize: 16 }}
            className="justify-start"
          >
            Interest Rate
          </p>
          <p style={{ display: "flex", fontSize: 16 }} className="justify-end">
            {data.loanInterest}
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p
            style={{ display: "flex", fontSize: 16 }}
            className="justify-start"
          >
            Created On
          </p>
          <p style={{ display: "flex", fontSize: 16 }} className="justify-end">
            {data.createdOn}
          </p>
        </div>

        <div style={{ marginTop: 28 }}>
          <PrimaryButton
            disable={false}
            onClick={() =>
              path("/underwriterDashboard/poolDetail", { state: poolDetails })
            }
          >
            View Details
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default UnderwriterCard;
