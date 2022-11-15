import React from "react";
import { Box, Button, Typography, Stack, Link, Input } from "@mui/material";

const AddressProof = ({ handleClick }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          width: "500px",
          mx: "auto",
          my: "28px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          mb: "28px",
        }}
      >
        <img
          style={{ height: "250px", width: "250px", objectFit: "contain" }}
          src="./assets/utilities.png"
          alt=""
        />
      </Box>
      <Stack
        sx={{
          mx: "auto",
          my: "12px",
          mb: "22px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Input type="file" />
        <Button
          sx={{ backgroundColor: "#ffffff", color: "#7165E3" }}
          variant="contained"
          onClick={() => handleClick("processing")}
        >
          Upload
        </Button>
      </Stack>
    </>
  );
};

export default AddressProof;
