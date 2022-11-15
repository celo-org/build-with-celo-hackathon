import GradientButton from "../../../../tools/Button/GradientButton";
import ArrowLeft from "../../Components/SVG/ArrowLeft";

export default function Final({ handlePrev, finalSubmit, formData }) {
  const handleClick = () => {
    finalSubmit(formData);
  };
  return (
    <div className="">
      <div className="font-light">
        <h4
          className="text-primary font-normal mb-2"
          style={{ fontSize: 16, fontWeight: 600, color: "#9281FF" }}
        >
          Loan Details
        </h4>
        <div
          style={{ display: "flex", fontSize: 16 }}
          className="justify-between mb-2"
        >
          <p>
            Pool Name: <span>{formData.loan_name}</span>
          </p>
          <p>
            Loan Amount: <span>{formData.loan_amount}</span>
          </p>
        </div>
        <div style={{ display: "flex" }} className="justify-between mb-2">
          <p>
            Loan Tenure: <span>{formData.loan_tenure}</span>
          </p>
          <p>
            Repayment Frequency: <span>{formData.payment_frequency}</span>
          </p>
        </div>
        <div style={{ display: "flex" }} className="justify-between mb-2">
          <p>
            Loan Interest: <span>{formData.loan_interest}</span>
          </p>
          <p>
            Loan Type:{" "}
            <span>{formData.loan_type == 1 ? "Term Loan" : "Bullet Loan"}</span>
          </p>
        </div>
        <div style={{ display: "flex" }} className="justify-between mb-2">
          <p>
            Loan Purpose: <span>{formData.loan_purpose}</span>
          </p>
        </div>
      </div>
      <div className="font-light">
        <h4
          className="text-primary font-normal mb-2"
          style={{ fontSize: 16, fontWeight: 600, color: "#9281FF" }}
        >
          Collateral
        </h4>
        <div style={{ display: "flex" }} className="justify-between mb-2">
          <p>
            Collateral Name: <span>{formData.collateral_document_name}</span>
          </p>
          <p>
            Collateral File: <span>{formData.collateral_document.name}</span>
          </p>
        </div>
        <div style={{ display: "flex" }} className="justify-between mb-2">
          <p>
            Collateral Document Description:{" "}
            <span>{formData.collateral_document_description}</span>
          </p>
        </div>
      </div>

      <div
        style={{ display: "flex", marginTop: 20 }}
        className="flex-row justify-between w-full items-center content-center "
      >
        <div
          style={{ display: "flex" }}
          className="justify-center flex-row w-1/3 ml-10"
        >
          <label
            onClick={handlePrev}
            className="text-gray-500 flex-row"
            style={{
              cursor: "pointer",
              marginLeft: 5,
              display: "flex",
            }}
          >
            <ArrowLeft color="#64748B" />
            Back
          </label>
        </div>
        <GradientButton type="submit" onClick={handleClick}>
          Submit
        </GradientButton>
      </div>

      <div style={{ display: "flex" }} className="m-5 justify-center">
        <div style={{ fontWeight: 600, fontSize: "14px", color: "#FBBF24" }}>
          Note - This pool created will only be valid for 60 days from the day
          after verification{" "}
        </div>
      </div>
    </div>
  );
}
