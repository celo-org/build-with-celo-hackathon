import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Verified = ({verified}) => {
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
          style={{ width: "210px", height: "110px", objectFit: "contain" }}
          src="./assets/thumbsUp.png"
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
        {verified===true ? "Verified !!" : "Verification Failed"}
      </Typography>
      <Button
        sx={{
          backgroundColor: "#ffffff",
          color: "#7165E3",
          ml: "70%",
        }}
        variant="contained"
      >
        <Link to="/wallet">Finish</Link>
      </Button>
    </>
  );
};

export default Verified;
