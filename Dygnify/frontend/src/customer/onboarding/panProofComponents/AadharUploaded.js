import React from "react";
import { Container, Box, Typography, Stack, Button } from "@mui/material";

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

const AadharUploaded = () => {
  return (
    <>
      <Container>
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
            AADHAR No
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#7165E3",
            }}
          >
            123456789123
          </Typography>
          <Stack sx={{ alignItems: "center" }}>
            <img
              src="./assets/ok.png"
              alt=""
              style={{ height: "48px", width: "48px", objectFit: "contain" }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#FFFFFF", color: "#000" }}
            >
              Recapture
            </Button>
          </Stack>
        </Box>
      </Container>
      <Container maxWidth="sm" sx={{ mt: "42px" }}>
        <Stack>
          <Item name="Name" value="Test" />
          <Item name="Dob" value="00/00/0000" />
          <Item name="Address" value="Test" />
          <Item name="Mobile No" value="1234567890" />
        </Stack>
      </Container>
      <Container maxWidth="md" sx={{ mt: "60px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7165E3", float: "right" }}
          // onClick={()=>{}}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default AadharUploaded;
