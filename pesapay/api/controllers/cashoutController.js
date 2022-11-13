const Cashout = require("../models/cashoutModel")
const asynchandler = require("express-async-handler")
const Flutterwave = require("flutterwave-node-v3")
require("dotenv").config()
const { FLW_PUBLIC_KEY: publicKey, FLW_SECRET_KEY: secretKey } = process.env
const flw = new Flutterwave(publicKey, secretKey)
const cashoutCreated = asynchandler(async (req, res) => {
  const params = new Cashout({
    account_bank: "MPS", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
    account_number: req.body.phoneNumber, //256779177900
    amount: req.body.intocurrency, // input the converted amount here
    currency: req.body.currency, // depends on the country currency
    reference: "transfer-" + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
    debit_currency: "UGX",
    beneficiary_name: "cashout",
    callback_url: "https://webhook.site/865479d1-cf68-48b0-b26f-b0d33c0936b4",
  })
  await params.save()
  const { data } = await flw.Transfer.initiate(request.params)
  res.status(200).json(data)
})

module.exports = cashoutCreated
