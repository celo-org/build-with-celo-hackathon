const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
const companyRoutes = require('./app/routes/company.routes');
const requestRoutes = require('./app/routes/request.routes');

app.use('/api/company', companyRoutes);
app.use('/api/request', requestRoutes);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

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

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Gidiscrap." });
// });

// require("./app/routes/index")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
