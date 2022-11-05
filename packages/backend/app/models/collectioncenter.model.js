module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone_number: {
        type: Number,
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
      },
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

  const CollectionCenter = mongoose.model('collectioncenter', schema);
  return CollectionCenter;
};
