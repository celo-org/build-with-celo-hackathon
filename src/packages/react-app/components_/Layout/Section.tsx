import React from "react";
import { Stack, Typography } from "@mui/material";

const Section = ({ children, className='', py=2 }) => {
  return (
    <Stack px={8} py={py} direction="row" justifyContent="space-between" alignItems="center" className={className}>
      {children}
    </Stack>
  );
};

export default Section;
