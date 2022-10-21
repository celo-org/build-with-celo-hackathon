import React from "react";
import Image from "next/image";
import { Box, Grid } from "@mui/material";

const FeaturesImage = () => {
  return (
    <Grid item xs={12} md={5} sx={{ paddingX: { xs: 8, md: 0 } }}>
        <Box mb={4} sx={{ textAlign: { xs: "right", md: "unset" } }}>
          {" "}
          <Image src="/images/Features/Image1.png" width={550} height={480} />
        </Box>
        <Box sx={{ textAlign: { xs: "left", md: "unset" } }}>
          {" "}
          <Image src="/images/Features/Image2.png" width={550} height={480} />
        </Box>
    </Grid>
  );
};

export default FeaturesImage;
