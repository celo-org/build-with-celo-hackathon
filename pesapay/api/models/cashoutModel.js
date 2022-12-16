const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const cashoutSchema = new Schema(
  {
    account_bank: {
      required: true,
      type: String,
      enum: [`MPS`],
    },
    account_number: {
      required: true,
      type: Number,
    },
    amount: {
      required: true,
      type: Number,
    },
    currency: {
      required: true,
      type: String,
    },
    reference: {
      required: true,
      type: String,
    },
    debit_currency: {
      required: true,
      type: String,
      enum: [`UGX`],
    },
    beneficiary_name: {
      required: true,
      type: String,
      enum: [`cashout`],
    },
    callback_url: {
      require: true,
      type: String,
      enum: [`https://webhook.site/865479d1-cf68-48b0-b26f-b0d33c0936b4`],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model(`Cashout`, cashoutSchema)
