import { Box } from "@mui/material";
import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import Purpose from "./Purpose";
import Slider from "./Slider";

const LandingPage = () => {
  return (
    <Box>
      <Banner />
      <Slider />
      <Category />
      <Purpose />
    </Box>
  );
};

export default LandingPage;
