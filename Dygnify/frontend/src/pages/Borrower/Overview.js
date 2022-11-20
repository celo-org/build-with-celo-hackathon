import React, { useState, useEffect } from "react";
import PieGraph from "../../investor/components/PieChart";
import DrawdownCard from "../../tools/Card/DrawdownCard";
import DueDateCard from "../../tools/Card/DueDateCard";
import RepaymentCard from "../../tools/Card/RepaymentCard";
import LoanFormModal from "../../tools/Modal/LoanFormModal";
import DashboardHeader from "./DashboardHeader";
import {
  getOpportunitiesWithDues,
  getDrawdownOpportunities,
  getBorrowerDetails,
  getUserWalletAddress,
} from "../../components/transaction/TransactionHelper";
import DoughnutChart from "../Components/DoughnutChart";
import ProcessingRequestModal from "./Components/Modal/processingRequestModal";
import { getDisplayAmount } from "../../services/displayTextHelper";
import KycCheckModal from "./Components/Modal/KycCheckModal";
import axiosHttpService from "../../services/axioscall";
import { kycOptions } from "../../services/KYC/blockpass";

const Overview = () => {
  const [drawdownList, setDrawdownList] = useState([]);
  const [repaymentList, setRepaymentList] = useState([]);
  const [totalBorrowedAmt, setTotalBorrowedAmt] = useState("--");
  const [totalOutstandingAmt, setTotalOutstandingAmt] = useState("--");
  const [totalRepaidAmt, setTotalRepaidAmt] = useState("--");
  const [nextDueDate, setNextDueDate] = useState();
  const [nextDueAmount, setNextDueAmount] = useState();
  const [selected, setSelected] = useState(null);
  const [kycSelected, setKycSelected] = useState();
  const [kycStatus, setKycStatus] = useState();
  const [profileStatus, setProfileStatus] = useState();

  const handleForm = () => {
    setSelected(null);
    setKycSelected(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      let opportunities = await getDrawdownOpportunities();
      if (opportunities && opportunities.length) {
        setDrawdownList(opportunities);
      }
    };
    fetchData();
    getUserWalletAddress().then((address) => checkForKycAndProfile(address));
  }, []);

  function sortByProperty(property) {
    return function (a, b) {
      if (a[property] < b[property]) return 1;
      else if (a[property] > b[property]) return -1;

      return 0;
    };
  }

  const checkForKycAndProfile = async (refId) => {
    try {
      const result = await axiosHttpService(kycOptions(refId));

      if (result.res.status === "success") setKycStatus(true);
      if (result.res.status === "error") {
        setKycStatus(false);
      }

      getBorrowerDetails().then((borrowerCID) => {
        console.log(borrowerCID);
        if (borrowerCID) setProfileStatus(true);
        else setProfileStatus(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get all upcoming reapayments
  useEffect(() => {
    const fetchData = async () => {
      let opportunities = await getOpportunitiesWithDues();
      if (opportunities && opportunities.length) {
        //sort the list based on date
        opportunities.sort(sortByProperty("epochDueDate"));
        setRepaymentList(opportunities);

        // set next due date and amount
        setNextDueAmount(opportunities[0].repaymentAmount);
        setNextDueDate(opportunities[0].nextDueDate);

        console.log(repaymentList, nextDueAmount);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // set total borrowed amount
    let totalLoanAmt = 0;
    let totalLoanWithIntAmount = 0;
    let totalRepaidAmt = 0;
    for (const op of repaymentList) {
      let loanAmt = parseFloat(op.actualLoanAmount);
      totalLoanAmt += loanAmt;
      totalLoanWithIntAmount +=
        loanAmt +
        parseFloat((loanAmt * parseFloat(op.loanActualInterest)) / 100);
      totalRepaidAmt += op.totalRepaidAmount;
    }
    if (totalLoanAmt > 0) {
      setTotalBorrowedAmt("$" + getDisplayAmount(totalLoanAmt));
    }

    totalRepaidAmt = totalRepaidAmt ? totalRepaidAmt : 0;
    if (totalRepaidAmt > 0) {
      setTotalRepaidAmt(getDisplayAmount(totalRepaidAmt));
    }
    if (totalLoanWithIntAmount) {
      setTotalOutstandingAmt(
        getDisplayAmount(totalLoanWithIntAmount - totalRepaidAmt)
      );
    }
  }, [repaymentList]);

  return (
    <div>
      <DashboardHeader
        setSelected={setSelected}
        kycStatus={kycStatus}
        profileStatus={profileStatus}
        setKycSelected={setKycSelected}
      />
      {selected && (
        <LoanFormModal
          key={drawdownList?.id}
          data={drawdownList}
          handleForm={handleForm}
        />
      )}

      {kycSelected ? (
        <KycCheckModal kycStatus={kycStatus} profileStatus={profileStatus} />
      ) : (
        <></>
      )}

      <div style={{ display: "flex" }} className="w-full my-10">
        <div
          style={{
            backgroundColor: "#191D23",
            boxShadow: "4px 4px 10px -32px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            display: "flex",
          }}
          className="w-1/4 mr-4 px-4 py-4 justify-center flex-col"
        >
          <h1 className="font-semibold text-5xl text-green-400">
            {totalBorrowedAmt ? totalBorrowedAmt : "--"}
          </h1>
          <p className="text-xl">Total Amount Borrowed</p>
        </div>
        <div
          style={{
            backgroundColor: "#191D23",
            //boxShadow: "4px 4px 10px -32px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            padding: 15,
            height: 300,
            display: "flex",
          }}
          className="flex-row w-1/2 items-center justify-between"
        >
          <div
            style={{ display: "flex", color: "red" }}
            className="flex-col justify-center"
          >
            <div style={{ display: "flex" }} className="flex-row items-center">
              <div
                style={{
                  height: 8,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: "#5375FE",
                  margin: 5,
                }}
              />
              <div style={{ fontSize: 14, fontWeight: 400, color: "#777E91" }}>
                Total Outstanding
              </div>
            </div>
            <div
              style={{ fontSize: 28, color: "white", marginLeft: 20 }}
              className="mb-10"
            >
              {totalOutstandingAmt}
            </div>

            <div style={{ display: "flex" }} className="flex-row items-center">
              <div
                style={{
                  height: 8,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: "white",
                  margin: 5,
                }}
              />
              <div style={{ fontSize: 14, fontWeight: 400, color: "#777E91" }}>
                Total Repaid
              </div>
            </div>
            <div style={{ fontSize: 28, color: "white", marginLeft: 20 }}>
              {totalRepaidAmt}
            </div>
          </div>
          <div style={{ marginRight: 20 }}>
            <DoughnutChart
              data={[92, 8]}
              color={["#5375FE", "#ffffff"]}
              width={200}
              labels={[
                "Elevation Capital 300USDC",
                "Elevation Capital 300USDC",
              ]}
              borderWidth={[1, 8]}
              legendStyle={{ display: false }}
            />
          </div>
        </div>
        <div
          style={{ boxShadow: "4px 4px 10px -32px rgba(0, 0, 0, 0.1)" }}
          className="w-1/4 ml-4"
        >
          <div
            style={{
              backgroundColor: "#191D23",
              borderRadius: "16px",
              height: 140,
            }}
            className="mb-4 px-4 py-4"
          >
            <h3 className=" text-3xl text-purple-100">
              {nextDueAmount ? nextDueAmount : "- -"}
            </h3>
            <p className="text-base font-semibold text-gray-500">
              Next Due Amount
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#191D23",
              borderRadius: "16px",
              height: 140,
            }}
            className="px-4 py-4"
          >
            <h3 className="text-3xl text-purple-100">
              {nextDueDate ? nextDueDate : "- -"}
            </h3>
            <p className="text-base font-semibold text-gray-500">
              Next Due Date
            </p>
          </div>
        </div>
      </div>
      <div className="mb-16 text-xl">
        <h2 className="mb-2">Repayment Notification</h2>
        {repaymentList.length === 0 ? (
          <div
            style={{ display: "flex", marginTop: 20 }}
            className="justify-center"
          >
            <div style={{ color: "#64748B", fontSize: 18 }}>
              No repayment available.
            </div>
          </div>
        ) : (
          <div style={{ display: "flex" }} className="gap-4">
            {repaymentList.map((item) => (
              <RepaymentCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
      <div className="mb-16">
        <h2 className="mb-2 text-xl">Drawdown Funds</h2>

        {drawdownList.length === 0 ? (
          <div
            style={{ display: "flex", marginTop: 20 }}
            className="justify-center"
          >
            <div style={{ color: "#64748B", fontSize: 18 }}>
              No drawdown available.
            </div>
          </div>
        ) : (
          <div style={{ display: "flex" }} className=" gap-4">
            {drawdownList.map((item) => (
              <DrawdownCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
      <div className="mb-16">
        <h2 className="mb-2 text-xl">Upcoming Due Dates</h2>
        <div className="collapse mb-3">
          <input type="checkbox" className="peer" />
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #20232A",
              borderBottom: "1px solid #20232A",
            }}
            className="collapse-title text-md font-light justify-around w-full"
          >
            <p className="w-1/4 text-center">Pool Name</p>
            <p className="w-1/4 text-center">Capital Borrowed</p>
            <p className="w-1/4 text-center">Amount Due</p>
            <p className="w-1/4 text-center">Due Date</p>
          </div>
        </div>
        {repaymentList.length === 0 ? (
          <div
            style={{ display: "flex", marginTop: 40 }}
            className="justify-center"
          >
            <div style={{ color: "#64748B", fontSize: 18 }}>
              No due dates available.
            </div>
          </div>
        ) : (
          <div>
            {repaymentList.map((item) => (
              <DueDateCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Overview;
