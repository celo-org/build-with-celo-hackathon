import React from "react";
import { useNavigate } from "react-router-dom";
import GradientButton from "../../tools/Button/GradientButton";

const DashboardHeader = ({
  setSelected,
  setKycSelected,
  kycStatus,
  profileStatus,
}) => {
  return (
    <div
      style={{ display: "flex" }}
      className="items-center justify-between mb-14"
    >
      <h2 className="text-left first-line:text-3xl font-bold text-white">
        Borrower Dashboard
      </h2>
      <label
        htmlFor={
          !kycStatus || !profileStatus ? "kycAlertModal" : `loanForm-modal`
        }
        style={{
          borderRadius: "100px",
          padding: "12px 24px",
          color: "white",
          marginRight: 8,
        }}
        className={`btn btn-wide bg-gradient-to-r from-[#4B74FF] to-[#9281FF] hover:from-[#9281FF] hover:to-[#4B74FF] capitalize font-medium border-none`}
        onClick={() => {
          if (!kycStatus || !profileStatus) return setKycSelected(true);
          setSelected(true);
        }}
      >
        Borrow Request
      </label>
    </div>
  );
};

export default DashboardHeader;
