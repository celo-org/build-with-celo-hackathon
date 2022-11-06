const { writeFileSync, readFileSync, existsSync, mkdirSync } = require("fs")

function main() {
  const contractsDir = __dirname + "/../api/contracts"
  if (!existsSync(contractsDir)) {
    mkdirSync(contractsDir)
  }
  const addresses = JSON.parse(readFileSync("deployCashout.json"))
  writeFileSync(
    contractsDir + "/contractAddresses.json",
    JSON.stringify(addresses, undefined, 2)
  )
  const minimalForwarderArtifact =
    artifacts.readArtifactSync("MinimalForwarder").abi
  const cashOutArtifact = artifacts.readArtifactSync("CashOut").abi
  const tokenArtifact = artifacts.readArtifactSync("Token").abi
  writeFileSync(
    contractsDir + "/minimalForwarder.json",
    JSON.stringify(minimalForwarderArtifact, null, 2)
  )
  writeFileSync(
    contractsDir + "/cashOut.json",
    JSON.stringify(cashOutArtifact, null, 2)
  )
  writeFileSync(
    contractsDir + "/token.json",
    JSON.stringify(tokenArtifact, null, 2)
  )
}

main()
