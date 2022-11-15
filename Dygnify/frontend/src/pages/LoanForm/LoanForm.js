import {
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollateralDocuments from "./CollateralDocuments";
import ConfirmSubmission from "./ConfirmSubmission";
import LoanDetails from "./LoanDetails";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { createOpportunity } from "../../components/transaction/TransactionHelper";
import { Button } from "@mui/material";
import { storeFiles, makeFileObjects } from "../../services/web3storageIPFS";

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "6rem auto",
    border: "1px solid #999",
  },
  btn: {
    display: "grid",
    width: "70%",
    margin: "0 auto 3rem auto",
  },
});

const LoanForm = () => {
  const classes = useStyles();
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchJSON = async () => {
      const response = await fetch("/company.json");
      let json = await response.json();
      setCompany(json);
    };

    fetchJSON();
  }, []);
  const [formData, setFormData] = useState({
    loan_name: "",
    loan_type: "",
    loan_amount: "",
    loan_purpose: "",
    loan_tenure: "",
    loan_interest: "",
    payment_frequency: "",
  });

  const [processed, setProcessed] = useState(false);
  const path = useNavigate();

  // stroing bigger data in IPFS
  async function onFileUpload(collateral_documents, loan_info) {
    console.log(loan_info);
    try {
      console.log("Upload called");

      let collateralHash = await storeFiles(collateral_documents);

      // make metadata for loan info
      const metadata = {};
      metadata.loanName = loan_info.loan_name;
      metadata.loanPurpose = loan_info.loan_purpose;
      metadata.company_name = company.company_name;
      metadata.company_details = company.company_details;
      let loanInfoFile = makeFileObjects(metadata, `${collateralHash}.json`);
      let loanInfoHash = await storeFiles(loanInfoFile);

      return [collateralHash, loanInfoHash];
    } catch (error) {
      console.log(error);
    }
  }

  const [activeStep, setActiveStep] = useState(0);

  const finalSubmit = async (data) => {
    let {
      loan_name,
      loan_type,
      loan_amount,
      loan_purpose,
      loan_tenure,
      loan_interest,
      capital_loss,
      payment_frequency,
      ...rest
    } = data;
    loan_tenure = loan_tenure * 30;
    const collateral_documents = rest.collateral_document;
    let loanDetails = {
      loan_type: "0",
      loan_amount,
      loan_tenure,
      loan_interest,
      payment_frequency,
      capital_loss,
    };
    console.log(collateral_documents);
    const loan_info = { loan_name, loan_purpose };
    console.log(loanDetails);

    // setActiveStep(prevActiveStep => prevActiveStep + 1);
    const [collateralHash, loanInfoHash] = await onFileUpload(
      collateral_documents,
      loan_info
    );
    loanDetails = { ...loanDetails, collateralHash, loanInfoHash };
    // sending data in backend to create opportunity with hash code
    await createOpportunity(loanDetails);
    setProcessed(true);
  };

  const handleNext = (newData, value) => {
    if (value === true) {
      let temp = { ...formData, ...newData };
      setFormData(temp);
    } else {
      setFormData((prev) => ({ ...prev, ...newData }));
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrev = (newData) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getSteps = () => {
    return ["Loan Details", "Collateral Documents", "Confirm Submission"];
  };

  const steps = getSteps();

  const getStepsContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <LoanDetails
            handleNext={handleNext}
            formData={formData}
          ></LoanDetails>
        );
      case 1:
        return (
          <CollateralDocuments
            handleNext={handleNext}
            handlePrev={handlePrev}
            formData={formData}
          ></CollateralDocuments>
        );
      case 2:
        return (
          <ConfirmSubmission
            handlePrev={handlePrev}
            finalSubmit={finalSubmit}
            formData={formData}
          ></ConfirmSubmission>
        );
      default:
        return "Unknown Step";
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          {processed ? (
            <>
              <Typography
                variant="h5"
                style={{ color: "#999", textAlign: "center", margin: "1rem 0" }}
              >
                <CheckCircleIcon
                  style={{ fontSize: "80px" }}
                  color="success"
                ></CheckCircleIcon>
                <br />
                Loan Request Submitted Successfully
                <br />
                <Button
                  onClick={() => path("/opportunities")}
                  variant="outlined"
                >
                  Back to Dashboard
                </Button>
              </Typography>
            </>
          ) : (
            <Typography
              variant="h5"
              style={{ color: "#999", textAlign: "center", margin: "1rem 0" }}
            >
              <PendingIcon
                style={{ fontSize: "80px" }}
                color="warning"
              ></PendingIcon>
              <br />
              Confirm the transactions to submit Successfully
            </Typography>
          )}
        </>
      ) : (
        <>{getStepsContent(activeStep)}</>
      )}
    </div>
  );
};

export default LoanForm;
