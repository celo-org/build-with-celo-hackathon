const db = require('../app/models');

const Category = db.categories;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const seedCategories = [
  {
    name: 'Plastics',
    icon: 'loremipsum',
  },
  {
    name: 'Metal',
    icon: 'loremipsum',
  },
  {
    name: 'Rubber',
    icon: 'loremipsum',
  },
];

let seedSubCategories = [
  {
    name: 'PET',
    icon: 'loremipsum',
  },
  {
    name: 'HDPE',
    icon: 'loremipsum',
  },
  {
    name: 'PVC',
    icon: 'loremipsum',
  },
  {
    name: 'LDPE',
    icon: 'loremipsum',
  },
  {
    name: 'PP',
    icon: 'loremipsum',
  },
  {
    name: 'PS',
    icon: 'loremipsum',
  },
  {
    name: 'ABS',
    icon: 'loremipsum',
  },
  {
    name: 'NYLON',
    icon: 'loremipsum',
  },
];

const seedDB = async () => {
  await Category.deleteMany({});
  await Category.insertMany(seedCategories);

  const plastic = await Category.findOne({ name: 'Plastics' });
  console.log(plastic);
  if (plastic) {
    seedSubCategories = seedSubCategories.map((subcat) => {
      const modified_subcat = subcat;
      modified_subcat.parent = plastic._id;
      return modified_subcat;
    });
    console.log(seedSubCategories);
    await Category.insertMany(seedSubCategories);
  }
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
