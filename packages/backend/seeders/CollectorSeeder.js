const db = require('../app/models');

const Collector = db.collectors;
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

const seedCollectors = [
  {
    name: 'Collector Praise',
    email: 'praise@collector.com',
    phone: '09028950691',
    verified_at: '2022-10-12',
    wallet_address: '1234567890abc',
    location: '63665371e6e5809af0a8e434',
  },
  {
    name: 'Collector Paul',
    email: 'paul@collector.com',
    phone: '08177002133',
    verified_at: '2022-10-12',
    wallet_address: 'abc0987654321',
    location: '63665371e6e5809af0a8e436',
  },
];

const seedDB = async () => {
  await Collector.deleteMany({});
  await Collector.insertMany(seedCollectors);
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
