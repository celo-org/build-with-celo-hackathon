const { ethers } = require("hardhat")
const { writeFileSync } = require("fs")
const {
  DefenderRelayProvider,
  DefenderRelaySigner,
} = require("defender-relay-client/lib/ethers")
require("dotenv").config()
const credentials = {
  apiKey: process.env.RELAYER_API_KEY,
  apiSecret: process.env.RELAYER_API_SECRET,
}
const provider = new DefenderRelayProvider(credentials)
const relaySigner = new DefenderRelaySigner(credentials, provider, {
  speed: "fast",
})

async function main() {
  const Token = await ethers.getContractFactory("Token")
  const token = await Token.deploy("celo Dollar", "cUSD").then((f) =>
    f.deployed()
  )
  const Forwarder = await ethers.getContractFactory("MinimalForwarder")
  const forwarder = await Forwarder.connect(relaySigner)
    .deploy()
    .then((f) => f.deployed())

  const CashOut = await ethers.getContractFactory("CashOut")
  const cashout = await CashOut.connect(relaySigner)
    .deploy(forwarder.address)
    .then((f) => f.deployed())
  await cashout.addAllowedToken(token.address)
  writeFileSync(
    "deployCashout.json",
    JSON.stringify(
      {
        MinimalForwarder: forwarder.address,
        CashOut: cashout.address,
        Token: token.address,
      },
      null,
      2
    )
  )

  console.log(
    `MinimalForwarder: ${forwarder.address}\nCashout: ${cashout.address}\nToken:${token.address} `
  )
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
