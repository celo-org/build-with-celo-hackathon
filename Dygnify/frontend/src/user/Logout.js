import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const Logout = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#7165E3",
          color: "#fff",
          textAlign: "center",
          pt: "35vh",
        }}
      >
        <CheckCircleRoundedIcon sx={{ fontSize: 50 }} />
        <Typography variant="h4">You have successfully</Typography>
        <Typography variant="h4">Logged Out</Typography>
        <Stack
          sx={{
            mt: "200px",
          }}
        >
          <Typography variant="caption">Powered By</Typography>
          <Typography variant="h6">Dygnify</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default Logout;
