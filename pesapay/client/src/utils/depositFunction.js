import { signMetaTxRequest } from "./signer"
import { ethers } from "ethers"
import createInstance from "../hooks/useContract"
import addresses from "../contracts/addresses.json"
import minimalForwarderAbi from "../contracts/minimalForwarder.json"
import cashOutAbi from "../contracts/cashOut.json"
import tokenAbi from "../contracts/token.json"
import axios from "axios"
import { toast } from "react-toastify"
import sdk from "redstone-sdk"
import protocol from "redstone-protocol"
import {convertStringToBytes32} from "redstone-protocol/dist/src/common/utils"

export async function approve(amount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const token = createInstance(addresses.Token, tokenAbi, signer)
  const tx = await token.approve(addresses.CashOut, amount)
  //console.log(tx)
  return tx
}
export async function getBalance(provider, address) {
  const token = createInstance(
    "0x91A794303F6A1D18Ae03ec689983568D76121E00", //tokenAddress of coin deployed for this project
    tokenAbi,
    provider
  )
  const tx = await token.balanceOf(address)
  return tx
}

async function sendMetaTx(
  amount,
  phoneNumber,
  provider,
  intocurrency,
  currency
) {
  const CELO_CASHOUT_WEBHOOK_URL =
    "https://api.defender.openzeppelin.com/autotasks/d577e57d-844f-4015-8f24-0fe85882b0a9/runs/webhook/e43ccace-89ee-47fe-ba09-47f0b0e551bc/U4w1pfp45eZ6iXNah9mSY3"
  const url = CELO_CASHOUT_WEBHOOK_URL
  const signedDataPackagesResponse = await sdk.requestDataPackages(
    {
      dataServiceId: "redstone-main-demo",
      uniqueSignersCount: 10,
      dataFeeds: ["CUSD"],
    },
    ["https://d33trozg86ya9x.cloudfront.net"]
  )
  const unsignedMetadata = "manual-payload"
  const redstonePayload = protocol.RedstonePayload.prepare(
    signedDataPackagesResponse.CUSD,
    unsignedMetadata
  )
  const cashOut = createInstance(addresses.CashOut, cashOutAbi, provider)
  const token = createInstance(addresses.Token, tokenAbi, provider)

  const forwarder = createInstance(
    addresses.MinimalForwarder,
    minimalForwarderAbi,
    provider
  )

  const minAmount = await cashOut.lowestCashoutAmount(
    `0x${redstonePayload}`,
    convertStringToBytes32("CUSD")
  )
  //console.log(minAmount)
  const signer = provider.getSigner()
  const from = await signer.getAddress()
  if (amount < minAmount) throw new Error(" amount less than minAmount")
  const allowance = await token.allowance(from, cashOut.address)
  if (amount < allowance) throw new Error(`Insufficient Allowance`)
  const data = cashOut.interface.encodeFunctionData("depositToken", [
    token.address,
    amount,
    `0x${redstonePayload}`,
    convertStringToBytes32("CUSD"),
  ])
  const params = {
    account_bank: "MPS", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
    account_number: phoneNumber, //256779177900
    amount: intocurrency, // input the converted amount here
    currency: currency, // depends on the country currency
    reference: "transfer-" + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
    debit_currency: "UGX",
    beneficiary_name: "cashout",
    callback_url: "https://webhook.site/865479d1-cf68-48b0-b26f-b0d33c0936b4",
  }

  //const from = await signer.getAddress()
  const to = addresses.CashOut
  const request = await signMetaTxRequest(
    signer.provider,
    forwarder,
    {
      to,
      from,
      data,
    },
    params
  )
  toast.success("Token Deposited")
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      try {
        if (res.status !== 200) throw new Error("error in transaction")
        // transaction to intiate payment of fiat funds
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(
          "/api/cashout",
          request.params,
          config
        )
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    })
    .catch((error) => console.log(error))
    .finally(() => toast.success("Transaction Successfull"))
}
export async function depositToken(
  amount,
  phoneNumber,
  provider,
  intocurrency,
  currency
) {
  if (!amount) throw new Error(`amount cannot be empty`)
  if (!phoneNumber) throw new Error(`phoneNumber cannot be empty`)
  if (!window.ethereum) throw new Error(`User wallet not found`)
  await window.ethereum.enable()
  const userNetwork = await provider.getNetwork()
  if (userNetwork.chainId !== 44787)
    throw new Error(`Please switch to celo alfajores network`)
  return sendMetaTx(amount, phoneNumber, provider, intocurrency, currency)
}
