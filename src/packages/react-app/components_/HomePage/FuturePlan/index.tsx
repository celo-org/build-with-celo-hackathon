import { futurePlans } from '@/data'
import React from 'react'
import Image from "next/image";
import { Stack, Typography, Box } from "@mui/material";

const FuturePlan = () => {
  return (
    <Stack py={6} className="future-plan flex justify-center items-center py-20 px-8 md:px-10 lg:px-14">
    <Box className="future-plan-img" textAlign={'center'} >
      <img src="/images/FuturePlan/outline.png" />
    </Box>
    <div className="mobile-future-plan">
      <h1 style={{textAlign:'center', color: '#fff'}} className="text-[white] font-bold text-xl text-center">
        Our Future Plans
      </h1>
      <Box textAlign={'center'} className="text-center my-10">
        <Image src="/images/Footer/Logo.png" width={80} height={80} />
      </Box>
      <ul style={{margin: "0 10px"}} className="list-disc">
        {futurePlans.map((plan, index) => (
          <li key={index} style={{marginTop: 10}} className="my-5">
            {plan.text}{" "}
          </li>
        ))}
      </ul>
    </div>
  </Stack>
  )
}

export default FuturePlan