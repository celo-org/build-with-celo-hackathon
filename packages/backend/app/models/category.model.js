module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please provide a name for this category.'],
        maxlength: [20, 'Name cannot be more than 60 characters'],
      },
      icon: {
        type: String,
      },
      children: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
      },
      parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Category = mongoose.model('category', schema);
  return Category;
};
