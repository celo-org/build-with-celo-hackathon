import React, { useState } from "react"
import { parseUnits } from "ethers/lib/utils"
import { approve, depositToken } from "../utils/depositFunction"
import { ethers } from "ethers"
import AmountIn from "./AmountIn"
import AmountOut from "./AmountOut"
import Balance from "./Balance"
import PhoneNo from "./PhoneNo"
import styles from "../styles"
import { useEthers } from "@usedapp/core"
import { toast } from "react-toastify"
const Exchange = () => {
  const { library } = useEthers()
  const api = "https://api.exchangerate-api.com/v4/latest/USD"
  function getResults() {
    fetch(`${api}`)
      .then((toToken) => {
        return toToken.json()
      })
      .then(displayResults)
  }
  function displayResults(Currency) {
    // let fromRate = currency.rates["USD"];
    let toRate = Currency.rates[currency]
    const finalValue = toRate * cashOutValue * intousd
    setintocurrency(finalValue)
  }

  const [cashOutValue, setcashOutValue] = useState("0")
  // eslint-disable-next-line
  const [cashOutToken, setcashOutToken] = useState("")
  // eslint-disable-next-line
  const [tokenaddress, settokenaddress] = useState("")
  const [prefix, setprefix] = useState("")
  // eslint-disable-next-line
  const [networkHandler, setNetworkHandler] = useState(
    parseInt(window.ethereum.chainId, 16)
  )
  const [phoneNumber, setphoneNumber] = useState("")
  const [currency, setcurrency] = useState("")
  const [intocurrency, setintocurrency] = useState("")
  const [intousd, setintousd] = useState("")
  const onCashOutValueChange = (value) => {
    const trimmedValue = value.trim()

    try {
      trimmedValue && parseUnits(value)
      setcashOutValue(value)
    } catch (e) {}
  }
  const sendtx = async () => {
    toast(" Approve transaction!", { type: "info" })
    const amt = ethers.utils.parseEther(cashOutValue)
    const phNo = "" + prefix + phoneNumber
    const phoneNo = phNo.replace(/[^0-9]/g, "")
    try {
      const x = await approve(amt)
      if (!x) throw new Error("Token not Approve")
      toast("sign transaction to complete!", { type: "info" })
      await depositToken(amt, phoneNo, library, intocurrency, currency)
      toast("Fiat Transaction Intiated!", { type: "success" })
    } catch (error) {
      toast(error.message, { type: "error" })
    }
  }
  const onNetworkHandler = (value) => {
    setNetworkHandler(value)
  }

  const intoUsdhandler = (value) => {
    setintousd(value)
  }
  const onCurrencyChange = (value) => {
    setcurrency(value)
  }

  const oncashOutToken = (value) => {
    setcashOutToken(value)
  }
  const phoneNumberChange = (value) => {
    setphoneNumber(value)
  }
  const taddresshandler = (value) => {
    settokenaddress(value)
  }
  const prefixhandler = (value) => {
    setprefix(value)
  }
  getResults()
  return (
    <div className='flex flex-col w-full items-center'>
      <div className='mb-8 w-[100%]'>
        <AmountIn
          value={cashOutValue}
          onChange={onCashOutValueChange}
          onChain={onNetworkHandler}
          onToken={oncashOutToken}
          inUsd={intoUsdhandler}
          taddress={taddresshandler}
        />
        <Balance />
      </div>

      <div className='mb-8 w-[100%]'>
        <AmountOut
          value={intocurrency}
          onSelect={onCurrencyChange}
          cPrefix={prefixhandler}
        />
      </div>

      <div className='mb-8 w-[100%]'>
        <PhoneNo
          value={phoneNumber}
          onChange={phoneNumberChange}
          phoneprefix={prefix}
        />
      </div>

      <button
        onClick={sendtx}
        className={`${"bg-[#ffcf00] text-black"} ${styles.actionButton}`}
      >
        {"Approve"}
      </button>
    </div>
  )
}

export default Exchange
