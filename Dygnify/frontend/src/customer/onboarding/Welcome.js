import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  Button,
  Container,
  Grid,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Link } from "react-router-dom";

const Item = ({ children, data, value }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        maxWidth: "180px",
        height: "140px",
        textAlign: "center",
        px: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px 0px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      {children}
      <Typography variant="body1">{data}</Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
};

const Welcome = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#7165E3",
          height: "180px",
          textAlign: "center",
          pt: "35px",
          color: "#fff",
          borderEndStartRadius: "12px",
          borderEndEndRadius: "16px",
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Avatar
              alt="women"
              src="./assets/woman.png"
              sx={{
                width: 70,
                height: 70,
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h4">Welcome to Dygnify</Typography>
          </Grid>
        </Grid>
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          transform: "translateY(-45%)",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Item data="Loan upto Rs " value="50,000 /-">
              <CurrencyRupeeIcon />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item data="Tenure upto " value="24 months">
              <AccessTimeIcon />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item data="Rate of interest" value="21% - 24%">
              <CurrencyExchangeIcon />
            </Item>
          </Grid>
        </Grid>
      </Container>
      <Stack
        sx={{
          my: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Link to="#">Tell me more</Link>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7165E3",
          }}
        >
          Apply Now
        </Button>
      </Stack>
      <Stack
        sx={{
          backgroundColor: "#ffffff",
          position: "absolute",
          bottom: "0px",
          right: "16px",
          height: "32px",
          px: "8px",
        }}
      >
        <Typography>
          "Shakti helped me to open a shop in my village and earn" -Devi
        </Typography>
      </Stack>
      <Box>
        <img
          style={{
            width: "100%",
            height: "300px",
            objectFit: "contain",
          }}
          src="./assets/devi.png"
          alt="devi"
        />
      </Box>
    </>
  );
};

export default Welcome;