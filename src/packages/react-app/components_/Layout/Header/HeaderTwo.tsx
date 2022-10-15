import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { navlinks } from "../../../data";
import Section from "../Section";

const HeaderTwo = () => {
  return (
    <Section className=" nav-shadow">
      <Image src="/images/Header/SH-Logo.png" width={200} height={50} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" >
        {navlinks.map((navlink, index) => (
          <Typography key={index} ml={2}>{navlink.title}</Typography>
        ))}
      </Stack>
    </Section>
  );
};

export default HeaderTwo;
