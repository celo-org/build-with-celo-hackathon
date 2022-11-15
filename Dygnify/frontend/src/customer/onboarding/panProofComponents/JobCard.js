import React from "react";
import { Container, Stack, Typography, Button } from "@mui/material";

const JobCard = ({handleClick}) => {
  return (
    <>
      <Container maxWidth="sm">
        <Stack
          spacing={6}
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
            Please Upload your JOB CARD
          </Typography>
          <div
            style={{
              backgroundColor: "#7165E3",
              width: "134px",
              height: "116px",
              objectFit: "contain",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="./assets/upload.png"
              alt=""
              style={{
                width: "80px",
                height: "96px",
                cursor: "pointer",
              }}
              onClick={() => {
                console.log("clicked");
              }}
            />
          </div>
          <Typography sx={{ color: "#979797" }}>
            Terms like what formats can be uploaded and how much KB
          </Typography>
        </Stack>
      </Container>
      <Container maxWidth="md" sx={{ mt: "60px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7165E3", float: "right" }}
          onClick={()=>{handleClick("jobCardUploaded")}}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default JobCard;
