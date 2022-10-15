import { Stack, Typography } from "@mui/material";
import React from "react";
import Section from "../Section";

const HeaderOne = () => {
  return (
    <Section>
      <Typography variant="body2" className="text-sm">Buy $SAVEH token on SwapScanner</Typography>
      <button className="btn-primary">Connect Wallet</button>
    </Section>
  );
};

export default HeaderOne;
