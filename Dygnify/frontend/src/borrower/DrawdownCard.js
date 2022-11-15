import { React, useEffect, useState } from "react";
import { ethers } from 'ethers';
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { uploadFileToIPFS } from '../services/PinataIPFSOptions';
import { border } from "@mui/system";

const DrawdownCard = ({ data }) => {

  const path = useNavigate();
  return (
    <>
      <Box
        sx={{
          mb: "30px",
          maxWidth: 1100,
          height: "350px",
          py: "20px",
          mx: "auto",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            mb: "40px",
            maxWidth: 1100,
            display: "grid",
            px: "30px",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "240px",
            backgroundColor: "white",
            alignItems: "center"
          }}
        >
          <img
            style={{ width: "88px", height: "77px" }}
            src="./assets/supply-chain.png"
            alt=""
          />
          <div style={{ width: "160px", textAlign: "center" }}>
            <Typography mb={1} variant="h6" >
              {data.opportunity_name}
            </Typography>
            <Typography mb={1} fontSize="14px" >
              {data.loan_type}
            </Typography>
          </div>

          <Button
            sx={{ backgroundColor: "White", width: "180px", height: "45px", border: "1px solid #7165E3", color: "#7165E3" }}
            variant="contained"
            size="large"
          >
            Ready to Draw
          </Button>
        </Box>

        <Box>
          <Card
            sx={{
              width: "900px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              textAlign: "center",
              marginTop: "20px",
              padding: "20px",
              boxShadow: "2px 4px 4px darkgrey",
              border: "1px solid grey"
            }}
          >
            <div>
              <Typography style={{}} variant="subtitle2">
                {data.loan_amount} {process.env.REACT_APP_TOKEN_NAME}
              </Typography>
              <Typography variant="overline">Loan Amount</Typography>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div>
              <Typography style={{}} variant="subtitle2">
                {data.loan_interest} %
              </Typography>
              <Typography variant="overline">Interest Rate </Typography>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div>
              <Typography variant="subtitle2">{data.payment_frequency} days</Typography>
              <Typography variant="overline">Repayment Frequency </Typography>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />{" "}
            <div>
              <Typography variant="subtitle2">{data.loan_type}</Typography>
              <Typography variant="overline">Loan Type</Typography>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />{" "}
            <div>
              <Typography variant="subtitle2">{data.loan_tenure / 30} months</Typography>
              <Typography variant="overline">Loan Tenure</Typography>
            </div>
          </Card>
        </Box>
        <Button
          sx={{ backgroundColor: "#7165E3", width: "200px", marginTop: '30px' }}
          variant="contained"
          size="large"
          onClick={() => path(`/drawdown/${data.id}`)}
        >
          Drawdown
        </Button>
      </Box>

    </>
  );
};

export default DrawdownCard;
