const ethers = require("ethers")
const Flutterwave = require("flutterwave-node-v3")
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers")

const { ForwarderAbi } = require("../../src/forwarder")
const ForwarderAddress = require("../../deployCashout.json").MinimalForwarder
const { FLW_PUBLIC_KEY: publicKey, FLW_SECRET_KEY: secretKey } = process.env
const flw = new Flutterwave(publicKey, secretKey)

async function relay(forwarder, request, signature, params, whitelist) {
  // Decide if we want to relay this request based on a whitelist
  const accepts = !whitelist || whitelist.includes(request.to)
  if (!accepts) throw new Error(`Rejected request to ${request.to}`)

  // Validate request on the forwarder contract
  const valid = await forwarder.verify(request, signature)
  if (!valid) throw new Error(`Invalid request`)

  // Send meta-tx through relayer to the forwarder contract
  const gasLimit = (parseInt(request.gas) + 50000).toString()
  const tx = await forwarder.execute(request, signature, { gasLimit })
  const reciept = await tx.wait(10)
  // include logic to query the cashout contract matching the exact transaction has for events emited or for the ERC20 transfers.
  try {
    const { data } = await flw.Transfer.initiate(params)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  console.log(reciept)
  return reciept
}

async function handler(event) {
  // Parse webhook payload
  if (!event.request || !event.request.body) throw new Error(`Missing payload`)
  const { request, signature, params } = event.request.body
  console.log(`Relaying`, request, signature)

  // Initialize Relayer provider and signer, and forwarder contract
  const credentials = { ...event }
  const provider = new DefenderRelayProvider(credentials)
  const signer = new DefenderRelaySigner(credentials, provider, {
    speed: "fast",
  })
  const forwarder = new ethers.Contract(ForwarderAddress, ForwarderAbi, signer)

  // Relay transaction!
  const tx = await relay(forwarder, request, signature, params)
  console.log(`Sent meta-tx: ${tx.confirmations}`)
  return { txHash: tx.confirmations }
}

module.exports = {
  handler,
  relay,
}
