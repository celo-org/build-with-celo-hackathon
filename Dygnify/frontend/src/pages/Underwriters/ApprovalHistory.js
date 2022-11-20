import React, { useEffect, useState } from "react";
import TransactionsCard from "../Underwriters/Components/TransactionsCard";
import { getApprovalHistory } from "../../components/transaction/TransactionHelper";

const ApprovalHistory = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(async () => {
    await getHistory();
  }, []);

  async function getHistory() {
    let list = await getApprovalHistory();
    console.log(list);
    setTransactions(list);
  }

  return (
    <div className="mb-16">
      <h2 className="text-2xl mb-6">Transaction History</h2>
      {transactions.length == 0 ? (
        <div style={{ display: "flex" }} className="justify-center">
          <div style={{ color: "#64748B", fontSize: 18, marginTop: 10 }}>
            No Borrow requests are present at the moment.
          </div>
        </div>
      ) : (
        <div>
          <div className="collapse mb-3">
            <input type="checkbox" className="peer" />
            <div
              style={{
                display: "flex",
                borderTop: "1px solid #20232A",
                borderBottom: "1px solid #20232A",
              }}
              className="collapse-title text-md font-normal justify-around w-full"
            >
              <p className="w-1/6 text-center">Pool Name</p>
              <p className="w-1/6 text-center">Company Name</p>
              <p className="w-1/6 text-center">Created On</p>
              <p className="w-1/6 text-center">Decision</p>
            </div>
          </div>
          <div>
            {transactions
              ? transactions.map((item) => (
                  <TransactionsCard key={transactions.id} data={item} />
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalHistory;
