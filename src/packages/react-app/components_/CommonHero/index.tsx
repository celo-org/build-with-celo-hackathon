import React from "react";
import { Typography, Stack, Box } from "@mui/material";

const CommonHero = ({ heading, paragraph, buttonText }) => {
  return (
    <Stack alignItems={"center"} textAlign={"center"} className="bg-ash" sx={{ paddingY: { xs: 4, md: 10 } }}>
      <Box sx={{ paddingX: { xs: 4, md: 15 }, width: { xs: "100%", md: "70%" } }}>
        <Typography fontWeight="bold" variant="h2">
          {heading}
        </Typography>
        <Typography variant="h6" my={4}>
          {paragraph}
        </Typography>
        <button className="btn-primary">{buttonText}</button>
      </Box>
    </Stack>
  );
};

export default CommonHero;
