import { signMetaTxRequest } from "./signer"
import { ethers } from "ethers"
import createInstance from "../hooks/useContract"
import addresses from "../contracts/addresses.json"
import minimalForwarderAbi from "../contracts/minimalForwarder.json"
import cashOutAbi from "../contracts/cashOut.json"
import tokenAbi from "../contracts/token.json"
const sdk = require("redstone-sdk")
const protocol = require("redstone-protocol")
const {
  convertStringToBytes32,
} = require("redstone-protocol/dist/src/common/utils")

export async function approve(amount, provider) {
  const token = createInstance(addresses.Token, tokenAbi, provider)
  const tx = await token.approve(addresses.CashOut, amount)
  return tx
}
export async function getBalance(provider, address) {
  const token = createInstance(
    "0x91A794303F6A1D18Ae03ec689983568D76121E00",
    tokenAbi,
    provider
  )
  const tx = await token.balanceOf(address)
  return tx
}

async function sendMetaTx(amount, phoneNumber, signer, provider) {
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
  console.log(minAmount)
  if (amount < minAmount) throw new Error(" amount less than minAmount")
  const allowance = await token.allowance(from, cashOut.address)
  if (amount < allowance) throw new Error(`Insufficient Allowance`)
  const data = cashOut.interface.encodeFunctionData("depositToken", [
    token,
    amount,
    `0x${redstonePayload}`,
    convertStringToBytes32("CUSD"),
  ])
  const params = {
    account_bank: "MPS", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
    account_number: phoneNumber,
    amount: 30000, // input the converted amount here
    currency: "UGX", // depends on the country currency
    reference: "transfer-" + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
    debit_currency: "UGX",
    beneficiary_name: "cashout",
    callback_url: "https://webhook.site/865479d1-cf68-48b0-b26f-b0d33c0936b4",
  }

  const from = await signer.getAddress()
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
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  })
}
export async function depositToken(amount, phoneNumber, provider) {
  if (!amount) throw new Error(`amount cannot be empty`)
  if (!phoneNumber) throw new Error(`phoneNumber cannot be empty`)
  if (!window.ethereum) throw new Error(`User wallet not found`)
  const tokenAddress = addresses.Token
  await window.ethereum.enable()
  const userProvider = new ethers.providers.Web3Provider(window.ethereum)
  const userNetwork = await userProvider.getNetwork()
  // this is where prompt the chain
  if (userNetwork.chainId !== 100)
    throw new Error(`Please switch to chain for signing`)

  const signer = userProvider.getSigner()
  return sendMetaTx(amount, phoneNumber, signer, provider)
}
