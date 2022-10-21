import React from "react";
import Image from "next/image";
import { Grid, Stack, TextField } from "@mui/material";

const NewsLetter = () => {
  return (
    <Grid container justifyContent="space-between" py={4} px={6}>
      <Grid item md={6}>
        <h2>Receive updates on our development, new features, and impact analysis.</h2>
        <Stack sx={{ flexDirection: { xs: "column", md: "row" } }} justifyContent="space-between">
          {/* <input className="bg-[#F5F5F4] p-5 lg:basis-1/2 my-3 lg:my-0" placeholder="Enter your email address here" /> */}
          <TextField id="filled-basic" label="Enter your email address here" variant="filled" sx={{ marginBottom: { xs: "20px", md: 0 } }} />
          <button className="btn-primary">Subscribe Now</button>
        </Stack>
      </Grid>
      <Grid item xs={12} md={5} sx={{ marginTop: { xs: "20px", md: 0 }, textAlign: { xs: "center", md: "unset" } }}>
        <Image src="/images/Newsletter/img.png" width={550} height={236} />
      </Grid>
    </Grid>
  );
};

export default NewsLetter;
