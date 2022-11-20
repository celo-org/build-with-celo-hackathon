import React from "react";
import { Box, Stack, Container, Button, Typography, Grid } from "@mui/material";

const Item = ({ path, name }) => {
  return (
    <Box
      sx={{
        border: "1px solid #000000",
        borderRadius: "12px",
        width: "180px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={path}
        alt=""
        style={{
          width: "110px",
          height: "94px",
          objectFit: "contain",
        }}
      />
      <Typography
        sx={{
          maxWidth: "150px",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

const Docs = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#7165E3",
          height: "140px",
          textAlign: "center",
          pt: "45px",
          color: "#ffffff",
          borderEndStartRadius: "12px",
          borderEndEndRadius: "12px",
        }}
      >
        <Stack
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Please Keep these Handy</Typography>
        </Stack>
      </Box>
      <Container
        maxWidth="md"
        sx={{
          mt: "50px",
          textAlign: "center",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Item
              path="./assets/pan.png"
              name="1. PAN Card or MGNREGA card "
            ></Item>
          </Grid>
          <Grid item xs={4}>
            <Item path="./assets/aadhar.png" name="2. AADHAR"></Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              path="./assets/udyogAadharCertificate.png"
              name="3. UDYAM / Shop Establishment / FSSAI / GST / Other Business Proof"
            ></Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              path="./assets/houseUtilityBills.png"
              name="4. Utility Bills of Residence and Shop "
            ></Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              path="./assets/passbook.png"
              name="5. Bank Account Details"
            ></Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              path="./assets/smiling.png"
              name="6. SMILE ON YOUR FACE "
            ></Item>
          </Grid>
        </Grid>
      </Container>
      <Container
        maxWidth="sm"
        sx={{
          py: "60px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "#7165E3",
            float: "right",
          }}
        >
          I am Ready, Let’ Go !!
        </Button>
      </Container>
    </>
  );
};

export default Docs;