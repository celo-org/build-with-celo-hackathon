import React from "react";
import Image from "next/image";
import SavehCard from "./SavehCard";
import Summary from "./Summary";
import { useCelo } from "@celo/react-celo";
import {  Box, Grid ,Typography} from "@mui/material";

const Section = () => {
  const { address } = useCelo();
  console.log(address);
  return (
    <Box  py={6} sx={{paddingX:{xs: 2, sm: 4, md: 6}}}>
      {address === null ? (
        <Box textAlign={"center"}>
          <Image src="/images/Other/wallet.png" width={550} height={420} />
          <p style={{ padding: "0 10px" }}>
            To view your $SAVEH balance and receive your
            <br /> rewards, <span style={{ color: "#F9AB3A" }}>Connect to your wallet.</span>
          </p>
        </Box>
      ) : (
        <>
          <Typography  textAlign={"center"} >
            Epoch will end in <Typography variant="h4" color={'#F9AB3A'} component={'span'} fontWeight='bold' >23h .14m. 58s</Typography>
          </Typography>
          <Grid container justifyContent={'space-between'} my={6}>
            <SavehCard />
            <Summary />
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Section;
