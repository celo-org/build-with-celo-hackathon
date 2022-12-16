const fetch = require("node-fetch")
const Flutterwave = require("flutterwave-node-v3")
require("dotenv").config()
const { FLW_PUBLIC_KEY: publicKey, FLW_SECRET_KEY: secretKey } = process.env

const flw = new Flutterwave(publicKey, secretKey)
async function testWebHook(request) {
  const { CELO_CASHOUT_WEBHOOK_URL: url } = process.env
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      try {
        const { data } = await flw.Transfer.initiate(request.params)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    })
    .catch((error) => console.log(error))
    .finally(() => console.log("done"))
}

module.exports = {
  testWebHook,
}
