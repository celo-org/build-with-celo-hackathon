import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import banner from "../../assets/ticketbanner.svg";

const Banner = () => {
  return (
    <Box sx={{ backgroundColor: "#E9F9DA", pt: "5%" }}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box>
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
                mt="2%"
                lineHeight="38.13px"
              >
                Get into the new world of NFTs where your NFT is your ticket to
                your favorite events.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{ maxWidth: 647, backgroundColor: "#E9F9DA", boxShadow: 0 }}
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
