import React from "react";
import { Container, Stack, Typography, Button } from "@mui/material";

const JobCardUploaded = ({handleClick}) => {
  return (
    <>
      <Container maxWidth="sm">
        <Stack
          spacing={4}
          sx={{
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#7165E3",
            }}
          >
            JOB CARD
          </Typography>
          <img
            src=""
            alt=""
            style={{
              width: "120px",
              height: "140px",
            }}
          />
          <Typography sx={{ color: "#979797" }}>
            Terms like what formats can be uploaded and how much KB
          </Typography>
          <Button
            variant="outlined"
            // sx={{ backgroundColor: "#FFFFFF", color: "#000000" }}
          >
            Recapture
          </Button>
        </Stack>
      </Container>
      <Container maxWidth="md" sx={{ mt: "60px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7165E3", float: "right" }}
          onClick={()=>{handleClick("aadhar")}}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default JobCardUploaded;
