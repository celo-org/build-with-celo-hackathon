import React from "react";
import { Box, Typography } from "@mui/material";
import {amlCheck} from "../../services/OFACAxiosOptions.js"
import axiosHttpService from '../../services/axioscall';

const REACT_APP_OFAC_MIN_SCORE = "90"
const REACT_APP_NAYAONE_SANDPIT_KEY = "c4064533-8be7-4b6f-883f-f8650911085e"

const Processing = ({ handleClick,fullName }) => {
  async function onCheckAML() {
    try {
      console.log("onCheckAML called");
      if (!fullName) {
        return;
      }
      let amlCheckRes = await axiosHttpService(amlCheck(fullName));
      console.log("Status " + amlCheckRes.code);
      console.log("Body" + amlCheckRes.res);
      console.log("Error " + amlCheckRes.res["error"]);
      if (amlCheckRes.code === 200 && amlCheckRes.res["error"] === false) {
        if (amlCheckRes.res["matches"][fullName][0] &&
             amlCheckRes.res["matches"][fullName][0]["score"] >= REACT_APP_OFAC_MIN_SCORE) {
          return true;
        } else {
          return false;
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
    return true
  };

  const next = () => {
   let result = onCheckAML();
   handleClick("verified","",result)
    
  };

  return (
    <>
      <Box
        sx={{
          my: "32px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "110px", height: "70px", objectFit: "contain" }}
          src="./assets/sand-timer.gif"
          alt=""
        />
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          color: "#ffffff",
          my: "28px",
        }}
        variant="h4"
      >
        Processing for AML/CFT checks...
      </Typography>
      {next()}
    </>
  );
};

export default Processing;
