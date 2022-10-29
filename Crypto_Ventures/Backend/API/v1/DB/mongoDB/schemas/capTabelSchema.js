const mongoose = require("mongoose");

const { Schema } = mongoose;

const capTableSchema = new Schema({
  uid: { type: String, required: true },
  name_of_fund: { type: String, required: true },
  fund_uid: { type: String, required: true },
  amount_raised: { type: String, required: true },
  share_holders: [
    {
      uid: { type: String, required: true },
      public_wallet_address: { type: String, required: true },
      share: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("CapTableSchema", capTableSchema);
