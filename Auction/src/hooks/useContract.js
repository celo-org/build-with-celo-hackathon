import { useState, useEffect, useCallback } from "react";
import Auction from "../util/QuickAuction.json";
import { useContractKit } from "@celo-tools/use-contractkit";

export const useContract = () => {
  const { getConnectedKit, address } = useContractKit();
  const [contract, setContract] = useState(null);

  const getContract = useCallback(async () => {
    const kit = await getConnectedKit();
    const con = new kit.web3.eth.Contract(Auction.abi, Auction.address);
    window.contract = con;
    setContract(con);
  }, [getConnectedKit]);

  useEffect(() => {
    if (address) getContract();
  }, [address, getContract]);

  return contract;
};
