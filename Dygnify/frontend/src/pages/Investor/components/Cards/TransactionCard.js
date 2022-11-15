import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { convertDate } from "../../../../components/transaction/TransactionHelper";
import {
  getTrimmedWalletAddress,
  getDisplayAmount,
} from "../../../../services/displayTextHelper";

const TransactionCard = ({ data, address }) => {
  const [userAddress, setUserAddress] = useState();
  const [isWithdraw, setIsWithdraw] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();

  function getUserAddress() {
    if (data.from == address) {
      setUserAddress(getTrimmedWalletAddress(data.to));
      setIsWithdraw(true);
    } else {
      setUserAddress(getTrimmedWalletAddress(data.from));
      setIsWithdraw(false);
    }
  }

  useEffect(() => {
    if (data && address) {
      getUserAddress();
      let amt = ethers.utils.formatUnits(data.value, data.tokenDecimal);
      setAmount(getDisplayAmount(amt));
      setDate(convertDate(data.timeStamp));
    }
  }, []);
  return (
    <div
      style={{ backgroundColor: "#20232A", borderRadius: "12px" }}
      className=" mb-2"
    >
      <div
        style={{ display: "flex" }}
        className="collapse-title text-md font-light justify-around w-full"
      >
        <p className="w-1/4 text-center">{userAddress ? userAddress : ""}</p>
        <p className="w-1/4 text-center">
          {isWithdraw ? "Withdrawal" : "Deposit"}
        </p>
        <p className="w-1/4 text-center">
          {amount ? (
            <>
              {isWithdraw ? "-" : "+"} {amount}
            </>
          ) : (
            ""
          )}
        </p>
        <p className="w-1/4 text-center">{date ? date : ""}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
