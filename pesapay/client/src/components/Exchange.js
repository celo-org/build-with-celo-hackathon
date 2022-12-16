import React, { useState } from "react"
import { parseUnits } from "ethers/lib/utils"
import { approve, depositToken } from "../utils/depositFunction"
import { ethers } from "ethers"
import AmountIn from "./AmountIn"
import AmountOut from "./AmountOut"
import PhoneNo from "./PhoneNo"
import styles from "../styles"
import { useEthers } from "@usedapp/core"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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

  const notify = (message) => toast.info(message)

  const [cashOutValue, setcashOutValue] = useState("0")
  const [cashOutToken, setcashOutToken] = useState("")
  const [prefix, setprefix] = useState("")
  const [networkHandler, setNetworkHandler] = useState("") // initialFromToken
  const [phoneNumber, setphoneNumber] = useState("")
  //eslint-disable-next-line
  const [tokenAddress, settokenaddress] = useState("")
  const [currency, setcurrency] = useState("")
  const [intocurrency, setintocurrency] = useState("")
  // const [resetState, setResetState] = useState(false)
  const [intousd, setintousd] = useState("")

  const onCashOutValueChange = (value) => {
    const trimmedValue = value.trim()
    try {
      trimmedValue && parseUnits(value)
      setcashOutValue(value)
    } catch (e) {}
  }

  const sendtx = async () => {
    const amt = ethers.utils.parseEther(cashOutValue)
    const phNo = "" + prefix + phoneNumber
    const phoneNo = phNo.replace(/[^0-9]/g, "")
    console.log(
      amt,
      phNo,
      phoneNo,
      intocurrency,
      currency,
      networkHandler,
      cashOutToken
    )
    notify("Please Approve Transaction")
    const x = await approve(amt)
    if (!x) {
      notify("Token not Approved")
      throw new Error("Token not Approved")
    }
    notify("Please sign the transaction")
    try {
      await depositToken(amt, phoneNo, library, intocurrency, currency)
    } catch (error) {
      toast.error(error.message)
    }
  }
  const onNetworkHandler = (value) => {
    setNetworkHandler(value)
  }

  const intoUsdhandler = (value) => {
    setintousd(value)
  }
  //console.log(fromValue,fromToken,intousd,toToken)
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
  // console.log(cashOutValue,intocurrency,currency)
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
        className={`${"bg-emerald-600 text-white"} ${styles.actionButton}`}
      >
        {"Approve"}
      </button>
    </div>
  )
}

export default Exchange
