const { testWebHook } = require("../testWebHook")

// Run autotask code locally using the Relayer API key and secret
if (require.main === module) {
  require("dotenv").config()
  const payload = require("fs").readFileSync("tmp/requestCashout.json")
  const request = JSON.parse(payload)
  testWebHook(request)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
