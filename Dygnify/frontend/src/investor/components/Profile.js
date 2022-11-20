import React from "react";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";

const Profile = ({ handleClick }) => {
  const [fullName,setFullName] = React.useState("");
  function handleName(event){
    event.preventDefault()
    setFullName( event.target.value);
    
  }
  return (
    <>
      <Box
        sx={{
          maxWidth: "800px",
          backgroundColor: "#ffffff",
          my: "28px",
          py: "22px",
          px: "100px",
          mx: "auto",
          borderRadius: "12px",
        }}
      >
        <Stack
          sx={{
            color: "#979797",
            my: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography variant="subtitle1">Full Name</Typography>
          <TextField label="Full Name" variant="outlined" value={fullName} onChange={handleName}/>
        </Stack>
        <Stack
          sx={{
            color: "#979797",
            my: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography variant="subtitle1">Email id</Typography>
          <TextField label="email" variant="outlined" />
        </Stack>
        <Stack
          sx={{
            color: "#979797",
            my: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography variant="subtitle1">Mobile</Typography>
          <TextField label="mobile" variant="outlined" />
        </Stack>
        <Button
          sx={{
            ml: "454px",
            backgroundColor: "#7165E3",
            transform: "translate(110% , -150%)",
          }}
          variant="contained"
        >
          Send Code
        </Button>
        <Stack
          sx={{
            color: "#979797",
            my: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography variant="subtitle1">OTP</Typography>
          <TextField label="OTP" variant="outlined" />
        </Stack>
        <Link sx={{ ml: "336px", cursor: "pointer" }}>Resend Code</Link>
      </Box>
      <Stack
        sx={{
          float: "right",
          mr: "275px",
          my: "24px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#7165E3",
          }}
          variant="contained"
          onClick={() => handleClick("identity",fullName)}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default Profile;
