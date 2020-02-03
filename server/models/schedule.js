/* eslint-disable no-console */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  day: Number,
  dayName: String,
  country: String,
  city: String, 
  state: String,
  park: String,
  time: String,
  dateTime: Date,
  duckNumber: { type: Number, default: 1 },
  foodType: String,
  foodAmount: Number
});

module.exports = mongoose.model('Schedule', scheduleSchema);

