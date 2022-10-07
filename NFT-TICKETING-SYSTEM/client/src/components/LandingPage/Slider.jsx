import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Slider = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #000 20%, #7228BB)",
        pt: "5%",
      }}
    >
      <Container maxWidth="xl">
        <Box>
          <Typography
            fontSize={{ xs: "22px", sm: "30px", md: "48px" }}
            fontWeight={900}
            color="#fff"
          >
            New Events
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Slider;
