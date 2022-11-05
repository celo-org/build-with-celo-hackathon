const db = require('../app/models');

const CollectionCenter = db.collectioncenter;
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

const seedCollectionCenters = [
  {
    title: 'Alimosho Lagos Collection Center',
    address: '24 Alimosho Lagos',
    phone_number: '09028950691',
    company: '636668037c78dc31606824b6',
    location: '63665371e6e5809af0a8e434',
  },
  {
    title: 'Mushin Lagos Collection Center',
    address: '105 Mushin Lagos',
    phone_number: '09028950691',
    company: '636668037c78dc31606824b7',
    location: '63665371e6e5809af0a8e436',
  },
  {
    title: 'Ojo Lagos Collection Center',
    address: '314 Ojo Lagos',
    phone_number: '09028950691',
    company: '636668037c78dc31606824b6',
    location: '63665371e6e5809af0a8e439',
  },
];

const seedDB = async () => {
  await CollectionCenter.deleteMany({});
  await CollectionCenter.insertMany(seedCollectionCenters);
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
