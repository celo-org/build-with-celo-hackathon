import React from "react";
import { makeStyles } from "@material-ui/core";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { Skeleton } from "@mui/material";
import sendtransaction from "../apis";
// import { useCelo } from "@celo/react-celo";
// import * as digesu from "../../backend/deployments/alfajores/Digesu.json"
// import * as token from "../../backend/deployments/alfajores/QuatreToken.json"
// import * as manager from "../../backend/deployments/alfajores/AccountManager.json"
// import DexPoolOneFile from "../../contracts/artifacts/contracts/BnbToStable/Decentralized/DexPoolOneFile.sol/DexPoolOneFile.json";
// import Pproxy from "../../contracts/artifacts/contracts/BnbToStable/Decentralized/DexPoolOneFile.sol/Pproxy.json";
// import * as dex from "../contracts/bsc.json";
// import * as prox from "../contracts/pproxy.json"


export default function utilities(setmessage) {
  const getEmptyData = (wave) => <Skeleton animation={wave} style={{ background: "rgb(0, 1, 2, 0.055)" }} />;
  const { read } = sendtransaction();

  return {
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "0.1em solid #fff",
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3
    },
    useStyles: {
      field: {
        marginTop: 20,
        marginBottom: 20,
        display: "block"
      }
    },
    // denom: () => den[network.chainId.toLowerCase()],
    // Utility to format numbers javascipt numbers
    formatValue: x => {
      if (x === 0) return 0;
      let result;
      const isBigNumber = BigNumber.isBigNumber(x);
      if (isBigNumber) {
        result = ethers.utils.formatEther(x);
      } else {
        result = null;
      }
      return result;
    },

    // Retrieve contracts' JSONInterfaces
    // getAbi: getAbis,

    // Loading component
    getEmptyData,

    // Get contract address for contract on specified chain'c chainId

    fetchProxy: async param => {
      const options = { abi: param?.proxy, contractAddress: param?.poolAddress, account: param?.account, functionName: "getAllInfo" };
      const result = await read(options, setmessage);
      if (!result) return null;
      return result;
    },
    // Filter all bands/communities an user belong to
    isIncluded: (unFiltered=["",], value="") => {
      if (unFiltered.length === 0) return false;
      const isFiltered = unFiltered.filter(item => item.toLowerCase() === value?.toLowerCase());
      return isFiltered[0] === value;
    },
    emptyList: () => {
      var emList = [];
      var counter = 10;
      for (let i = 0; i < counter; i++) {
        emList.push({ id: i, value: getEmptyData("wave") });
      }
      return emList;
    }
  };
}
