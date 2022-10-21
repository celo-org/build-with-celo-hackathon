import React from "react";
import { Typography, Grid } from "@mui/material";
import Section from "@/components_/Layout/Section";
import { heroText } from "@/data";
import Image from "next/image";

const Hero = () => {
  return (
    <Grid container justifyContent='space-between' sx={{ paddingX: { xs: 4, md: 8 } }} className="bg-ash" py={4}>
      <Grid item xs={12} lg={5}  mr={2}>
        <Typography fontWeight="bold" variant="h2">
          {heroText.heading}
        </Typography>
        <Typography variant="h6" my={4}>
          {heroText.paragraph}
        </Typography>
        <button className=" btn-primary" id="hero-cta">
          {heroText.buttonText}
        </button>
        <Typography variant="body2" mt={2}>
          {heroText.subText} <span className="font-semibold">Learn More</span>
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6} textAlign='center' >
        <Image src="/images/Hero/Image.png" className="hero-image" width={600} height={580} />
      </Grid>
    </Grid>
  );
};

export default Hero;
