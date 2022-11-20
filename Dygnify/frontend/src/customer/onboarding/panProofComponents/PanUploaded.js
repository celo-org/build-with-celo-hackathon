import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";

const PanUploaded = ({handleClick}) => {
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
          PAN Card
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography sx={{ color: "#1C1939CC" }}>PAN No</Typography>
            <Typography sx={{ color: "#1C1939CC" }}>ABCDE1234Z</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography sx={{ color: "#1C1939CC" }}>First Name</Typography>
            <Typography sx={{ color: "#1C1939CC" }}>Test</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography sx={{ color: "#1C1939CC" }}>Last Name</Typography>
            <Typography sx={{ color: "#1C1939CC" }}>Test</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography sx={{ color: "#1C1939CC" }}>DOB</Typography>
            <Typography sx={{ color: "#1C1939CC" }}>00/00/0000</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography sx={{ color: "#1C1939CC" }}>Gender</Typography>
            <Typography sx={{ color: "#1C1939CC" }}>Male</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography sx={{ color: "#1C1939CC" }}>Father’s Name</Typography>
            <Typography sx={{ color: "#1C1939CC" }}>Test</Typography>
          </Box>
        </Stack>
      </Container>
      <Container maxWidth="md" sx={{ mt: "60px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#979797", float: "right" }}
          onClick={()=>{handleClick("jobCard")}}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default PanUploaded;
