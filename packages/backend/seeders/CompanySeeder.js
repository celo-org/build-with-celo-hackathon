const db = require('../app/models');

const Company = db.companies;
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

const seedCompanies = [
  {
    name: 'OladimejiInc',
    contact_person: 'Oladimeji Paul',
    contact_email: 'test@gmail.com',
    contact_phone: '09028950691',
    wallet_address: '1234567890abc',
    verified_at: '2022-10-12',
  },
  {
    name: 'PraiseInc',
    contact_person: 'Udeh Praise',
    contact_email: 'test2@gmail.com',
    contact_phone: '09028950691',
    wallet_address: '0987654321abc',
    wallet_provider: 'trustwallet',
    verified_at: '2022-10-12',
  },
];

const seedDB = async () => {
  await Company.deleteMany({});
  await Company.insertMany(seedCompanies);
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
