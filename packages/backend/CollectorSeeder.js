



const db = require("./app/models");
const Collector = db.collectors
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const seedCollectors = [
    {
      name: 'Alimosho',
      state: 'Lagos',
      // country: '123123',
    },
    {
      name: 'Ajeromi-Ifelodun',
      state: 'Lagos',
      // country: '123123',
    },
    {
      name: 'Mushin',
      state: 'Lagos',
      // country: '123123',
    },
    {
      name: 'Ajeromi-Ifelodun',
      state: 'Lagos',
      // country: '123123',
    },
    {
      name: 'Oshodi-Isolo',
      state: 'Lagos',
      // country: '123123',
    },
    {
      name: 'Ojo',
      state: 'Lagos',
      // country: '123123',
    }
  
  ];
  
  const seedDB = async () => {
    await Collector.deleteMany({});
    await Collector.insertMany(seedCollectors);
  }
  
  seedDB().then(()=>{
    db.mongoose.connection.close();
  })