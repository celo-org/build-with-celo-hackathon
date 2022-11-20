import { React, useState } from "react";
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getOpportunityAt,
  voteOpportunity,
} from "../components/transaction/TransactionHelper";
import { ExtractIPFSdataFromHash } from "../services/PinataIPFSOptions";

const ApprovedOpportunities = () => {
  const { id } = useParams({});
  const [target, setTarget] = useState({});
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchJSON = async () => {
      const response = await fetch("/company.json");
      let json = await response.json();
      setCompany(json);
    };

    fetchJSON();
  }, []);

  useEffect(() => {
    const dataFetch = async () => {
      const temp = await getOpportunityAt(id);
      setTarget(temp);
    };
    dataFetch();
  }, [id]);

  const hash = target?.opportunity_info;

  const info = ExtractIPFSdataFromHash(hash);

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
            src="/assets/logo.png"
            alt="company logo"
          />
        </Box>
        <Typography>Income Generating Loans</Typography>
        <Typography color="#7165E3">Overview</Typography>
        <Typography>Investments</Typography>
        <Typography>Assets</Typography>
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
          >
            Connect Wallet
          </Button>
        </div>
      </Box>
      <Box>
        <Card
          sx={{
            my: "20px",
            maxWidth: 1100,
            height: 130,
            mx: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="subtitle2">
              {target?.loan_type === 1 ? "Term Loan" : "Bullet Loan"}
            </Typography>
            <Typography variant="overline">Loan Type</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div>
            <Typography variant="subtitle2">
              {(target?.loan_tenure / 30).toFixed(2)} months
            </Typography>
            <Typography variant="overline">Loan Tenure</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />{" "}
          <div>
            <Typography variant="subtitle2">
              {target?.loan_interest} %
            </Typography>
            <Typography variant="overline">Loan Interest</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />{" "}
          <div>
            <Typography variant="subtitle2">
              {target?.loan_amount} {process.env.REACT_APP_TOKEN_NAME}
            </Typography>
            <Typography variant="overline">Loan Amount</Typography>
          </div>
        </Card>
      </Box>
      <Stack
        sx={{
          maxWidth: 1100,
          py: "10px",
          px: "30px",
          mx: "auto",
          color: "#ffffff",
        }}
      >
        <Typography variant="h6">Opportunity Info</Typography>
      </Stack>
      <Box>
        <Card
          sx={{
            mb: "20px",
            maxWidth: 1100,
            py: "20px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            textAlign: "justify",
          }}
        >
          <Typography px="20px" variant="h6">
            Title: {info?.loanName}
          </Typography>
          <Typography px="20px" variant="body2">
            Purpose: {info?.loanPurpose}
          </Typography>
        </Card>
      </Box>
      <Stack
        sx={{
          maxWidth: 1100,
          py: "10px",
          px: "30px",
          mx: "auto",
          color: "#ffffff",
        }}
      >
        <Typography variant="h6">Impact Partner Details</Typography>
      </Stack>
      <Box>
        <Card
          sx={{
            mb: "20px",
            maxWidth: 1100,
            py: "20px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            textAlign: "justify",
          }}
        >
          <Typography px="20px" variant="h6">
            {company?.company_name}
          </Typography>
          <Typography px="20px" variant="body2">
            {company?.company_details}
          </Typography>
        </Card>
      </Box>

      <Stack
        sx={{
          mt: "10px",
          maxWidth: 1100,
          py: "10px",
          px: "30px",
          mx: "auto",
          color: "#ffffff",
        }}
      >
        <Typography variant="h6">Opportunity Status</Typography>
      </Stack>
      <Box
        sx={{
          mb: "30px",
          maxWidth: 1100,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0px 16px",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            py: "30px",
            px: "30px",
          }}
        >
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography>Loan Type</Typography>
            <Typography>
              {target?.loan_type === 1 ? "Term Loan" : "Bullet Loan"}
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography>Loan Amount</Typography>
            <Typography>
              {target?.loan_amount} {process.env.REACT_APP_TOKEN_NAME}
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography>Interest Rate</Typography>
            <Typography>{target?.loan_interest} %</Typography>
          </Stack>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            py: "16px",
            px: "30px",
          }}
        >
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography>Loan Tenure</Typography>
            <Typography>
              {(target?.loan_tenure / 30).toFixed(2)} months
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography>Payment Frequency</Typography>
            <Typography>{target?.payment_frequency} days</Typography>
          </Stack>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography>First Loss Capital</Typography>
            <Typography>
              {target?.capital_loss ? target?.capital_loss : 0} %
            </Typography>
          </Stack>
        </Card>
      </Box>
      <Box
        my="1rem"
        maxWidth="1100px"
        mx="auto"
        display="flex"
        justifyContent="center"
      >
        <Button
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "10px 50px",
            borderRadius: "40px",
          }}
          variant="contained"
          onClick={() => {
            alert("Unsure Clicked");
            voteOpportunity(id, "3");
          }}
        >
          <Link>Unsure</Link>
        </Button>
        <Button
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "10px 50px",
            borderRadius: "40px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          variant="contained"
          onClick={() => {
            alert("Approve Clicked");
            voteOpportunity(id, "2");
          }}
        >
          <Link>Approve</Link>
        </Button>
        <Button
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "10px 50px",
            borderRadius: "40px",
          }}
          variant="contained"
          onClick={() => {
            alert("Reject Clicked");
            voteOpportunity(id, "1");
          }}
        >
          <Link>Reject</Link>
        </Button>
      </Box>
    </>
  );
};

export default ApprovedOpportunities;
