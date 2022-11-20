import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";

const Item = ({ name, value }) => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Typography sx={{ color: "#1C1939CC" }}>{name}</Typography>
        <Typography sx={{ color: "#1C1939CC" }}>{value}</Typography>
      </Box>
    </>
  );
};

const GstUploaded = ({ handleClick }) => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 0.5fr",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#7165E3",
          }}
        >
          GST Registration Certificate
        </Typography>
        <img
          src=""
          alt=""
          style={{
            backgroundColor: "#C4C4C4",
            width: "102px",
            height: "102px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
        <Stack sx={{ alignItems: "center" }}>
          <img
            src="./assets/ok.png"
            alt=""
            style={{ height: "48px", width: "48px", objectFit: "contain" }}
          />
          <Button variant="contained" sx={{ backgroundColor: "#7165E3" }}>
            Recapture
          </Button>
        </Stack>
      </Box>
      <Container maxWidth="sm" sx={{ mt: "42px" }}>
        <Stack>
          <Item name="Legal Name" value="XXXXXX" />
          <Item name="Constitution" value="XXXXXX" />
          <Item name="Address" value="XXXXXX" />
          <Item name="Status " value="XXXXXX" />
          <Item name="Date of Validity From" value="00/00/0000" />
          <Item name="GST Turnover Slab" value="xxxxx" />
          <Item name="Payment Regularity" value="xxxx" />
        </Stack>
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

export default GstUploaded;
