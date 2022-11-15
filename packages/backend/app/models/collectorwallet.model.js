module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      balance: {
        type: Number,
        default: 0,
      },
      wallet_address: {
        type: String,
        required: true,
      },
      collector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collector',
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

  const CollectorWallet = mongoose.model('collectorwallet', schema);
  return CollectorWallet;
};
