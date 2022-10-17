import React from "react";
import Image from "next/image";
import { footerlinks } from "@/data";
import { Stack, Typography, Box, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="flex-end
    "
      bgcolor="#312D22"
      py={6}
      px={4}
    >
      <Grid item className="flex flex-col">
        <div>
          {" "}
          <Image src="/images/Footer/Logo.png" width={45} height={45} />
        </div>
        <Stack direction={"row"}>
          {" "}
          {footerlinks.map((link, index) => (
            <Typography component="a" key={index} color="#ffffff" mr={2} mt={4} fontWeight="light">
              {link.title}
            </Typography>
          ))}
        </Stack>
      </Grid>
      {/* <hr color='#9E9887' /> */}
      <Grid item className="mt-10 md:mt-0">
        <Typography color="#C9C4B5">
          © 2022 savingHistory. All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
