const db = require('../app/models');

const CollectionCenter = db.collectioncenter;
const Company = db.companies;
const Location = db.locations;

const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

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

let seedCollectionCenters = [
  {
    title: 'Alimosho Lagos Collection Center',
    address: '24 Alimosho Lagos',
    phone_number: '09028950691',
  },
  {
    title: 'Mushin Lagos Collection Center',
    address: '105 Mushin Lagos',
    phone_number: '09028950691',
  },
  {
    title: 'Ojo Lagos Collection Center',
    address: '314 Ojo Lagos',
    phone_number: '09028950691',
  },
];

const seedDB = async () => {
  /*
    Select one of 3 random companies & locations, and add to each collector
  */
  const promises = await Promise.all([
    Location.aggregate([{ $sample: { size: 3 } }]),
    Company.aggregate([{ $sample: { size: 3 } }]),
  ]);
  seedCollectionCenters = seedCollectionCenters.map((collectioncenter) => {
    const modified_collectioncenter = collectioncenter;
    modified_collectioncenter.location = getRandom(promises[0])._id;
    modified_collectioncenter.company = getRandom(promises[1])._id;
    return modified_collectioncenter;
  });
  await CollectionCenter.deleteMany({});
  await CollectionCenter.insertMany(seedCollectionCenters);
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
