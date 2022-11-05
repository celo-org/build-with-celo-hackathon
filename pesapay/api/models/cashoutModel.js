const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const cashoutSchema = new Schema({
  fiatType: {
    required: true,
    type: String,
    enum: [`NGN`, `GHS`, `KES`, `UGX`],
  },
  cryptoType: {
    required: true,
    type: String,
    enum: [`cUSD`],
  },
  cryptoAmount: {
    required: true,
    type: String,
  },
  phoneNumber: {
    required: true,
    type: String,
  },
  country: {
    require: true,
    type: String,
    enum: [`NG`, `GH`, "KE", `UG`],
  },
})
module.exports = mongoose.model(`cashout`, cashoutSchema)
