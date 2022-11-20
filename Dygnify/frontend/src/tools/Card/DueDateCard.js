import React from "react";

const DueDateCard = ({ data }) => {
  return (
    <div
      style={{ backgroundColor: "#20232A", borderRadius: "12px" }}
      className=" mb-2"
    >
      <div
        style={{ display: "flex" }}
        className="collapse-title text-md font-light justify-around w-full"
      >
        <p className="w-1/4 text-center">{data?.opportunity_name}</p>
        <p className="w-1/4 text-center">
          {data?.loan_amount} {process.env.REACT_APP_TOKEN_NAME}
        </p>
        <p className="w-1/4 text-center">
          {data?.principal_amount + data?.interest_amount}{" "}
          {process.env.REACT_APP_TOKEN_NAME}{" "}
          <sup
            style={{ backgroundColor: "#323A46", borderRadius: "50%" }}
            className="ml-1 tooltip p-2"
            data-tip={`Principle - ${data?.principal_amount} ${process.env.REACT_APP_TOKEN_NAME}, Interest - ${data?.interest_amount} ${process.env.REACT_APP_TOKEN_NAME}`}
          >
            <button>i</button>
          </sup>
        </p>
        <p className="w-1/4 text-center">{data?.repayment_date}</p>
      </div>
    </div>
  );
};

export default DueDateCard;
