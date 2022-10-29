const { handler } = require("../autotasks/relay/register")

// Run autotask code locally using the Relayer API key and secret
if (require.main === module) {
  require("dotenv").config()
  const { RELAYER_API_KEY: apiKey, RELAYER_API_SECRET: apiSecret } = process.env
  const payload = require("fs").readFileSync("tmp/requestRegistry2.json")
  handler({ apiKey, apiSecret, request: { body: JSON.parse(payload) } })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
