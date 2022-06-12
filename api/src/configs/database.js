const mongoose = require('mongoose');
require('dotenv').config();
const {MONGO_URI} = process.env;

const connect = () => {
  mongoose.connect(MONGO_URI);
};

module.exports = {connect};
