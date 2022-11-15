const { isEmail } = require('validator');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Collector name is required.'],
      },
      email: {
        type: String,
        required: [true, 'Email Address is required for collector.'],
        validate: [isEmail, 'Invalid email'],
        unique: true,
      },
      phone: String,
      verified_at: Date,
      wallet_address: String,
      location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
      },
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Collector = mongoose.model('collector', schema);
  return Collector;
};
