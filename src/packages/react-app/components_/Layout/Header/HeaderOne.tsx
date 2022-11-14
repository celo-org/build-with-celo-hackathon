import { Typography } from "@mui/material";
import React from "react";
import Section from "../Section";
import { useCelo } from "@celo/react-celo";
import { truncateAddress } from "@/utils";
import { Chip } from "@mui/material";

const HeaderOne = () => {
  const { address, connect, destroy } = useCelo();

  return (
    <Section className="header-one">
      <Typography variant="body2" className="text-sm">
        Buy $SAVEH token on UbeSwap
      </Typography>
      <>
        {address && (
          <>
            <Chip label={truncateAddress(address)} variant="outlined" onDelete={destroy} sx={{ mx: 1 }} />
          </>
        )}
        {!address && (
          <button className="btn-primary" onClick={() => connect().catch((e) => console.log(e))}>
            Connect wallet
          </button>
        )}
      </>
    </Section>
  );
};

export default HeaderOne;
