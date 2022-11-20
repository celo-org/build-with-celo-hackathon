import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import UdyamUpload from "./businessProofComponents/UdyamUpload";
import UdyamUploaded from "./businessProofComponents/UdyamUploaded";
import ShopEstUpload from "./businessProofComponents/ShopEstUpload";
import ShopEstUploaded from "./businessProofComponents/ShopEstUploaded";
import FssaiUpload from "./businessProofComponents/FssaiUpload";
import FssaiUploaded from "./businessProofComponents/FssaiUploaded";
import GstUpload from "./businessProofComponents/GstUpload";
import GstUploaded from "./businessProofComponents/GstUploaded";
import BussinessProofUpload from "./businessProofComponents/BusinessProofUpload";
import BussinessProofUploaded from "./businessProofComponents/BusinessProofUploaded";
import BillUpload from "./businessProofComponents/BillUpload";
import BillUploaded from "./businessProofComponents/BillUploaded";
import Selfie from "./businessProofComponents/Selfie";

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const BusinessProof = () => {
  const [progress, setProgress] = useState(30);
  const [next, setNext] = useState("panUpload");

  const handleClick = (component) => {
    setNext(component);
  };

  return (
    <>
      <Container maxWidth="md">
        <Box
          sx={{
            my: "48px",
            display: "grid",
            gridTemplateColumns: "1fr 5fr",
          }}
        >
          <div
            style={{
              height: "56px",
              width: "56px",
              borderRadius: "50%",
              backgroundColor: "#7165E3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            1/6
          </div>
          <LinearProgressWithLabel value={progress} />
        </Box>

        {/* {(() => {
          switch (next) {
            case "panUpload":
              return <PanUpload handleClick={handleClick} />;
            case "panUploaded":
              return <PanUploaded handleClick={handleClick} />;
            case "jobCard":
              return <JobCard handleClick={handleClick} />;
            case "jobCardUploaded":
              return <JobCardUploaded handleClick={handleClick} />;
            case "aadhar":
              return <Aadhar handleClick={handleClick} />;
            case "aadharUploaded":
              return <AadharUploaded handleClick={handleClick} />;
            default:
              return <PanUpload />;
          }
        })()} */}

        {/* <UdyamUpload/> */}
        {/* <UdyamUploaded /> */}
        {/* <ShopEstUpload /> */}
        {/* <ShopEstUploaded /> */}
        {/* <FssaiUpload /> */}
        {/* <FssaiUploaded /> */}
        {/* <GstUpload/> */}
        {/* <GstUploaded/> */}
        {/* <BussinessProofUpload /> */}
        {/* <BussinessProofUploaded/> */}
        {/* <BillUpload /> */}
        {/* <BillUploaded/> */}
        {/* <Selfie/> */}
      </Container>
    </>
  );
};

export default BusinessProof;
