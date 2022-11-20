import React from "react";
import { Typography, Container, Box, Stack, Button } from "@mui/material";

const BillUploaded = () => {
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

            <img
              src=""
              alt=""
              style={{
                width: "96px",
                height: "96px",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
            <Button variant="outlined" sx={{ color: "#000000" }}>
              Recapture
            </Button>
          </Stack>
          <Stack sx={{ alignItems: "center" }} spacing={4}>
            <Typography sx={{ maxWidth: "162px", color: "#7165E3" }}>
              Please upload Electricity,Telephone,Gas Bill of your SHOP / OFFICE
            </Typography>

            <img
              src=""
              alt=""
              style={{
                width: "96px",
                height: "96px",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
            <Button variant="outlined" sx={{ color: "#000000" }}>
              Recapture
            </Button>
          </Stack>
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ mt: "60px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7165E3", float: "right" }}
          //   onClick={()=>{handleClick("jobCard")}}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default BillUploaded;
