import React, { useState, useEffect } from "react";

import UnderwriterCard from "./Components/UnderwriterCard";
import { getAllUnderReviewOpportunities } from "../../components/transaction/TransactionHelper";

const BorrowRequest = () => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(async () => {
    await getUnderReviewOpportunity();
  }, []);

  async function getUnderReviewOpportunity() {
    let list = await getAllUnderReviewOpportunities();
    if (list) {
      setOpportunities(list);
    }
  }

  return (
    <div>
      <div className="px-5">
        <div
          style={{ display: "flex" }}
          className="items-center justify-between mb-14 "
        >
          <h2
            className="text-left font-bold text-white"
            style={{ fontSize: 28, marginLeft: -20 }}
          >
            Underwriter's Dashboard
          </h2>
        </div>
      </div>

      {opportunities.length === 0 ? (
        <div style={{ display: "flex" }} className="justify-center">
          <div style={{ color: "#64748B", fontSize: 18, marginTop: 10 }}>
            No Borrow requests are present at the moment.
          </div>
        </div>
      ) : (
        <div className="mb-16 ">
          <div style={{ display: "flex" }} className="gap-4 w-1/2">
            {opportunities &&
              opportunities.map((item) => (
                <UnderwriterCard data={item} key={item.id} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowRequest;
<h2>Invest</h2>;
