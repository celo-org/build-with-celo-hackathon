import React, { useState, useEffect } from "react";
import GradientButton from "../../tools/Button/GradientButton";
import WithdrawCard from "./components/Cards/WithdrawCard";
import {
  getAllWithdrawableOpportunities,
  getUserSeniorPoolInvestment,
  getWalletBal,
  getSeniorPoolDisplaySharePrice,
  getJuniorWithdrawableOp
} from "../../components/transaction/TransactionHelper";
import { retrieveFiles } from "../../services/web3storageIPFS";
import { getBinaryFileData } from "../../services/fileHelper";
import { getDisplayAmount } from "../../services/displayTextHelper";

import WithdrawFundsModal from "./components/Modal/WithdrawFundsModal";

const Withdraw = () => {
  const [seniorPool, setSeniorPool] = useState();
  const [juniorPools, setJuniorPools] = useState([]);
  const [selected, setSelected] = useState();
  const [seniorPoolInvestment, setSeniorPoolInvestment] = useState();

  const handleForm = () => {
    setSelected(null);
  };

  useEffect(() => {
    getUserSeniorPoolInvestment()
      .then((data) => {
        setSeniorPoolInvestment(data);
      })
      .catch((error) => console.log("Failed to get senior pool investment"));
  }, []);

  useEffect(() => {
    if (seniorPoolInvestment) {
      // fetch data from IPFS
      retrieveFiles(process.env.REACT_APP_SENIORPOOL_CID, true).then((res) => {
        if (res) {
          let read = getBinaryFileData(res);
          read.onloadend = async function () {
            try {
              let spJson = JSON.parse(read.result);
              if (spJson) {
                let seniorInvestmentData = {};
                seniorInvestmentData.poolName = spJson.poolName;
                seniorInvestmentData.opportunityAmount = getDisplayAmount(
                  await getWalletBal(process.env.REACT_APP_SENIORPOOL)
                );

                let totalInvestment =
                  seniorPoolInvestment.stakingAmt +
                  seniorPoolInvestment.withdrawableAmt;
                seniorInvestmentData.capitalInvested =
                  getDisplayAmount(totalInvestment);
                const { sharePrice, displaySharePrice } =
                  await getSeniorPoolDisplaySharePrice(spJson.estimatedAPY);
                seniorInvestmentData.estimatedAPY = displaySharePrice;
                seniorInvestmentData.withdrawableAmt = getDisplayAmount(
                  seniorPoolInvestment.withdrawableAmt
                );
                setSeniorPool(seniorInvestmentData);
              }
            } catch (error) {
              console.log(error);
            }
          };
        }
      });
    }
  }, [seniorPoolInvestment]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const opportunities = await getJuniorWithdrawableOp();
        setJuniorPools(opportunities);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="px-5">
        {selected && <WithdrawFundsModal handleForm={handleForm} />}
        <div
          style={{ display: "flex" }}
          className="items-center justify-between mb-14 "
        >
          <h2
            className="text-left font-bold text-white"
            style={{ fontSize: 28, marginLeft: -20 }}
          >
            Withdraw
          </h2>
          <label
            htmlFor="InvestModal"
            style={{
              borderRadius: "100px",
              padding: "12px 15px",
              color: "white",
              marginRight: 8,
            }}
            className={`btn btn-wide bg-gradient-to-r from-[#4B74FF] to-[#9281FF] hover:from-[#9281FF] hover:to-[#4B74FF] capitalize font-medium border-none`}
            onClick={() => setSelected(true)}
          >
            +Invest
          </label>
        </div>
      </div>
      {seniorPool ? (
        <div className="mb-16 ">
          <h2 style={{ fontSize: 24 }} className=" mb-5">
            Senior pools
          </h2>
          <div style={{ display: "flex" }} className="gap-4 w-1/2">
            <WithdrawCard data={seniorPool} setSelected={setSelected} />
          </div>
        </div>
      ) : (
        ""
      )}

      {juniorPools.length === 0 ? (
        <div style={{ display: "flex" }} className="justify-center">
          <div style={{ color: "#64748B", fontSize: 18, marginTop: 10 }}>
            No stats are available. Explore opportunities here.
          </div>
        </div>
      ) : (
        <div className="mb-16">
          <h2 className="text-xl mb-5" style={{ fontSize: 24 }}>
            Junior pools
          </h2>
          <div style={{ display: "flex" }} className=" gap-4">
            {juniorPools.map((item) => (
              <WithdrawCard data={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Withdraw;
<h2>Invest</h2>;
