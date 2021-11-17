const mongoose = require('mongoose');
const keys = require('./keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

module.exports = mongoose;
