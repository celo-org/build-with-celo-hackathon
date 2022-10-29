const mongoose = require("mongoose");

const { Schema } = mongoose;

const vcFirmSchema = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  contact: {
    phone_no: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      street: { type: String, required: false },
      zip_code: { type: String, required: false },
      city: { type: String, required: false },
    },
  },
  wallet: {
    public_wallet_address: { type: String, required: true },
    private_key: { type: String, required: true },
  },
  password: { type: String, required: true },
  roles: [{ type: String, required: true }],
  refreshToken: { type: String, required: false, default: null },
});

module.exports = mongoose.model("VcFirmSchema", vcFirmSchema);
