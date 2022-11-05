



const db = require("../app/models");
const Category = db.categories
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
    }

  ];
  
  const seedDB = async () => {
    await Category.deleteMany({});
    await Category.insertMany(seedCategories);
  }
  
  seedDB().then(()=>{
    db.mongoose.connection.close();
  })