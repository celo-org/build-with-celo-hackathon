import React from "react";
import {
  Container,
  Stack,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";

const BusinessProofUpload = ({ handleClick }) => {
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
            Please Upload the Business Proof
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
          <Typography sx={{ color: "#7165E3" }}>
            Terms like what formats can be uploaded and how much KB
          </Typography>
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

export default BusinessProofUpload;
