const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require('./tutorial.model')(mongoose);
db.companies = require('./company.model')(mongoose);
db.collectors = require('./collector.model')(mongoose);
db.collectorwallets = require('./collectorwallet.model')(mongoose);
db.deliveries = require('./delivery.model')(mongoose);
db.escrowpayments = require('./escrowpayment.model')(mongoose);
db.locations = require('./location.model')(mongoose);
db.requests = require('./request.model')(mongoose);
db.categories = require('./category.model')(mongoose);
db.collectioncenter = require('./collectioncenter.model')(mongoose);

module.exports = db;
