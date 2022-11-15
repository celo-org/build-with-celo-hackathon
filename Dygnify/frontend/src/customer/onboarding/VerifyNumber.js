import { React, useState } from "react";
import {
  Box,
  Input,
  Typography,
  Stack,
  Button,
  TextField,
  Container,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { sendMobileOtp, checkMobileOtp, getMobileDetails } from '../../services/serviceHelper';

const VerifyNumber = () => {
  const location = useLocation();
  const phone = location?.state?.phone ?? '';
  const reqId = location?.state?.requestId ?? '';
  const [otpInput1, setOTPInput1] = useState();
  const [otpInput2, setOTPInput2] = useState();
  const [otpInput3, setOTPInput3] = useState();
  const [otpInput4, setOTPInput4] = useState();

  async function onReSendCodeClicked() {
    try {
      let { status, requestId } = await sendMobileOtp(phone);
      if (status) {
        reqId = requestId;
        // Display msg for successful resend of otp
      } else {
        //Showcase error 
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onVerifyOTPClicked() {
    try {
      const otp = `${otpInput1}${otpInput2}${otpInput3}${otpInput4}`;
      const status = await checkMobileOtp(reqId, otp, phone);
      if (status) {
        // Redirect to next page
        
        // Get the mobile details
        const mobileDetail = await getMobileDetails(reqId);
        if (mobileDetail.status) {
          // Store details in state
        }
      } else {
        // Show error on page
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleOTPInput1(value) {
    setOTPInput1(value);
  }

  function handleOTPInput2(value) {
    setOTPInput2(value);
  }
  function handleOTPInput3(value) {
    setOTPInput3(value);
  }

  function handleOTPInput4(value) {
    setOTPInput4(value);
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#7165E3",
          height: "140px",
          textAlign: "center",
          pt: "35px",
          color: "#fff",
          borderEndStartRadius: "12px",
          borderEndEndRadius: "16px",
        }}
      >
        <Typography variant="h4">Verify Account</Typography>
        <Typography variant="body2">
          Enter 4-digit Code we have sent to at {phone}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: "50px",
          mx: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          maxWidth: "600px",
          gap: "0px 16px",
        }}
      >
        <Input
          sx={{
            maxWidth: "100px",
            pl: "45px",
          }}
          placeholder="0"
          onChange={handleOTPInput1}
        />
        <Input
          sx={{
            maxWidth: "100px",
            pl: "45px",
          }}
          placeholder="0"
          onChange={handleOTPInput2}
        />
        <Input
          sx={{
            maxWidth: "100px",
            pl: "45px",
          }}
          placeholder="0"
          onChange={handleOTPInput3}
        />
        <Input
          sx={{
            maxWidth: "100px",
            pl: "45px",
          }}
          placeholder="0"
          onChange={handleOTPInput4}
        />
      </Box>
      <Stack
        sx={{
          mt: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Typography>Didn't receive code?</Typography>
        <Typography>
          <Button onClick={onReSendCodeClicked}>Resend Code</Button>
        </Typography>
      </Stack>
      <Stack
        sx={{
          maxWidth: "200px",
          mx: "auto",
          mt: "50px",
        }}
      >
        {/* <TextField label="Referral Code (Optional)" variant="standard" />
        <TextField label="Agent ID (Optional)" variant="standard" /> */}
      </Stack>
      <Container
        maxWidth="sm"
        sx={{
          mt: "80px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "#7165E3",
            float: "right",
          }}
          onClick={onVerifyOTPClicked}
        >
          Proceed
        </Button>
      </Container>
    </>
  );
};

export default VerifyNumber;
