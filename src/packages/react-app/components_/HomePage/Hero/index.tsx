import React from "react";
import { Stack, Typography } from "@mui/material";
import Section from "@/components_/Layout/Section";
import { heroText } from "@/data";

const Hero = () => {
  return (
    <Section className="bg-ash" py={4}>
      <Stack mr={2}>
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
      </Stack>
      <div className="px-5 mt-10 md:mt-0">
        <img src="/images/Hero/Image.png" width={600} height={580} />
      </div>
    </Section>
  );
};

export default Hero;
