import { React, useState, useEffect } from "react";
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";
import OpportunityTable from "./OpportunityTable.js";

// import DrawdownCard from "./DrawdownCard.js";
import DrawdownCard from "./DrawdownCard.js";
import OpportunityStatus from "./OpportunityStatus.js";
import { getOpportunitysOf } from "../components/transaction/TransactionHelper";
import { useNavigate } from "react-router-dom";
import RepaymentCard from "../tools/Card/RepaymentCard.js";

const Borrower = () => {
  const [opportunity, setOpportunity] = useState();
  const path = useNavigate();
  const [data, setData] = useState([]);
  const [repayment, setRepayment] = useState([]);
  const [userInfo, setUserInfo] = useState({
    companyName: "Hector Ltd",
    name: "Jane Hector",
    activeLoan: "1",
    totalLoan: "84,00,000",
    amountReadyToWithdraw: "48,00,000",
  });

  const loadBlockpassWidget = () => {
    console.log("#############");
    const blockpass = new window.BlockpassKYCConnect(
      "kyc_aml_c7be4", // service client_id from the admin console
      {
        refId: "1", // assign the local user_id of the connected user
      }
    );

    blockpass.startKYCConnect();

    blockpass.on("KYCConnectSuccess", () => {
      //add code that will trigger when data have been sent.
    });
  };

  useEffect(() => {
    fetch("/drawdown.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    fetch("/repayment.json")
      .then((res) => res.json())
      .then((data) => setRepayment(data));
  }, []);

  useEffect(() => {
    try {
      loadBlockpassWidget();
      console.log("******************");
      const fetchData = async () => {
        console.log("******************");
        let opportunities = await getOpportunitysOf();
        setOpportunity(opportunities);
        console.log(opportunities);
      };
      fetchData();

      //loadBlockpassWidget();
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
          <button style={{ height: 50, width: 50 }} id="blockpass-kyc-connect">
            KYC
          </button>
        </div>
      </Box>

      <Stack
        sx={{
          my: "20px",
          mx: "auto",
          maxWidth: 1150,
          height: 80,
          py: "10px",
          px: "30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" ml={2}>
            {userInfo.companyName}
          </Typography>
          <Typography ml={2}>{userInfo.name}</Typography>
        </Stack>

        <Button
          sx={{ backgroundColor: "#843bc5" }}
          variant="contained"
          size="large"
          onClick={() => path.push(`/loan-form`)}
        >
          Create New Loan request
        </Button>
      </Stack>

      <Box
        sx={{
          mb: "30px",
          maxWidth: 1100,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0px 16px",
          height: "200px",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            py: "16px",
            px: "30px",
          }}
        >
          <Typography variant="h6">{userInfo.activeLoan}</Typography>

          <Typography variant="h6" color="#979797">
            Active Loan
          </Typography>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            py: "16px",
            px: "30px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            {userInfo.totalLoan} {process.env.REACT_APP_TOKEN_NAME}
          </Typography>
          <Typography variant="h6" color="#979797">
            Total Loan
          </Typography>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            py: "16px",
            px: "30px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            {userInfo.amountReadyToWithdraw} {process.env.REACT_APP_TOKEN_NAME}
          </Typography>

          <Typography variant="h6" color="#979797">
            Ready to Drawdown
          </Typography>
        </Card>
      </Box>
      {/* {repayment ? <RepaymentCard key={repayment.id} data={repayment}></RepaymentCard> : null} */}
      {repayment.map((item) => (
        <RepaymentCard key={data.id} data={item} />
      ))}
      {data.map((item) => (
        <DrawdownCard key={data.id} data={item} />
      ))}

      <br />

      {/*add a if statement for data*/}
      {opportunity ? (
        opportunity.map((data, i) => {
          return (
            <div
              onClick={() => {
                console.log("clicked");
                //path(`/opportunity-details/${id}`)
              }}
              key={i}
            >
              <OpportunityStatus
                opportunityName="Opportunity 1"
                loanAmount={data.loan_amount}
                loanInterest={data.loan_interest}
                loanType={data.loan_type}
                loanTenure={data.loan_tenure}
                paymentFrequency={data.payment_frequency}
                //opportunityStatus={data.oppurtunityStatus}
                opportunityStatus="0"
                // mDate="12/05/2022"
              />
            </div>
          );
        })
      ) : (
        <h2>No Opportunity Created Yet.</h2>
      )}

      <br />
      <br />
      <br />
    </>
  );
};

export default Borrower;
