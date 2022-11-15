import { React, useState } from "react";
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";

const OpportunityStatus = ({
  opportunityName,
  mDate,
  percentage,
  loanAmount,
  loanInterest,
  loanType,
  loanTenure,
  opportunityStatus,
  paymentFrequency
}) => {
  return (
    <>
      <Box
        sx={{
          mb: "20px",
          maxWidth: 1100,
          py: "20px",
          mx: "auto",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            mb: "40px",
            maxWidth: 1050,
            width: "100%",
            display: "flex",
            px: "30px",
            justifyContent: "space-between",
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <img
              style={{ width: "88px", height: "77px" }}
              src="./assets/supply-chain.png"
              alt=""
            />
            <div>
              <Typography mb={1} variant="h6">
                {opportunityName}
              </Typography>
              <Typography mb={1} fontSize="14px">
                Product : {loanType === '0' ? 'Term Loan' : 'Bullet Loan'}
              </Typography>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                backgroundColor: "White",
                width: "180px",
                height: "45px",
                border: `${opportunityStatus === "0"
                  ? "1.5px solid red"
                  : "1.5px solid green"
                  }`,
                color: `${opportunityStatus === "0" ? "red" : "green"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* {props.status === "Funded" ? `${props.percentage} Funded` : props.status}  */}
              {"Unapproved"}
            </Box>
          </div>
        </Box>

        <Box>
          <Card
            sx={{
              width: "1000px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <div style={{ width: "20%" }}>
              <Typography variant="subtitle1">{loanInterest} %</Typography>
              <Typography variant="overline">Interest Rate </Typography>
            </div>
            <div style={{ width: "25%" }}>
              <Typography variant="subtitle1">{paymentFrequency} days</Typography>
              <Typography variant="overline">
                Interest Repayment Frequency{" "}
              </Typography>
            </div>
            <div style={{ width: "20%" }}>
              <Typography variant="subtitle1">{loanTenure / 30} months</Typography>
              <Typography variant="overline">Tenure</Typography>
            </div>
            <div style={{ width: "20%" }}>
              <Typography variant="subtitle1">
                {loanAmount} {process.env.REACT_APP_TOKEN_NAME}
              </Typography>
              <Typography variant="overline">Total Limit</Typography>
            </div>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default OpportunityStatus;
