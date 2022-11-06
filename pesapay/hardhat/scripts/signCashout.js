const { ethers } = require("hardhat")
const { signMetaTxRequest } = require("../src/signer")
const { readFileSync, writeFileSync } = require("fs")
require("dotenv").config()
// const { WrapperBuilder } = require("@redstone-finance/evm-connector")
const sdk = require("redstone-sdk")
const protocol = require("redstone-protocol")
const {
  convertStringToBytes32,
} = require("redstone-protocol/dist/src/common/utils")

function getInstance(name) {
  const address = JSON.parse(readFileSync("deployCashout.json"))[name]
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`)
  return ethers.getContractFactory(name).then((f) => f.attach(address))
}

async function main() {
  const forwarder = await getInstance("MinimalForwarder")
  const mainContract = await getInstance("CashOut")
  const token = await getInstance("Token")
  const { PRIVATE_KEY: signer } = process.env
  const from = new ethers.Wallet(signer).address
  const amount = ethers.utils.parseEther("100")
  await token.mint(from, amount)
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
  const approved = await token.approve(mainContract.address, amount)
  if (!approved) throw new Error(`Insufficient Allowance`)
  const allowance = await token.allowance(from, mainContract.address)
  if (amount < allowance) throw new Error(`Insufficient Allowance`)
  const minAmount = await mainContract.lowestCashoutAmount(
    `0x${redstonePayload}`,
    convertStringToBytes32("CUSD")
  )
  console.log(minAmount)

  const data = mainContract.interface.encodeFunctionData("depositToken", [
    token.address,
    amount,
    `0x${redstonePayload}`,
    convertStringToBytes32("CUSD"),
  ])
  const params = {
    account_bank: "MPS", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
    account_number: "256779177900",
    amount: 30000,
    currency: "UGX",
    reference: "transfer-" + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
    debit_currency: "UGX",
    beneficiary_name: "cashout",
    callback_url: "https://webhook.site/865479d1-cf68-48b0-b26f-b0d33c0936b4",
  }

  const result = await signMetaTxRequest(
    signer,
    forwarder,
    {
      to: mainContract.address,
      from,
      data,
    },
    params
  )
  writeFileSync("tmp/requestCashout.json", JSON.stringify(result, null, 2))
  console.log(`Signature: `, result.signature)
  console.log(`Request: `, result.request)
  console.log(`params:`, result.params)
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
