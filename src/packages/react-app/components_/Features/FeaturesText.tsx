import { features } from '@/data'
import React from 'react'
import { Typography, Box, Grid } from "@mui/material";

const FeaturesText = () => {
  return (
    <Grid item xs={12} md={5} sx={{ paddingX: { xs: 8, md: 0 } }}>
    {features.map((feature, index) => (
      <Box key={index} mb={8}>
        <img
          src={feature.image}
          className="feature-icon"
        />
        <Typography variant='h5' pt={1} fontWeight='bold'>
          {feature.heading}
        </Typography>
        <Typography variant='subtitle1' py={2}>
          {feature.content}{" "}
        </Typography>
        <Typography variant='subtitle2'>
          {feature.subText}{" "}
        </Typography>
      </Box>
    ))}
  </Grid>
  )
}

export default FeaturesText