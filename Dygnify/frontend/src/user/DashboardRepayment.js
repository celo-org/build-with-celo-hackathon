import React from "react";
import { Box } from "@material-ui/core";
import { Button, Typography } from "@mui/material";

const DashboardRepayment = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#7165E3",
          height: "100vh",
          textAlign: "center",
          pt: "130px",
          color: "#fff",
        }}
      >
        <Typography variant="h4">Do you want to</Typography>
        <Typography variant="h4">download Repayment</Typography>
        <Typography variant="h4">Schedule ?</Typography>
        <Box
          sx={{
            pt: "40px",
          }}
        >
          <Typography variant="body1" display="inline">
            Account Number
          </Typography>
          &nbsp;
          <Typography variant="body1" display="inline">
            xxxxxxxxxx
          </Typography>
        </Box>
        <Button
          sx={{
            float: "right",
            mr: "180px",
            mt: "120px",
          }}
          variant="contained"
          color="primary"
        >
          Confirm
        </Button>
      </Box>
    </>
  );
};

export default DashboardRepayment;
