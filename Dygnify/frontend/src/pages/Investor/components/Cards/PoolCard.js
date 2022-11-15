import React, { useState, useEffect } from "react";
import { getBinaryFileData } from "../../../../services/fileHelper";
import { retrieveFiles } from "../../../../services/web3storageIPFS";

const PoolCard = ({ data }) => {
  const {
    opportunityInfo,
    opportunityAmount,
    estimatedAPY,
    capitalInvested,
    yieldGenerated,
  } = data;

  const [companyName, setCompanyName] = useState();
  const [poolName, setPoolName] = useState(data.poolName);

  useEffect(() => {
    // fetch the opportunity details from IPFS
    retrieveFiles(opportunityInfo, true).then((res) => {
      if (res) {
        let read = getBinaryFileData(res);
        read.onloadend = function () {
          let opJson = JSON.parse(read.result);
          if (opJson) {
            setCompanyName(opJson.company_name);
            setPoolName(opJson.loanName);
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
          <p style={{ display: "flex" }} className="justify-start ">
            Pool Size
          </p>
          <p style={{ display: "flex" }} className="justify-end">
            {opportunityAmount} {process.env.REACT_APP_TOKEN_NAME}
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p style={{ display: "flex" }} className="justify-start">
            Capital Invested
          </p>
          <p style={{ display: "flex" }} className="justify-end">
            {capitalInvested}
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p style={{ display: "flex" }} className="justify-start">
            Estimated APY
          </p>
          <p style={{ display: "flex" }} className="justify-end">
            {estimatedAPY}
          </p>
        </div>
        <div style={{ display: "flex" }} className="mb-1">
          <p style={{ display: "flex" }} className="justify-start">
            Yield Generated
          </p>
          <p style={{ display: "flex" }} className="justify-end">
            {yieldGenerated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
