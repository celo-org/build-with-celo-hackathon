import { features } from '@/data'
import React from 'react'
import { Stack, Typography, Box, Grid } from "@mui/material";

const FeaturesText = () => {
  return (
    <Grid item md={5}>
    {features.map((feature, index) => (
      <Box key={index} mb={8}>
        <img
          src={feature.image}
          className="feature-icon"
        />
        <Typography variant='h6' pt={1} fontWeight='bold'>
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