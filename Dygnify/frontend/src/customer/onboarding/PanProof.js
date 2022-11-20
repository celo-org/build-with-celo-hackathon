import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import PanUpload from "./panProofComponents/PanUpload";
import PanUploaded from "./panProofComponents/PanUploaded";
import JobCard from "./panProofComponents/JobCard";
import JobCardUploaded from "./panProofComponents/JobCardUploaded";
import Aadhar from "./panProofComponents/Aadhar";
import AadharUploaded from "./panProofComponents/AadharUploaded";

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

const PanProof = () => {
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

        {(() => {
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
        })()}
      </Container>
    </>
  );
};

export default PanProof;
