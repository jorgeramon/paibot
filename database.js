const mongoose = require('mongoose');
const { DATABASE, TWILIO } = require('./environment').config();

mongoose.connect(`mongodb://${ DATABASE.HOST }:${ DATABASE.PORT }/${ DATABASE.DATABASE }`, { useNewUrlParser: true });

const Schema = new mongoose.Schema({
  description: String,
  uid: { type: String, unique: true },
  price: String,
  title: String,
  link: String,
  time: String,
  timestamp: Number,
  location: String
}, { collection: TWILIO.TO_NUMBER, timestamp: true });

module.exports = mongoose.model('ad', Schema);
