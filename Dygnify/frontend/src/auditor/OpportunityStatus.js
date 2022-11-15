import { React, useState } from "react";
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";
import { voteOpportunity } from "../components/transaction/TransactionHelper";

const OpportunityStatus = ({
  opportunityName,
  oppurtunityId,
  mDate,
  percentage,
  loanAmount,
  loanInterest,
  loanType,
  loanTenure,
  opportunityStatus,
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
                Product : Term Loan
              </Typography>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography mb={1} fontSize="14px" style={{ marginRight: "10px" }}>
              Maturity Date : {mDate}
            </Typography>

            <button
              style={{
                margin: "2%",
                width: "120px",
                height: "35px",
                color: "orange",
                fontSize: 15,
              }}
              onClick={() => voteOpportunity(oppurtunityId, "3")}
            >
              Unsure
            </button>
            <button
              style={{
                margin: "2%",
                width: "120px",
                height: "35px",
                color: "green",
                fontSize: 15,
              }}
              onClick={() => voteOpportunity(oppurtunityId, "2")}
            >
              Approve
            </button>
            <button
              style={{
                width: "120px",
                height: "35px",
                color: "red",
                fontSize: 15,
              }}
              onClick={() => voteOpportunity(oppurtunityId, "1")}
            >
              Reject
            </button>
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
              <Typography variant="subtitle1">{loanInterest}%</Typography>
              <Typography variant="overline">Interest Rate </Typography>
            </div>
            <div style={{ width: "25%" }}>
              <Typography variant="subtitle1">Monthly</Typography>
              <Typography variant="overline">
                Interest Repayment Frequency{" "}
              </Typography>
            </div>
            <div style={{ width: "20%" }}>
              <Typography variant="subtitle1">{loanType}</Typography>
              <Typography variant="overline">Principal Repayment</Typography>
            </div>
            <div style={{ width: "20%" }}>
              <Typography variant="subtitle1">{loanTenure}</Typography>
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
