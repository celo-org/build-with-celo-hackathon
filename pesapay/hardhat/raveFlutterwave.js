const Ravepay = require("flutterwave-node")

require("dotenv").config()

const { FLW_PUBLIC_KEY: publicKey, FLW_SECRET_KEY: secretKey } = process.env

const flw = new Ravepay(publicKey, secretKey, true)

const initTrans = async () => {
  try {
    const payload = {
      currency: "UGX",
      payment_type: "mobilemoneyuganda",
      country: "UG",
      amount: "500000",
      email: "eliasheezron23@gmail.com",
      phonenumber: "256779177900",
      network: "UGX",
      firstname: "temi",
      lastname: "desola",
      IP: "355426087298442",
      txRef: "MC-" + Date.now(),
      orderRef: "MC_" + Date.now(),
      is_mobile_money_ug: 1,
      redirect_url: "https://rave-webhook.herokuapp.com/receivepayment",
      device_fingerprint: "69e6b7f0b72037aa8428b70fbe03986c",
    }

    const data = await flw.MobileMoney.uganda(payload)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

initTrans()
// amount, currency, account_bank, and account_number =>>>> are must have
