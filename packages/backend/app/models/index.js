const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.companies = require("./company.model.js")(mongoose);
db.collectors = require("./collector.model.js")(mongoose);
db.collectorwallets = require("./collectorwallet.model.js")(mongoose);
db.deliveries = require("./delivery.model.js")(mongoose);
db.escrowpayments = require("./escrowpayment.model.js")(mongoose);
db.locations = require("./location.model.js")(mongoose);
db.requests = require("./request.model.js")(mongoose);

module.exports = db;
