import React from "react";
import { savehCardText } from "@/data";
import { Typography, Stack, Box, Grid } from "@mui/material";

const SavehCard = () => {
  return (
    <Grid item xs={12} md={5} sx={{marginBottom:{xs: 5, md: 0}}} className="saveh-card ">
      <Typography color="#6C6A65" mb={4} variant="h5" fontWeight={"bold"}>
        {savehCardText.heading1}
      </Typography>
      <Typography color="#6C6A65" variant="h5">
        {savehCardText.heading2}
      </Typography>
      <Typography color="#848077" my={4}>
        {savehCardText.text1}
      </Typography>
      <Typography color="#312D22" fontWeight={"bold"} variant="h5" mb={4} bgcolor="#F1F0F0" p={3} display="inline-block">
        {savehCardText.price}
      </Typography>
      <Typography color="#848077" className="text-[#848077]">
        {savehCardText.text2}
      </Typography>
    </Grid>
  );
};

export default SavehCard;
