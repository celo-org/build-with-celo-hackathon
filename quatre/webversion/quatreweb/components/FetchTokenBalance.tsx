import React, { useState } from "react";
import { Button, Typography, Tooltip} from "@mui/material";
import { useCelo } from '@celo/react-celo';

const defaultBalance: string | undefined = "0.00";

function FetchTokenBalance() {
  const [tokenBalance, setTokenBalance] = useState(defaultBalance);
  // const [filtered, setFiltered] = useState([]);
  // const { getConnectedKit, initialised, walletChainId, network, address } = useCelo();

  // React.useEffect(() => {
  //   async function fetchBalance() {
  //     const tx = await getConnectedKit();
  //     tx.celoTokens.balancesOf(String(address)).then((returnBalance) => {
  //       const formatedBalance = returnBalance.cUSD?.toNumber().toPrecision().toString();
  //       console.log("formatedBalance", formatedBalance);
  //       setTokenBalance(formatedBalance);
  //     });
  //   }
  //   fetchBalance();
  // },[address,]);

  return (
    <React.Fragment>
      {/* <Tooltip title="Your Celo balance appears here"> */}
        {/* <span> */}
          <Button 
            variant="text" 
            sx={{background: "orange", 
              display: 'flex', 
              gap: 2,
              justifyContent: "space-between",
              alignItems: 'center'
            }}
          >
            <Typography sx={{color: 'HighlightText'}}>{"Balance"}{':'}</Typography>
            <span className=" text-orange-500 font-bold">{tokenBalance}</span>
          </Button>
    </React.Fragment>
  );
}

export default FetchTokenBalance;
