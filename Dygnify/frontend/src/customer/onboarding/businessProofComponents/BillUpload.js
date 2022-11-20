import React from "react";
import { Typography, Container, Box, Stack, Button } from "@mui/material";

const BillUpload = () => {
  return (
    <>
      <Container maxWidth="md">
        <Typography sx={{ color: "#7165E3", textAlign: "center" }}>
          Terms like what formats can be uploaded and how much KB
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            textAlign: "center",
            mt: "42px",
          }}
        >
          <Stack sx={{ alignItems: "center" }} spacing={4}>
            <Typography sx={{ maxWidth: "162px", color: "#7165E3" }}>
              Please upload Electricity / Telephone / Gas Bill of your RESIDENCE
            </Typography>
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#7165E3",
                width: "116px",
                height: "126px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="./assets/upload.png"
                alt=""
                style={{
                  width: "96px",
                  height: "96px",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
              <Typography sx={{ color: "#ffffff" }}>Upload</Typography>
            </div>
          </Stack>
          <Stack sx={{ alignItems: "center" }} spacing={4}>
            <Typography sx={{ maxWidth: "162px", color: "#7165E3" }}>
              Please upload Electricity,Telephone,Gas Bill of your SHOP / OFFICE
            </Typography>
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#7165E3",
                width: "116px",
                height: "126px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="./assets/upload.png"
                alt=""
                style={{
                  width: "96px",
                  height: "96px",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
              <Typography sx={{ color: "#ffffff" }}>Upload</Typography>
            </div>
          </Stack>
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ mt: "60px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#979797", float: "right" }}
          //   onClick={()=>{handleClick("jobCard")}}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default BillUpload;
