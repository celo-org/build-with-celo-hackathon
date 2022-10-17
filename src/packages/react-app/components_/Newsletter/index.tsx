import React from "react";
import Image from "next/image";
import { Grid, Stack, Typography, Box, TextField } from "@mui/material";
import Section from "../Layout/Section";

const NewsLetter = () => {
  return (
    <Grid container justifyContent="space-between" py={4} px={6}>
      <Grid item md={6} >
        <h1>Receive updates on our development, new features, and impact analysis.</h1>
        <Stack direction={"row"} justifyContent="space-between">
          {/* <input className="bg-[#F5F5F4] p-5 lg:basis-1/2 my-3 lg:my-0" placeholder="Enter your email address here" /> */}
          <TextField id="filled-basic" label="Enter your email address here" variant="filled" />
          <button className="btn-primary">Subscribe Now</button>
        </Stack>
      </Grid>
      <Grid item md={5}>
        <Image src="/images/Newsletter/img.png" width={550} height={236} />
      </Grid>
    </Grid>
  );
};

export default NewsLetter;
