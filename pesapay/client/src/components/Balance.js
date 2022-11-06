import React,{useState} from "react";
//import { formatUnits, parseUnits } from "ethers/lib/utils";
import { ethers } from "ethers";
import styles from "../styles";

const Balance = () => {
   const [bal, setbal] = useState("");

async function getBalance() {
  
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const address =  await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  
  let balance = await provider.getBalance(address[0]);
  // we use the code below to convert the balance from wei to eth
  balance = ethers.utils.formatEther(balance);
  setbal(balance)
}
 getBalance()

  return (
    <div className={styles.balance}>
      <p className={styles.balanceText}>
        {bal ? (
          <>
            <span className={styles.balanceBold}>Balance:{bal} </span>
            {/* {getBalance("0x0FaF8Dbb2a7820E34D943aAc81D8Aef9A6e9d0B1") ?? parseUnits("0")} */}
          </>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default Balance;
