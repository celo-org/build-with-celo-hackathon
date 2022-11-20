import React, { useEffect, useState } from "react";
import { getTransactionHistory } from "../../components/transactionHistory/TransactionGetter";
import TransactionsCard from "../../tools/Card/TransactionsCard";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(async () => {
    console.log("reached");
    let data = await getTransactionHistory();
    setTransactions(data);
    console.log(data);
  }, []);

  useEffect(() => {
    fetch("/transactions.json")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, [transactions]);
  return (
    <div className="mb-16">
      <h2 className="text-2xl mb-6">Transaction History</h2>
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
          <p className="w-1/6 text-center">Pool</p>
          <p className="w-1/6 text-center">Date</p>
          <p className="w-1/6 text-center">Transaction Type</p>
          <p className="w-1/6 text-center">Amount</p>
          <p className="w-1/6 text-center">Status</p>
          <p className="w-1/6 text-center">View on Explorer</p>
        </div>
      </div>
      <div>
        {transactions.map((item) => (
          <TransactionsCard key={transactions.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Transaction;
