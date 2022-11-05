const { RelayClient } = require("defender-relay-client")
const { appendFileSync, writeFileSync } = require("fs")

async function run() {
  require("dotenv").config()
  const { DEFENDER_TEAM_API: apiKey, DEFENDER_TEAM_SECRET: apiSecret } =
    process.env
  const relayClient = new RelayClient({ apiKey, apiSecret })

  // create relay using defender client
  const requestParams = {
    name: "cashoutTxRelayer",
    network: "alfajores",
    minBalance: BigInt(1e17).toString(),
  }
  const relayer = await relayClient.create(requestParams)

  // store relayer info in file - ID is all you need if sending tx via autotask
  writeFileSync(
    "relay.json",
    JSON.stringify(
      {
        relayer,
      },
      null,
      2
    )
  )
  console.log("Relayer ID: ", relayer.relayerId)

  // create and save the api key to .env - needed for sending tx directly
  const { apiKey: relayerKey, secretKey: relayerSecret } =
    await relayClient.createKey(relayer.relayerId)
  appendFileSync(
    ".env",
    `\nCELO_RELAYER_API_KEY=${relayerKey}\nCELO_RELAYER_API_SECRET=${relayerSecret}`
  )
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
