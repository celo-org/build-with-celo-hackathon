const Cashout = require("../models/cashoutModel")
const Flutterwave = require("flutterwave-node-v3")
require("dotenv").config()
const { FLW_PUBLIC_KEY: publicKey, FLW_SECRET_KEY: secretKey } = process.env
const flw = new Flutterwave(publicKey, secretKey)

const cashoutCreated = async (req, res) => {
  try {
    const params = new Cashout({
      account_bank: "MPS",
      account_number: req.body.phoneNumber,
      amount: req.body.intocurrency,
      currency: req.body.currency,
      reference: "transfer-" + Date.now(),
      debit_currency: "UGX",
      beneficiary_name: "cashout",
      callback_url: "https://webhook.site/865479d1-cf68-48b0-b26f-b0d33c0936b4",
    })
    const reqParams = await params.save()
    const { data } = await flw.Transfer.initiate(reqParams)
    res.status(200).json(data)
  } catch (error) {
    res.json(error.message)
  }
}
const getTransactions = async (req, res) => {
  try {
    const posts = await Cashout.find()
    res.status(200).json(posts)
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = { cashoutCreated, getTransactions }
