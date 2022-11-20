import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOpportunity } from "../../../../../components/transaction/TransactionHelper";

import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import axiosHttpService from "../../../../../services/axioscall";
import {
  pinataCall,
  uploadFileToIPFS,
} from "../../../../../services/PinataIPFSOptions";
import Identity from "./Steps/Identity";
import Incorporation from "./Steps/Incorporation";
import LicenseFinal from "./Steps/LicenseFinal";

const KYBModal = ({ handleForm }) => {
  const [processed, setProcessed] = useState(false);
  const path = useNavigate();

  const [formData, setFormData] = useState({
    identityDocName: "",
    identityDoc: "",
    addressDocName: "",
    addressDoc: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchJSON = async () => {
      const response = await fetch("/company.json");
      let json = await response.json();
      setCompany(json);
    };

    fetchJSON();
  }, []);

  const steps = [
    "Business proof",
    "Business incorporation",
    "Business licenses",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Identity handleNext={handleNext} formData={formData} />;
      case 2:
        return (
          <Incorporation
            handleNext={handleNext}
            handlePrev={handlePrev}
            formData={formData}
          />
        );
      case 3:
        return (
          <LicenseFinal
            handlePrev={handlePrev}
            finalSubmit={finalSubmit}
            formData={formData}
          />
        );
      default:
    }
  };

  async function onFileUpload(selectedFile, loan_info) {
    console.log(loan_info);
    try {
      console.log("Upload called");
      let ipfsUploadRes = await axiosHttpService(
        uploadFileToIPFS(selectedFile)
      );
      console.log(ipfsUploadRes);

      // make metadata for collateral document
      const metadata = {};
      metadata.imageHash = ipfsUploadRes.res.IpfsHash;
      metadata.PinSize = ipfsUploadRes.res.PinSize;
      metadata.Timestamp = ipfsUploadRes.res.Timestamp;
      const collateralURI = await pinataCall(metadata);

      // make metadata for loan info
      const metadata2 = {};
      metadata2.loanName = loan_info.loan_name;
      metadata2.loanPurpose = loan_info.loan_purpose;
      metadata2.company_name = company.company_name;
      metadata2.company_details = company.company_details;
      const loanInfoURI = await pinataCall(metadata2);

      return [collateralURI, loanInfoURI];
    } catch (error) {
      console.log(error);
    }
  }

  const finalSubmit = async (data) => {
    console.log("finalSubmit", data);
    // let {
    //   loan_name,
    //   loan_type,
    //   loan_amount,
    //   loan_purpose,
    //   loan_tenure,
    //   loan_interest,
    //   capital_loss,
    //   payment_frequency,
    //   ...rest
    // } = data;
    // loan_tenure = loan_tenure * 30;
    // const collateral_document = rest.collateral_document;
    // let loanDetails = {
    //   loan_type,
    //   loan_amount,
    //   loan_tenure,
    //   loan_interest,
    //   payment_frequency,
    //   capital_loss,
    // };
    // console.log(collateral_document);
    // const loan_info = { loan_name, loan_purpose };
    // console.log(loanDetails);

    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
    // const [collateralHash, loanInfoHash] = await onFileUpload(
    //   collateral_document,
    //   loan_info
    // );
    // loanDetails = { ...loanDetails, collateralHash, loanInfoHash };
    // // sending data in backend to create opportunity with hash code
    // await createOpportunity(loanDetails);
    setProcessed(true);
  };

  const handleNext = (newData, value) => {
    if (value === true) {
      let temp = { ...formData, ...newData };
      setFormData(temp);
    } else {
      setFormData((prev) => ({ ...prev, ...newData }));
    }
    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
  };

  const handlePrev = (newData) => {
    setCurrentStep((prevCurrentStep) => prevCurrentStep - 1);
  };

  return (
    <div>
      <input type="checkbox" id="kybModal" class="modal-toggle" />
      <div
        class="modal"
        style={{ backdropFilter: "brightness(40%) blur(8px)" }}
      >
        <div
          style={{ backgroundColor: "#20232A", borderRadius: "16px" }}
          class="modal-box w-1/2 max-w-5xl p-0"
        >
          <label
            for="loanForm-modal"
            class="btn btn-ghost absolute right-2 top-2 pb-2"
            onClick={() => handleForm()}
          >
            ✕
          </label>
          <h3
            style={{ borderBottom: "2px solid #292C33" }}
            className="font-bold text-lg py-3 px-4"
          >
            KYB
          </h3>
          <div className="mx-auto pb-2 ">
            {/* Stepper */}
            <div className="mt-5 ">
              <Stepper steps={steps} currentStep={currentStep} />
              <div className="mt-2 p-10 ">{displayStep(currentStep)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYBModal;
