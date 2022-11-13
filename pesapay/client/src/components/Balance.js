import React, { useState } from "react"
//import { formatUnits, parseUnits } from "ethers/lib/utils";
import { ethers } from "ethers"
import styles from "../styles"

const Balance = () => {
  const [bal, setbal] = useState("")

  async function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const address = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    const signer = provider.getSigner()
    let balance = await provider.getBalance(signer.getAddress())
    // we use the code below to convert the balance from wei to eth
    balance = ethers.utils.formatEther(balance)
    console.log(balance)

    setbal(balance)
  }
  getBalance()

  return (
    <div className={styles.balance}>
      <p className={styles.balanceText}>
        {bal ? (
          <>
            <span className={styles.balanceBold}>Balance:{bal} </span>
          </>
        ) : (
          ""
        )}
      </p>
    </div>
  )
}

export default Balance
