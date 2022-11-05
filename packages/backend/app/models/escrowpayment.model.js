module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      amount: {
        type: Number,
        required: true,
      },
      amount_processed: {
        type: Number,
        // only calculated after request is completed
      },
      amount_returned: {
        type: Number,
        // only calculated after request is complete
      },
      fee: {
        type: Number,
        // should it be percentage or total amount
      },
      blockchain_trx: {
        type: String,
        required: true,
      },
      request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true,
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
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

  const EscrowPayment = mongoose.model('escrowpayment', schema);
  return EscrowPayment;
};
