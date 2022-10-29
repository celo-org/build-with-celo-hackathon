const mongoose = require("mongoose");

const { Schema } = mongoose;

const investorSchema = new Schema({
  uid: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  wallet_addresses: { type: [String], required: false, default: [] },
  roles: [{ type: String, required: true }],
  refreshToken: { type: String, required: false, default: null },
});

module.exports = mongoose.model("Investor", investorSchema);
