/* eslint-disable no-console */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {  type: String, required: true },
  lastName: {   type: String, required: true },
  email: {      type: String, required: true, unique: true },
  password: {   type: String, required: true},
  feedData:   [ {type: Schema.Types.ObjectId, ref: 'Feeding'} ],
  scheds:     [ {type: Schema.Types.ObjectId, ref: 'Schedule'} ]
});

module.exports = mongoose.model('User', userSchema);


