import React from "react";
import Image from "next/image";
import { Stack, Box, Grid } from "@mui/material";

const FeaturesImage = () => {
  return (
    <Grid item md={5} >
      <Stack alignItems="flex-end">
        <Box mb={4}>
          {" "}
          <Image src="/images/Features/Image1.png" width={550} height={480} />
        </Box>
        <div className="mt-8 self-start">
          {" "}
          <Image src="/images/Features/Image2.png" width={550} height={480} />
        </div>
      </Stack>
    </Grid>
  );
};

export default FeaturesImage;
