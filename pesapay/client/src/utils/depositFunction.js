import { signMetaTxRequest } from "./signer"
import { ethers } from "ethers"
import createInstance from "../hooks/useContract"
import addresses from "../contracts/addresses.json"
import minimalForwarderAbi from "../contracts/minimalForwarder.json"
import cashOutAbi from "../contracts/cashOut.json"
import tokenAbi from "../contracts/token.json"
import { toast } from "react-toastify"
import axios from "axios"
// import redstone packages
const sdk = require("redstone-sdk")
const protocol = require("redstone-protocol")
const {
  convertStringToBytes32,
} = require("redstone-protocol/dist/src/common/utils")

export async function approve(amount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const token = createInstance(addresses.Token, tokenAbi, signer)
  const tx = await token.approve(addresses.CashOut, amount)
  tx.wait(5)
  return tx
}

// this is where the magic happens
//  functionality implements EIP712 type signing of transaction and EIP 2771 context for forwarding transactions for signing
// we use defender autotasks to automate transactions
// the signed request is sent to the autotask. the forwarder contract verifies it and then executes it wit gas paid by the relayer hosted on defender

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

  // redstone payload is added to the data transmitted with the transaction
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

  // creating instances of the smart contracts to interact with
  const cashOut = createInstance(addresses.CashOut, cashOutAbi, provider)
  const token = createInstance(addresses.Token, tokenAbi, provider)
  const forwarder = createInstance(
    addresses.MinimalForwarder,
    minimalForwarderAbi,
    provider
  )
  // making sure the amount entered is amove out minimum
  const minAmount = await cashOut.lowestCashoutAmount(
    `0x${redstonePayload}`,
    convertStringToBytes32("CUSD")
  )
  const signer = provider.getSigner()
  const from = await signer.getAddress()
  if (amount < minAmount) throw new Error("amount less than minAmount")
  const allowance = await token.allowance(from, cashOut.address)
  if (amount < allowance) throw new Error("insufficient Allowance")

  //passing the redstone priceFeed data as part of the payload
  const data = cashOut.interface.encodeFunctionData("depositToken", [
    token.address,
    amount,
    `0x${redstonePayload}`,
    convertStringToBytes32("CUSD"),
  ])
  // the fiat payment details
  const params = {
    phoneNumber,
    intocurrency,
    currency,
  }

  const request = await signMetaTxRequest(
    signer.provider,
    forwarder,
    {
      to: addresses.CashOut,
      from,
      data,
    },
    params
  )
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      console.log(res)
      try {
        if (res.status === 200 && res.ok) {
          toast.success("Token Deposited")
          const config = { headers: { "Content-Type": "application/json" } }
          const { data } = await axios.post("/api/cashout", params, config)
          if (data.status === "NEW") toast.info("Fiat transaction Initiated")
        }
      } catch (error) {
        toast.error(error.message)
      }
    })
    .catch((error) => {
      toast.error(error.message)
    })
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
    throw new Error(`Please switch to celo Alfajores for signing`)
  return sendMetaTx(amount, phoneNumber, provider, intocurrency, currency)
}
