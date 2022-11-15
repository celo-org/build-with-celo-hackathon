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

const ShopEstUploaded = ({ handleClick }) => {
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
          Shop Establishment Certificate
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
          <Item name="Shop Establishment No" value="XXXXXX" />
          <Item name="Name of Business" value="XXXXXX" />
          <Item name="Nature of Business" value="XXXXXX" />
          <Item name="Address" value="XXXXXX" />
          <Item name="Phone" value="0000000000" />
          <Item name="E-mail Id " value="test@email.com" />
          <Item name="Date of Old Reg" value="00/00/0000" />
          <Item name="Date of New Reg" value="00/00/0000" />
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

export default ShopEstUploaded;
