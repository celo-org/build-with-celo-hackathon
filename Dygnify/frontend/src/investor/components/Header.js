import React from "react";
import { Box, Button, Typography, Stack, Link } from "@mui/material";
import GradientButton from "../../tools/Button/GradientButton";

const Header = () => {
  return (
    <Box
      sx={{
        height: "76px",
        backgroundColor: "#20232A",
        borderEndEndRadius: "12px",
        borderEndStartRadius: "12px",
        px: "40px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <img
          style={{ width: "150px", height: "80px", objectFit: "contain" }}
          src="./assets/logo.png"
          alt="company logo"
        />
      </div>
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
        <GradientButton>Connect Wallet</GradientButton>
      </div>
    </Box>
  );
};

export default Header;
