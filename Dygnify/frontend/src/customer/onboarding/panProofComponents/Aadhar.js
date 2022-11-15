import React, { useState } from "react";
import { Container, TextField, Box, Typography, Button } from "@mui/material";

const otp = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
            gap: "0px 12px",
            my: "22px",
            maxWidth: "340px",
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#7165E3" }}>OTP</Typography>
          <TextField variant="outlined" required />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7165E3",
            }}
          >
            Verify
          </Button>
        </Box>
      </Container>
      <Container maxWidth="sm" sx={{ mx: "auto" }}>
        <Typography variant="body1">Did not receive the code?</Typography>
        <Button variant="text">Resend Code</Button>
      </Container>
    </>
  );
};

const Aadhar = ({ handleClick }) => {
  const [display, setDisplay] = useState(0);
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr 1fr",
            alignItems: "center",
            gap: "0px 12px",
          }}
        >
          <Typography sx={{ color: "#7165E3" }}>AADHAR No</Typography>
          <TextField variant="outlined" required />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7165E3",
            }}
            onClick={() => {
              setDisplay(1);
            }}
          >
            Send OTP
          </Button>
        </Box>
      </Container>

      {display ? otp() : ""}

      <Container maxWidth="sm" sx={{ mt: "200px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#979797", float: "right" }}
          onClick={() => {
            handleClick("aadharUploaded");
          }}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default Aadhar;
