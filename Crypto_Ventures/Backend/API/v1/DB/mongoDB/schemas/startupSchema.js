const mongoose = require("mongoose");

const { Schema } = mongoose;

const startupSchema = new Schema({
  uid: { type: String, required: true },
  username: { type: String, required: true },
  headquarters: { type: String, required: true },
  contact: {
    email: { type: String, required: true },
    phone_no: { type: String, required: true },
    address: { type: String, required: true },
  },
  founders: [{ type: String, required: false, default: [] }],
  documents: {
    certificate_of_incorporation: { type: String, required: false },
    business_plan: { type: String, required: false },
    elevator_pitch: { type: String, required: false },
    pitch_deck: { type: String, required: false },
    financial: {
      income_statement: { type: String, required: false },
      balance_sheet: { type: String, required: false },
    },
    team: {
      resumes: [{ type: String, required: false }],
    },
    product: { type: String, required: false },
  },
  wallet: {
    public_wallet_address: { type: String, required: true },
    private_key: { type: Object, required: true },
  },
  password: { type: String, required: true },
  roles: [{ type: String, required: true }],
  created_at: { type: Date, default: new Date(Date.now()) },
  refreshToken: { type: String, required: false, default: null },
});

module.exports = mongoose.model("Startup", startupSchema);
