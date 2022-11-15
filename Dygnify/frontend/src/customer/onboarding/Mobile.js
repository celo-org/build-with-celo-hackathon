import { React, useState } from "react";
import { sendMobileOtp } from '../../services/serviceHelper';
import {
  Box,
  Stack,
  Container,
  Button,
  Typography,
} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { useHistory, useNavigate } from "react-router-dom";

const Mobile = () => {
  const [phone, setPhoneNo] = useState();
  const history = useNavigate();

  async function onSendCodeClicked() {
    try {
      let { status, requestId } = await sendMobileOtp(phone);
      if (status) {
        // Redirect to Verification page
        history({ pathname: './verifyNumber', state: { 'phone': phone, 'requestId': requestId } });
      } else {
        //Showcase error 
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnChange(value) {
    setPhoneNo(value);
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#7165E3",
          height: "140px",
          textAlign: "center",
          pt: "35px",
          color: "#ffffff",
          borderEndStartRadius: "12px",
          borderEndEndRadius: "12px",
        }}
      >
        <Stack
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Mobile Number</Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{
            mx: "auto",
          }}
        >
          Please enter your valid phone number
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mx: "auto",
          }}
        >
          We will send you 4-digit code to verify account
        </Typography>
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          mt: "170px",
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "0px 16px",
        }}
      >
        <Typography
          sx={{
            maxWidth: "180px",
          }}
        >
          Mobile Number
        </Typography>
        <MuiPhoneNumber defaultCountry={"in"} onlyCountries={['in']} onChange={handleOnChange} />
      </Container>
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
          onClick={onSendCodeClicked}
        >
          Send Code
        </Button>
      </Container>
    </>
  );
};

export default Mobile;