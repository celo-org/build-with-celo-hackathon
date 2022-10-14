import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #000 20%, #7228BB)",
        pb: "1%",
      }}
    >
      <Container maxWidth="xl">
        <Divider sx={{ "&.MuiDivider-root": { background: "grey" } }} />
        <Grid container spacing={2} mt="2%" mb="2%">
          <Grid item xs={12} sm={3}>
            <Typography color="#fff">LetsGo</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box color="#fff">
              {" "}
              <Typography color="#fff" fontWeight={600}>
                Explore
              </Typography>
              <Typography>Music</Typography>
              <Typography>Tech</Typography>
              <Typography>Business</Typography>
              <Typography>Sports & Art</Typography>{" "}
              <Typography>Food & Drinks</Typography>
              <Typography>Fun & Adventure</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box color="#fff">
              {" "}
              <Typography fontWeight={600}>Company</Typography>
              <Typography>About Us</Typography>
              <Typography>Roadmap</Typography>
              <Typography>Team</Typography>
              <Typography>Partners</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box color="#fff">
              {" "}
              <Typography color="#fff" fontWeight={600}>
                Resources
              </Typography>
              <Typography>Why NFT tickets</Typography>
              <Typography>How it works</Typography>
              <Typography>Blog</Typography>
              <Typography>News</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box color="#fff">
              {" "}
              <Typography color="#fff" fontWeight={600}>
                Contacts
              </Typography>
              <Typography>Whatsapp</Typography>
              <Typography>Twitter</Typography> <Typography>Discord</Typography>{" "}
              <Typography>Entre</Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ "&.MuiDivider-root": { background: "gray" } }} />
        <Grid container color="#fff" mt="1%">
          <Grid item xs={12} md={8}>
            <Box>
              <Typography>
                Copyright © {new Date().getFullYear()} LetsGo ™. All Rights
                Reserved. LetsGo is a registered trademark
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ mr: "4%" }}>Terms & Conditions</Typography>
              <Typography>Privacy Policy</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
