const Flutterwave = require("flutterwave-node-v3")

require("dotenv").config()

const { FLW_PUBLIC_KEY: publicKey, FLW_SECRET_KEY: secretKey } = process.env

const flw = new Flutterwave(publicKey, secretKey)

const initTrans = async () => {
  try {
    const payload = {
      account_bank: "MPS", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
      account_number: "256779177900",
      meta: [
        {
          phone_number: "256779177900",
        },
      ],
      amount: 50000,
      currency: "UGX",
      reference: "transfer-" + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
      debit_currency: "UGX",
      beneficiary_name: "cashout",
      callback_url: "https://webhook.site/865479d1-cf68-48b0-b26f-b0d33c0936b4",
    }

    const { data } = await flw.Transfer.initiate(payload)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

initTrans()
// amount, currency, account_bank, and account_number =>>>> are must have
