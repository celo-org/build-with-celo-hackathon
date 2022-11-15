import React from "react";
import { Box, Typography, Divider, Card } from "@mui/material";
import { Link } from "react-router-dom";

const JuniorPoolCard = ({ data }) => {
  const {
    id,
    opportunity_name,
    opportunity_owner,
    invest_amount,
    loan_interest,
    available_withdrawal,
  } = data;
  return (
    <>
      <Box>
        <Card
          sx={{
            mb: "30px",
            maxWidth: 1100,
            height: 90,
            mx: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="subtitle2">{opportunity_name}</Typography>
            <Typography variant="overline">{opportunity_owner}</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div>
            <Typography variant="subtitle2">
              {invest_amount} {process.env.REACT_APP_TOKEN_NAME}
            </Typography>
            <Typography variant="overline">Amount Invested</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />{" "}
          <div>
            <Typography variant="subtitle2">{loan_interest} %</Typography>
            <Typography variant="overline">Loan Interest</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />{" "}
          <div>
            <Typography variant="subtitle2">
              {available_withdrawal} {process.env.REACT_APP_TOKEN_NAME}
            </Typography>
            <Typography variant="overline">Available for Withdrawal</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />{" "}
          <Card
            sx={{
              boxShadow: "none",
            }}
          >
            <Card
              sx={{
                border: "1px solid #7165E3",
                borderRadius: "12px",
                width: "80px",
                textAlign: "center",
              }}
            >
              <label>
                <input type={"number"} name="invest Amount" />
              </label>
            </Card>
            <Card
              sx={{
                border: "1px solid #7165E3",
                borderRadius: "12px",
                width: "80px",
                textAlign: "center",
              }}
            >
              <Link to={`/withdrawal/${id}`}>Invest</Link>
            </Card>
          </Card>
        </Card>
      </Box>
    </>
  );
};

export default JuniorPoolCard;
