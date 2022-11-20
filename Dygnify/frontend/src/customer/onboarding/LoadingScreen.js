import React from "react";
import { Container, Stack, Typography } from "@mui/material";

const LoadingScreen = () => {
  return (
    <>
      <style>{"body { background-color: #7165E3; }"}</style>
      <Container maxWidth="sm">
        <Stack
          sx={{
            mt: "200px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              objectFit: "contain",
              width: "276px",
              height: "93px",
              backgroundColor: "#ffffff",
              borderRadius: "22px",
            }}
            src="./assets/logo.png"
            alt="logo"
          />
        </Stack>
        <Stack
          sx={{
            color: "#ffffff",
            mt: "250px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "0px 5px",
          }}
        >
          <Typography variant="body1">Powered By </Typography>
          <img
            style={{
              objectFit: "contain",
              width: "86px",
              height: "29px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
            }}
            src="./assets/logo.png"
            alt="logo"
          />
        </Stack>
      </Container>
    </>
  );
};

export default LoadingScreen;