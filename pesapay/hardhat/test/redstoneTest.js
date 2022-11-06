const sdk = require("redstone-sdk")
const protocol = require("redstone-protocol")
const {
  convertStringToBytes32,
} = require("redstone-protocol/dist/src/common/utils")

describe("ManualPayloadExample", function () {
  let contract

  beforeEach(async () => {
    // Deploy contract
    const ManualPayloadExample = await ethers.getContractFactory(
      "ManualPayloadExample"
    )
    contract = await ManualPayloadExample.deploy()
  })

  it("Get STX price securely using manually built redstone payload", async function () {
    const signedDataPackagesResponse = await sdk.requestDataPackages(
      {
        dataServiceId: "redstone-main-demo",
        uniqueSignersCount: 1,
        dataFeeds: ["STX"],
      },
      ["https://d33trozg86ya9x.cloudfront.net"]
    )

    const unsignedMetadata = "manual-payload"
    const redstonePayload = protocol.RedstonePayload.prepare(
      signedDataPackagesResponse.STX,
      unsignedMetadata
    )

    // Interact with the contract (getting oracle value securely)
    const stxPrice = await contract.getLatestPrice(
      `0x${redstonePayload}`,
      convertStringToBytes32("STX")
    )
    console.log(convertStringToBytes32("STX"))
    console.log({ stxPrice: stxPrice.toNumber() / 10 ** 8 })
  })
})
