import React from "react";
import {
  Container,
  Stack,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";

const BusinessProofUploaded = ({ handleClick }) => {
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
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={6}>
              <Typography>Name of Business Proof</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Name" variant="outlined" />
            </Grid>
          </Grid>
          <Typography
            sx={{
              color: "#979797",
            }}
          >
            Uploaded Business Proof
          </Typography>
          <img
            src=""
            alt=""
            style={{
              width: "100px",
              height: "110px",
            }}
            onClick={() => {
              console.log("clicked");
            }}
          />
          <Typography sx={{ color: "#7165E3" }}>
            Terms like what formats can be uploaded and how much KB
          </Typography>
          <Button variant="outlined" sx={{ color: "#000000" }}>
            Recapture
          </Button>
        </Stack>
      </Container>
      <Container maxWidth="md" sx={{ mt: "40px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7165E3", float: "right" }}
          onClick={() => {
            handleClick("jobCardUploaded");
          }}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default BusinessProofUploaded;
