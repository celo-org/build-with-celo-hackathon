import React from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";

const PanOption = () => {
  return (
    <>
      <style>{"body { background-color: #7165E3; }"}</style>
      <Container maxWidth="sm">
        <Box
          sx={{
            color: "#ffffff",
            textAlign: "center",
            mt: "56px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              maxWidth: "400px",
              mx: "auto",
            }}
          >
            Do you have a PAN Card ?
          </Typography>
          <img
            style={{
              width: "300px",
              height: "250px",
              objectFit: "contain",
              pt: "12px",
            }}
            src="./assets/pan1.png"
            alt=""
          />
        </Box>
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          mt="38px"
        >
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#9EA6BE",
                color: "#7165E3",
              }}
            >
              No
            </Button>
          </Grid>
          <Grid item xs={0}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ffffff",
                color: "#7165E3",
              }}
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PanOption;
