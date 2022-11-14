import React from "react";
import Section from "@/components_/Layout/Section";
import FeaturesImage from "./FeaturesImage";
import FeaturesText from "./FeaturesText";
import { Grid } from "@mui/material";

const Features = () => {
  return (
    <Grid container justifyContent='space-around' py={10}>
      <FeaturesText />
      <FeaturesImage />
    </Grid>
  );
};

export default Features;
