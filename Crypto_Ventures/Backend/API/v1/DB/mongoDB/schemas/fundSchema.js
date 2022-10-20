const mongoose = require("mongoose");

const { Schema } = mongoose;

const fundSchema = new Schema({
  uid: { type: String, required: true },
  fundOwner: {
    uid: { type: String, required: true },
    public_wallet_address: { type: String, required: true },
  },
  size: { type: String, required: true },
  created_at: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
  funders: [
    {
      public_wallet_address: { type: String, required: false },
      uid: { type: String },
      share: { type: Number },
    },
  ],
  closing_date: { type: String, required: true },
  amount_contributed: { type: Number, required: true, default: 0 },
  amount_remaining: { type: Number, required: false, default: size },
  status: { type: String, required: false, default: "active" },
});

module.exports = mongoose.model("FundSchema", fundSchema);
