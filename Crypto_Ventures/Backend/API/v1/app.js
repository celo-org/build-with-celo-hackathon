require("dotenv").config({ path: __dirname + "/.env" });
const cluster = require("node:cluster");
const http = require("node:http");
const { cpus } = require("node:os");
const process = require("node:process");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3050;
const cors = require("cors");
const mongoose = require("mongoose");
const connectMongoDB = require("./DB/mongoDB/connectMongoDB");

const investorRoute = require("./routes/investorRoute");

const app = express();
const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  connectMongoDB(mongoose, process.env.DATABASE_URL);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.use(cookieParser());

  app.use("/investor", investorRoute);

  //db
  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
  });

  app.listen(port, () => {
    console.log("Listening on port ", port);
  });
  console.log(`Worker ${process.pid} started`);
}
