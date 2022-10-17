import { stats } from '@/data'
import React from 'react'
import { Stack, Typography, Box } from "@mui/material";

const Stats = () => {
    return (
      <Box bgcolor='#FBD981' textAlign='center' py={6} >
        <Typography variant='h4' fontWeight={'bold'}>{stats.heading} </Typography>
        <p className="text-center text-lg my-5">{stats.subText} </p>
        <Stack direction='row' justifyContent='space-around' my={10} >
          {stats.statistics.map((stat, index) => (
            <div key={`${stat.number}-${stat.text}-${index}`} className="text-center mt-5">
              <Typography variant='h1' fontWeight='bold'>{stat.number} </Typography>
              <Typography>{stat.text} </Typography>
            </div>
          ))}
        </Stack>
      </Box>
    );
  };
  
  export default Stats;