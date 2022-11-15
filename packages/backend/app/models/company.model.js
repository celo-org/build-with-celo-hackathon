const { isEmail } = require('validator');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Company name is required.'],
      },
      contact_person: String,
      contact_email: String,
      contact_phone: String,
      wallet_address: {
        type: String,
        required: [true, 'Wallet Address is required for collector'],
      },
      wallet_provider: {
        type: String,
        enum: ['metamask', 'trustwallet'],
        default: 'metamask',
        required: [true, 'Wallet Provider is required for collector'],
      },
      verified_at: Date,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Company = mongoose.model('company', schema);
  return Company;
};
