import React from "react";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const SignIn = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#7165E3",
          height: "180px",
          textAlign: "center",
          pt: "50px",
          color: "#fff",
          borderEndStartRadius: "12px",
          borderEndEndRadius: "16px",
        }}
      >
        <Typography variant="h4">Welcome Back !</Typography>
        <Typography variant="subtitle1">Sign in to continue</Typography>
      </Box>
      <Stack
        sx={{
          textAlign: "center",
          m: "auto",
          mt: "80px",
          width: "200px",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <TextField my={1} label="Mobile Number" variant="outlined" />
        <TextField type="password" label="PIN" variant="outlined" />
      </Stack>
      <Stack
        sx={{
          float: "right",
          mx: "400px",
          cursor: "pointer",
        }}
      >
        <Link>Forgot PIN?</Link>
      </Stack>
      <Stack
        sx={{
          float: "right",
          my: "60px",
          mx: "400px",
        }}
      >
        <Button variant="contained">Sign In</Button>
      </Stack>
    </>
  );
};

export default SignIn;
