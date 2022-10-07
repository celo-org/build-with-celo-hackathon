import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import banner from "../../assets/ticketbanner.svg";
import { CustomButton } from "./CustomButton";

const Banner = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #000 20%, #7228BB)",

        pt: "5%",
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box color="#fff">
              <Typography
                fontWeight={600}
                fontSize={{ xs: "28px", md: "48px" }}
                textAlign="center"
                lineHeight="50.09px"
              >
                NFT TICKETING PLATFORM FOR BUSINESS & RECREATIONAL EVENTS NEAR
                YOU.
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={{ xs: "28px" }}
                mt="6%"
                lineHeight="38.13px"
              >
                Get into the new world of NFTs where your NFT is your ticket to
                your favorite events.
              </Typography>
            </Box>
            <Box
              sx={{
                mt: "10%",
                width: "80%",
                display: "flex",
                justifyContent: "center",
                pb: "4%",
              }}
            >
              <CustomButton sx={{ width: "203px" }}>Create Event</CustomButton>
              <CustomButton sx={{ ml: "10%", width: "179px" }}>
                Explore
              </CustomButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{ maxWidth: 550, backgroundColor: "inherit", boxShadow: 0 }}
            >
              <CardMedia component="img" image={banner} alt="ticket" />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
