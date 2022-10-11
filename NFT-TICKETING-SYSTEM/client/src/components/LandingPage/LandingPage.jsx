import { Box } from "@mui/material";
import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import Slider from "./Slider";

const LandingPage = () => {
  return (
    <Box>
      <Banner />
      <Slider />
      <Category />
    </Box>
  );
};

export default LandingPage;
