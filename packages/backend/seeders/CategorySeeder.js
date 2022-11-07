/* eslint-disable no-await-in-loop */
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
    icon: '/images/plastics.svg',
  },
  {
    name: 'Metal',
    icon: '/images/steel-square.svg',
  },
  {
    name: 'Rubber',
    icon: '/images/tyre.svg',
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
  /* delete everything, including categories and subcategories */
  await Category.deleteMany({});
  /* add the parent categories */
  await Category.insertMany(seedCategories);

  const plastic = await Category.findOne({ name: 'Plastics' });
  if (plastic) {
    seedSubCategories = seedSubCategories.map((subcat) => {
      const modified_subcat = subcat;
      modified_subcat.parent = plastic._id;
      return modified_subcat;
    });
    /* for each subcategory */
    for (let i = 0; i < seedSubCategories.length; i++) {
      /* first create the subcategory */
      const createdsubcat = await Category.create(seedSubCategories[i]);
      /* then add the id of the subcat to the children of the parent subcategory */
      await Category.updateOne(
        { _id: createdsubcat.parent },
        { $push: { children: createdsubcat._id } }
      );
    }
  }
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
