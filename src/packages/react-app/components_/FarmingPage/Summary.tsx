import { summaryText } from "@/data";
import React from "react";
import { Typography, Stack, Box, Grid, Divider } from "@mui/material";

const Summary = () => {
  return (
    <Grid item xs={12} md={6}>
      <Typography color="#6C6A65" mb={4} variant="h5" fontWeight={"bold"}>
        {summaryText.title}
      </Typography>
      {summaryText.summary.map((item, index) => (
        <div key={index}>
          <Stack direction="row" justifyContent={"space-between"} alignItems="center" py={2}>
            <Typography color="#6C6A65" variant="body1" fontWeight={"bold"}>
              {item.title}
            </Typography>
            <Typography color="#6C6A65" variant="body1">
              {item.text}
            </Typography>
          </Stack>
          <Divider />
        </div>
      ))}
      <Typography color="#A8A7A4" variant="body2" mt={6}>
        {summaryText.bottomText}
      </Typography>
    </Grid>
  );
};

export default Summary;
