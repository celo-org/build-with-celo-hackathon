import { signMetaTxRequest } from "./signer"
import { ethers } from "ethers"
import createInstance from "../hooks/useContract"
import addresses from "../contracts/addresses.json"
import minimalForwarderAbi from "../contracts/minimalForwarder.json"
import cashOutAbi from "../contracts/cashOut.json"
import tokenAbi from "../contracts/token.json"
import { toast } from "react-toastify"
import axios from "axios"
// importing the necessary redstone modules
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
  tx.wait(2)
  return tx
}

// this is where the magic happens
// it allows for signing transactions by the EIP 712 standard and forwarding the transaction as per the EIP 2771
async function sendMetaTx(
  amount,
  phoneNumber,
  provider,
  intocurrency,
  currency
) {
  //webhook to transmit the signed request to openZepplin defender autotask which then calls and executes the smart contract functions  const CELO_CASHOUT_WEBHOOK_URL =
  const CELO_CASHOUT_WEBHOOK_URL =
    "https://api.defender.openzeppelin.com/autotasks/d577e57d-844f-4015-8f24-0fe85882b0a9/runs/webhook/e43ccace-89ee-47fe-ba09-47f0b0e551bc/U4w1pfp45eZ6iXNah9mSY3"
  const url = CELO_CASHOUT_WEBHOOK_URL

  //redstone oracle implemtation
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
  // getting contract instances
  const cashOut = createInstance(addresses.CashOut, cashOutAbi, provider)
  const token = createInstance(addresses.Token, tokenAbi, provider)
  const forwarder = createInstance(
    addresses.MinimalForwarder,
    minimalForwarderAbi,
    provider
  )

  //smart contract function to query and make sure the user deposits an amount higher than the minimum balance
  const minAmount = await cashOut.lowestCashoutAmount(
    `0x${redstonePayload}`,
    convertStringToBytes32("CUSD")
  )
  const signer = provider.getSigner()
  const from = await signer.getAddress()
  if (amount < minAmount) throw new Error(" amount less than minAmount")
  const allowance = await token.allowance(from, cashOut.address)
  if (amount < allowance) throw new Error(`Insufficient Allowance`)
  // we pass redstone's data points as part of the payload
  const data = cashOut.interface.encodeFunctionData("depositToken", [
    token.address,
    amount,
    `0x${redstonePayload}`,
    convertStringToBytes32("CUSD"),
  ])

  // passing in the fiat payment details aswell
  const params = {
    phoneNumber,
    intocurrency,
    currency,
  }

  //this is the wallet popup that asks users to sign the message
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
  // post the signed data to defender
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      try {
        toast.success("Transaction Successfull")
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(
          "/api/cashout",
          request.params,
          config
        )
        if (data.status === "NEW") toast.info("Fiat Transaction Initiated")
        // beyond this point, we wait for the webhook and notify the user that the transaction was successfull
      } catch (error) {
        console.log(error)
      }
    })
    .catch((error) => {
      toast.info(error)
      console.log(error)
    })
}

// call this function from the frontend passing in the values
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
    throw new Error(`Please switch to celo Alfajore chain for signing`)

  return sendMetaTx(amount, phoneNumber, provider, intocurrency, currency)
}
