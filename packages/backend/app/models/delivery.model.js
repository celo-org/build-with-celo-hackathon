const FEE = 2.5;

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      delivery_size: {
        type: Number,
        required: true,
      },
      delivery_fees: {
        type: Number,
        // only collected after delivery status is completed
      },
      delivery_proof: {
        // IPFS URL - uploaded file that indicates
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
      delivery_time: {
        type: Date,
        required: true,
      },
      delivery_status: {
        // i don't know what to do with this...
        // should it be an enum?
      },
      collector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collector',
        required: true,
      },
      request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
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

  const Delivery = mongoose.model('delivery', schema);
  return Delivery;
};
