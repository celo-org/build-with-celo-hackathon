const { ethers } = require("hardhat")
const { signMetaTxRequest } = require("../src/signer")
const { writeFileSync } = require("fs")
// require("dotenv").config()
const {
  DefenderRelayProvider,
  DefenderRelaySigner,
} = require("defender-relay-client/lib/ethers")
require("dotenv").config()

const DEFAULT_NAME = "sign-test"

// function getInstance(name) {
//   const address = JSON.parse(readFileSync('deploy.json'))[name];
//   if (!address) throw new Error(`Contract ${name} not found in deploy.json`);
//   return ethers.getContractFactory(name).then(f => f.attach(address));
// }

async function main() {
  const credentials = {
    apiKey: process.env.RELAYER_API_KEY,
    apiSecret: process.env.RELAYER_API_SECRET,
  }
  const provider = new DefenderRelayProvider(credentials)
  const relaySigner = new DefenderRelaySigner(credentials, provider, {
    speed: "fast",
  })
  const TTx = await ethers.getContractFactory("Token")
  const Tx = await TTx.deploy("USD", "cUSD").then((x) => x.deployed())
  const Forwarder = await ethers.getContractFactory(
    "MinimalForwarderUpgradeable"
  )
  const forwarder = await Forwarder.connect(relaySigner)
    .deploy()
    .then((f) => f.deployed())
  const MainContract = await ethers.getContractFactory("Vault")
  const mainContract = await upgrades.deployProxy(
    MainContract.connect(relaySigner),
    [forwarder.address],
    { initializer: "initialize" },
    { kind: "uups" }
  )
  console.log(
    "main contract",
    mainContract.address,
    "forwarder contract",
    forwarder.address
  )
  writeFileSync(
    "deploy.json",
    JSON.stringify(
      {
        MinimalForwarder: forwarder.address,
        Vault: mainContract.address,
      },
      null,
      2
    )
  )
  const { PRIVATE_KEY: signer } = process.env
  const from = new ethers.Wallet(signer).address
  const depositAmount = ethers.utils.parseEther("0.8")
  const data = mainContract.interface.encodeFunctionData("depositToken", [
    Tx.address,
    depositAmount,
  ])
  const result = await signMetaTxRequest(signer, forwarder, {
    to: mainContract.address,
    from,
    data,
  })

  writeFileSync("tmp/request.json", JSON.stringify(result, null, 2))
  console.log(`Signature: `, result.signature)
  console.log(`Request: `, result.request)
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
