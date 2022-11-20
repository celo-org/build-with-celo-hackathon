import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getBinaryFileData } from "../../../services/fileHelper";
import { retrieveFiles } from "../../../services/web3storageIPFS";

const TransactionsCard = ({ data }) => {
  const [companyName, setCompanyName] = useState();
  const [poolName, setPoolName] = useState();

  // fetch the opportunity details from IPFS
  retrieveFiles(data?.opportunityInfo, true).then((res) => {
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

  return (
    <div
      style={{ backgroundColor: "#20232A", borderRadius: "12px" }}
      className=" mb-2"
    >
      <div
        style={{ display: "flex" }}
        className="collapse-title text-md font-light justify-around w-full"
      >
        <p className="w-1/6 text-center">{poolName}</p>
        <p className="w-1/6 text-center">{companyName}</p>
        <p className="w-1/6 text-center">{data?.createdOn}</p>

        {(data?.status == "2" || data?.status >= "4" ) && (
          <p className="w-1/6 text-center">
            <div
              style={{
                borderRadius: "35px",
                padding: "5px 8px",
                background:
                  "linear-gradient(97.78deg, #51B960 7.43%, #51B960 7.43%, #51B960 7.43%, #83DC90 90.63%)",
                border: "none",
              }}
              className="btn btn-xs btn-success"
            >
              Approved
            </div>
          </p>
        )}
        {data?.status == "1" && (
          <p className="w-1/6 text-center">
            <div
              style={{
                borderRadius: "35px",
                padding: "5px 8px",
                background:
                  "linear-gradient(97.67deg, #E73838 1.07%, #FFBABA 100%)",
                border: "none",
              }}
              className="btn btn-xs btn-error"
            >
              Rejected
            </div>
          </p>
        )}
        {data?.status == "3" && (
          <p className="w-1/6 text-center">
            <div
              style={{
                borderRadius: "35px",
                padding: "5px 8px",
                background:
                  "linear-gradient(276.08deg, rgba(255, 255, 255, 0.04) 2.02%, rgba(255, 255, 255, 0.4) 2.03%, #FFFFFF 99.33%)",
                border: "none",
              }}
              className="btn btn-xs btn-warning"
            >
              Unsure
            </div>
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionsCard;
