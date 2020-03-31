const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    default: ''
  },
  abbr: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
}, {
  timestamps: true
});

var Leaders = mongoose.model('Leader', schema);

module.exports = Leaders;