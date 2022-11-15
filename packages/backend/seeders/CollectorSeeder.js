const db = require('../app/models');

const Collector = db.collectors;
const Location = db.locations;
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

let seedCollectors = [
  {
    name: 'Collector Praise',
    email: 'praise@collector.com',
    phone: '09028950691',
    verified_at: '2022-10-12',
    wallet_address: '1234567890abc',
  },
  {
    name: 'Collector Paul',
    email: 'paul@collector.com',
    phone: '08177002133',
    verified_at: '2022-10-12',
    wallet_address: 'abc0987654321',
  },
];

const seedDB = async () => {
  /*
    Add location to each collector
    source on aggregate - https://www.kindacode.com/snippet/mongodb-get-a-random-document-from-a-collection/
  */
  const randomlocation = await Location.aggregate([{ $sample: { size: 1 } }]);
  seedCollectors = seedCollectors.map((collector) => {
    const modified_collector = collector;
    modified_collector.location = randomlocation[0]._id;
    return modified_collector;
  });
  await Collector.deleteMany({});
  await Collector.insertMany(seedCollectors);
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
