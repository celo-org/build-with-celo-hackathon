import { React, useState, useEffect } from "react";
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";
import OpportunityStatus from "./OpportunityStatus";
import { getAllUnderReviewOpportunities } from "../components/transaction/TransactionHelper";
import { useNavigate } from "react-router-dom";

const AuditorDashboard = () => {
  const [opportunity, setOpportunity] = useState([
    {
      loanAmount: "25000",
      loanInterest: "13%",
      loanTenure: "25",
      loanType: "bullet",
    },
    {
      loanAmount: "25000",
      loanInterest: "13%",
      loanTenure: "25",
      loanType: "bullet",
    },
  ]);
  const path = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        console.log("******************");
        let opportunities = await getAllUnderReviewOpportunities();
        setOpportunity(opportunities);
        console.log(opportunities);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  return (
    <>
      <style>{"body { background-color: #7165e3 }"}</style>
      <Box
        sx={{
          height: "90px",
          backgroundColor: "#ffffff",
          borderEndEndRadius: "12px",
          borderEndStartRadius: "12px",
          px: "40px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <img
            style={{ width: "150px", height: "80px", objectFit: "contain" }}
            src="./assets/logo.png"
            alt="company logo"
          />
        </Box>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="body2">Switch to</Typography>
            <Button
              size="small"
              sx={{ backgroundColor: "#E5E5E5", borderRadius: "120px" }}
            >
              {process.env.REACT_APP_TOKEN_NAME}
            </Button>
          </div>
          <Button
            sx={{ backgroundColor: "#7165E3" }}
            variant="contained"
            size="large"
            onClick={requestAccount}
          >
            Connect Wallet
          </Button>
        </div>
      </Box>

      <h1 style={{ color: "white", margin: "3%" }}>Auditor Dashboard</h1>

      {
        opportunity.map((data, i) => {
          return (
            <div
              onClick={() => {
                console.log("clicked");
                path.push(`/opportunity-details-auditor/${data.opportunityID}`);
              }}
              style={{ cursor: "pointer" }}
              key={i}
            >
              <OpportunityStatus
                opportunityName="Opportunity 1"
                oppurtunityId={data.opportunityID}
                loanAmount={data.loanAmount}
                loanInterest={data.loanInterest}
                loanType={data.loanType}
                loanTenure={data.loanTenure}
                //opportunityStatus={data.oppurtunityStatus}
                opportunityStatus="0"
                mDate="12/05/2022"
              />
            </div>
          );
        })
        // : (
        //   <h2
        //     style={{ justifyContent: "center", color: "red", marginLeft: "35%" }}
        //   >
        //     No Opportunity Created Yet.
        //   </h2>
        // )
      }

      <br />
      <br />
      <br />
    </>
  );
};

export default AuditorDashboard;
